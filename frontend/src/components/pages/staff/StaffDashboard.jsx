import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../../../services/api';

const StatusBadge = ({ status }) => {
  const colors = {
    pending: 'bg-yellow-500/30 text-yellow-300',
    in_progress: 'bg-blue-500/30 text-blue-300',
    resolved: 'bg-green-500/30 text-green-300',
    rejected: 'bg-red-500/30 text-red-300',
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>{status}</span>;
};

const StaffDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await authFetch('/staff/reports/');
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) return <div className="text-center py-20">Loading reports...</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-primary">Staff Dashboard</h1>
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Type</th>
              <th className="p-4">Severity</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                <td className="p-4">#{report.id}</td>
                <td className="p-4">{report.waste_type}</td>
                <td className="p-4 capitalize">{report.severity}</td>
                <td className="p-4"><StatusBadge status={report.status} /></td>
                <td className="p-4">{new Date(report.uploaded_at).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => navigate(`/staff/report/${report.id}`)}
                    className="bg-primary px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffDashboard;