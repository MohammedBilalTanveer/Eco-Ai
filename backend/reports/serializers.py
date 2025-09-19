from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Report, Habit

class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class ReportSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(read_only=True)

    class Meta:
        model = Report
        fields = (
            'id', 'user', 'description', 'severity', 'location_lat', 
            'location_lng', 'address', 'image', 'status', 'waste_type', 
            'confidence', 'is_verified_garbage', 'is_verified_food', 
            'preparation_time', 'uploaded_at'
        )
        read_only_fields = ('user', 'status', 'waste_type', 'confidence', 
                            'is_verified_garbage', 'is_verified_food', 'uploaded_at')

class StaffReportDetailSerializer(ReportSerializer):
    """A more detailed serializer for staff, allowing status updates."""
    class Meta(ReportSerializer.Meta):
        read_only_fields = ('user', 'waste_type', 'confidence', 
                            'is_verified_garbage', 'is_verified_food', 'uploaded_at')


class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ('id', 'name', 'created_at')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "is_staff", "is_superuser")