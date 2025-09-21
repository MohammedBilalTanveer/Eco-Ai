import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { authFetch } from '../../../services/api';
const StaffReportDetail = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const { id } = useParams();

  const fetchReport = useCallback(async () => {
    try {
      const res = await authFetch(`/staff/reports/${id}/`);
      const data = await res.json();
      setReport(data);
      setNewStatus(data.status);
    } catch (error) {
      console.error("Failed to fetch report details", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    try {
      await authFetch(`/staff/reports/${id}/update/`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      fetchReport(); // Re-fetch to show updated data
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading Report Details...</div>;
  if (!report) return <div className="text-center py-20">Report not found.</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-primary">Report Details #{report.id}</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-4">Submitted Image</h2>
          <img
            src={report.image}
            alt={`Report ${report.id}`}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Information</h2>
            <p><strong>User:</strong> {report.user.username}</p>
            <p><strong>Type:</strong> {report.waste_type}</p>
            <p><strong>Severity:</strong> {report.severity}</p>
            <p><strong>Submitted:</strong> {new Date(report.uploaded_at).toLocaleString()}</p>
            <p><strong>Description:</strong> {report.description || 'N/A'}</p>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">AI Analysis</h2>
            <p><strong>Confidence Score:</strong> {(report.confidence * 100).toFixed(1)}%</p>
            <p><strong>Verified as Garbage:</strong> {report.is_verified_garbage ? 'Yes' : 'No'}</p>
            <p><strong>Verified as Food:</strong> {report.is_verified_food ? 'Yes' : 'No'}</p>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Update Status</h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              onClick={handleStatusUpdate}
              disabled={isUpdating}
              className="w-full py-3 mt-4 bg-gradient-to-r from-[#8245ec] to-purple-500 rounded-lg font-bold text-white shadow hover:from-purple-500 hover:to-[#8245ec] transition-all disabled:opacity-50"
            >
              {isUpdating ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-4">Report Location</h2>
        <MapContainer center={[report.location_lat, report.location_lng]} zoom={15} style={{ height: '400px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[report.location_lat, report.location_lng]}>
            <Popup>Report #{report.id}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default StaffReportDetail;