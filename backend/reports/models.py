from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Report(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('rejected', 'Rejected'),
    ]
    WASTE_TYPE_CHOICES = [
        ('general', 'General Waste'),
        ('food_waste', 'Food Waste'),
    ]
    SEVERITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, default='medium')
    location_lat = models.FloatField()
    location_lng = models.FloatField()
    address = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='reports/')
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    waste_type = models.CharField(max_length=20, choices=WASTE_TYPE_CHOICES)
    
    # AI Analysis Fields
    confidence = models.FloatField(default=0.0)
    is_verified_garbage = models.BooleanField(default=False)
    is_verified_food = models.BooleanField(default=False)
    
    # Timestamps
    preparation_time = models.DateTimeField(blank=True, null=True) # For food waste
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Report #{self.id} ({self.get_waste_type_display()}) by {self.user.username}"


class Habit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.name} ({self.user.username})"