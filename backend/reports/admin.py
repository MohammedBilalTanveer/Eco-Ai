from django.contrib import admin
from .models import Report, Habit

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = (
        "id", "user", "waste_type", "status", "severity", 
        "is_verified_garbage", "is_verified_food", "confidence", "uploaded_at"
    )
    list_filter = ("status", "waste_type", "severity", "is_verified_garbage", "is_verified_food")
    search_fields = ("description", "user__username", "address")

@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "name", "created_at")
    search_fields = ("name", "user__username")