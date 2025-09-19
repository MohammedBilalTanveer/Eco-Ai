import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import StaffLogin from './components/pages/StaffLogin';
import ReportPage from './components/pages/ReportPage';
import FoodWastePage from './components/pages/FoodWastePage';
import GarbageTrucks from './components/pages/GarbageTrucks';
import ChatPage from './components/pages/ChatPage';
import StaffDashboard from './components/pages/staff/StaffDashboard';
import StaffReportDetail from './components/pages/staff/StaffReportDetail';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-background text-gray-200">
        <Navbar />
        <main className="flex-grow pt-16"> {/* Add padding-top to avoid content behind navbar */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/staff-login" element={<StaffLogin />} />
            
            {/* User Protected Routes */}
            <Route path="/report-waste" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
            <Route path="/report-food" element={<ProtectedRoute><FoodWastePage /></ProtectedRoute>} />
            <Route path="/live-map" element={<ProtectedRoute><GarbageTrucks /></ProtectedRoute>} />
            <Route path="/chatbot" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />

            {/* Staff Protected Routes */}
            <Route path="/staff/dashboard" element={<ProtectedRoute role="staff"><StaffDashboard /></ProtectedRoute>} />
            <Route path="/staff/report/:id" element={<ProtectedRoute role="staff"><StaffReportDetail /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}