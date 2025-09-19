import os
import logging
import base64
import requests
from datetime import timedelta
import time
import random

from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.utils import timezone

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

import google.generativeai as genai

from .models import Report, Habit
from .serializers import (
    ReportSerializer, HabitSerializer, RegisterSerializer, 
    UserSerializer, StaffReportDetailSerializer
)

# --- Configuration ---
logger = logging.getLogger(__name__)
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

# --- AI Helper Functions ---
def analyze_image_with_vision(image_content, target_labels):
    """Analyzes an image using the Google Cloud Vision REST API with an API key."""
    api_key = os.getenv('GOOGLE_CLOUD_VISION_API_KEY')
    if not api_key or api_key == 'key':
        logger.error("Google Cloud Vision API key is not configured or invalid.")
        return False, 0.0

    vision_url = f"https://vision.googleapis.com/v1/images:annotate?key={api_key}"

    # Validate image content
    if not image_content or len(image_content) == 0:
        logger.error("Image content is empty or invalid.")
        return False, 0.0

    try:
        # Base64 encode the image
        encoded_image = base64.b64encode(image_content).decode('utf-8')
        if not encoded_image:
            logger.error("Failed to encode image to base64.")
            return False, 0.0

        # Construct the request payload
        payload = {
            "requests": [
                {
                    "image": {
                        "content": encoded_image
                    },
                    "features": [
                        {
                            "type": "LABEL_DETECTION",
                            "maxResults": 10
                        }
                    ]
                }
            ]
        }

        logger.debug(f"Sending request to Vision API: {vision_url}")
        logger.debug(f"Payload: {payload}")

        response = requests.post(vision_url, json=payload, timeout=10)
        response.raise_for_status()  # Raise an exception for bad status codes
        result = response.json()

        logger.debug(f"Vision API response: {result}")

        labels = result.get('responses', [{}])[0].get('labelAnnotations', [])
        
        for label in labels:
            description = label.get('description', '').lower()
            if description in target_labels:
                return True, label.get('score', 0.0)
        return False, 0.0
    except requests.exceptions.HTTPError as e:
        logger.error(f"Google Cloud Vision API HTTP error: {e}")
        logger.error(f"Response content: {response.text if 'response' in locals() else 'No response'}")
        return False, 0.0
    except requests.exceptions.RequestException as e:
        logger.error(f"Google Cloud Vision API request error: {e}")
        return False, 0.0
    except (KeyError, IndexIndexError) as e:
        logger.error(f"Error parsing Google Cloud Vision response: {e}")
        return False, 0.0
    except Exception as e:
        logger.error(f"Unexpected error in Vision API call: {e}")
        return False, 0.0

# --- Auth Views ---
class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class ProfileAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self):
        return self.request.user

# --- Public Reporting Views ---
class WasteReportCreateAPIView(generics.CreateAPIView):
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        image_file = self.request.FILES.get('image')
        if not image_file:
            logger.error("No image file provided in the request.")
            raise serializers.ValidationError({"image": "An image file is required."})

        try:
            image_content = image_file.read()
            if not image_content:
                logger.error(f"Empty image file for report creation by user {self.request.user.id}")
                raise serializers.ValidationError({"image": "The uploaded image is empty or invalid."})
                
            # Validate file size (e.g., max 20MB for Vision API)
            if image_file.size > 20 * 1024 * 1024:
                logger.error(f"Image file too large: {image_file.size} bytes")
                raise serializers.ValidationError({"image": "Image file size exceeds 20MB limit."})

            # Validate file type
            if not image_file.content_type in ['image/jpeg', 'image/png']:
                logger.error(f"Unsupported image type: {image_file.content_type}")
                raise serializers.ValidationError({"image": "Only JPEG or PNG images are supported."})

            report = serializer.save(user=self.request.user, waste_type='general')
            
            garbage_labels = {'trash', 'garbage', 'waste', 'plastic bag', 'dumpster', 'landfill'}
            is_garbage, confidence = analyze_image_with_vision(image_content, garbage_labels)
            
            report.is_verified_garbage = is_garbage
            report.confidence = confidence
            report.save()

            if is_garbage and confidence > 0.80 and settings.AUTHORITY_EMAIL:
                subject = f"High-Confidence Garbage Report Submitted: #{report.id}"
                message = (
                    f"A new garbage report has been submitted with high confidence.\n\n"
                    f"Report ID: {report.id}\n"
                    f"Location: ({report.location_lat}, {report.location_lng})\n"
                    f"Severity: {report.get_severity_display()}\n"
                    f"Description: {report.description}\n\n"
                    "Please review this report in the staff dashboard."
                )
                send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [settings.AUTHORITY_EMAIL])
        except Exception as e:
            logger.error(f"Error processing image for report {report.id if 'report' in locals() else 'unknown'}: {e}")
            raise serializers.ValidationError({"image": f"Failed to process image: {str(e)}"})

class FoodWasteReportCreateAPIView(generics.CreateAPIView):
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        image_file = self.request.FILES.get('image')
        if not image_file:
            logger.error("No image file provided in the request.")
            raise serializers.ValidationError({"image": "An image file is required."})

        try:
            image_content = image_file.read()
            if not image_content:
                logger.error(f"Empty image file for food report creation by user {self.request.user.id}")
                raise serializers.ValidationError({"image": "The uploaded image is empty or invalid."})
                
            # Validate file size
            if image_file.size > 20 * 1024 * 1024:
                logger.error(f"Image file too large: {image_file.size} bytes")
                raise serializers.ValidationError({"image": "Image file size exceeds 20MB limit."})

            # Validate file type
            if not image_file.content_type in ['image/jpeg', 'image/png']:
                logger.error(f"Unsupported image type: {image_file.content_type}")
                raise serializers.ValidationError({"image": "Only JPEG or PNG images are supported."})

            report = serializer.save(user=self.request.user, waste_type='food_waste')
            prep_time = report.preparation_time

            if prep_time:
                food_labels = {'food', 'meal', 'dish', 'cuisine', 'ingredient', 'plate'}
                is_food, confidence = analyze_image_with_vision(image_content, food_labels)

                report.is_verified_food = is_food
                report.confidence = confidence
                report.save()

                is_fresh = (timezone.now() - prep_time) < timedelta(hours=3)

                if is_food and is_fresh and settings.NGO_EMAIL:
                    subject = f"Fresh, Consumable Food Available: Report #{report.id}"
                    message = (
                        f"A report of fresh, consumable food has been submitted.\n\n"
                        f"Report ID: {report.id}\n"
                        f"Prepared At: {prep_time.strftime('%Y-%m-%d %H:%M')}\n"
                        f"Location: ({report.location_lat}, {report.location_lng})\n"
                        f"Description: {report.description}\n\n"
                        "Please coordinate for pickup."
                    )
                    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [settings.NGO_EMAIL])
        except Exception as e:
            logger.error(f"Error processing image for food report {report.id if 'report' in locals() else 'unknown'}: {e}")
            raise serializers.ValidationError({"image": f"Failed to process image: {str(e)}"})

# --- Chatbot View ---
class ChatAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_message = request.data.get("message", "")
        if not user_message:
            return Response({"error": "Message is required"}, status=400)
        
        if not settings.GEMINI_API_KEY:
            return Response({"error": "AI key not configured"}, status=500)

        try:
            model = genai.GenerativeModel('gemini-1.5-flash')
            prompt = (
                "You are GreenBot, an AI assistant for EcoAi. Your goal is to provide concise, "
                "positive, and actionable advice on environmental habits. If the user asks for "
                "recommendations on a habit, give 3 practical tips.\n\n"
                f"User's request: '{user_message}'"
            )
            response = model.generate_content(prompt)
            return Response({"reply": response.text})
        except Exception as e:
            logger.error(f"Gemini Chat API failed: {e}")
            return Response({"error": "Failed to get a response from AI."}, status=500)

# --- Truck Simulation View ---
class GarbageTrucksAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    initial_truck_positions = [
        {'id': 1, 'lat': 12.9716, 'lng': 77.5946}, # Majestic
        {'id': 2, 'lat': 12.9279, 'lng': 77.6271}, # Koramangala
        {'id': 3, 'lat': 13.0358, 'lng': 77.5970}, # Hebbal
    ]

    def get(self, request, *args, **kwargs):
        current_time = time.time()
        trucks = []
        for truck in self.initial_truck_positions:
            lat_change = (random.random() - 0.5) * 0.001 * (current_time % 10)
            lng_change = (random.random() - 0.5) * 0.001 * (current_time % 10)
            trucks.append({
                'id': truck['id'],
                'lat': truck['lat'] + lat_change,
                'lng': truck['lng'] + lng_change
            })
        return Response(trucks)

# --- Staff Portal Views ---
class StaffReportListAPIView(generics.ListAPIView):
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Report.objects.all().order_by('-uploaded_at')

class StaffReportDetailAPIView(generics.RetrieveAPIView):
    serializer_class = StaffReportDetailSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Report.objects.all()

class StaffReportUpdateAPIView(generics.UpdateAPIView):
    serializer_class = StaffReportDetailSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Report.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        new_status = request.data.get('status')
        if new_status and new_status in [choice[0] for choice in Report.STATUS_CHOICES]:
            instance.status = new_status
            instance.save()
            return Response(self.get_serializer(instance).data)
        return Response({"error": "Invalid status provided"}, status=status.HTTP_400_BAD_REQUEST)