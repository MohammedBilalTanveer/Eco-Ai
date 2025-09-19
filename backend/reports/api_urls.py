from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import api_views

urlpatterns = [
    # --- Auth ---
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/register/", api_views.RegisterAPIView.as_view(), name="api_register"),
    path("auth/me/", api_views.ProfileAPIView.as_view(), name="api_profile"),

    # --- Public Reporting ---
    path("reports/create/", api_views.WasteReportCreateAPIView.as_view(), name="api_report_create"),
    path("reports/foodwaste/create/", api_views.FoodWasteReportCreateAPIView.as_view(), name="api_foodwaste_create"),
    
    # --- Chatbot ---
    path("chat/", api_views.ChatAPIView.as_view(), name="api_chat"),

    # --- Truck Simulation ---
    path("trucks/locations/", api_views.GarbageTrucksAPIView.as_view(), name="api_truck_locations"),

    # --- Staff Portal ---
    path("staff/reports/", api_views.StaffReportListAPIView.as_view(), name="api_staff_reports"),
    path("staff/reports/<int:pk>/", api_views.StaffReportDetailAPIView.as_view(), name="api_staff_report_detail"),
    path("staff/reports/<int:pk>/update/", api_views.StaffReportUpdateAPIView.as_view(), name="api_staff_report_update"),
]