// Updated AI_ECO/frontend/src/components/pages/GarbageTrucks.jsx

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet core for marker icon fix
import { authFetch } from '../../services/api';

// Fix for Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const GarbageTrucks = () => {
  const [trucks, setTrucks] = useState([]);
  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]); // Bengaluru
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTrucks = async () => {
    try {
      const res = await authFetch('/trucks/locations/');
      if (!res.ok) throw new Error('Could not connect to the truck tracking service.');
      const data = await res.json();
      setTrucks(data);
      // Optionally update map center based on truck data
      if (data.length > 0) {
        setMapCenter([data[0].lat, data[0].lng]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch truck locations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
    const interval = setInterval(fetchTrucks, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col h-full">
      <h1 className="text-4xl font-bold text-center mb-2 text-primary">Live Garbage Truck Map</h1>
      <p className="text-center text-gray-400 mb-8">Real-time simulation of garbage truck locations.</p>

      <div className="flex-grow bg-gray-900/50 p-4 rounded-xl border border-gray-800" style={{ minHeight: '60vh' }}>
        {loading ? (
          <p className="text-center text-xl">Loading map and truck locations...</p>
        ) : error ? (
          <p className="text-center text-xl text-red-400">{error}</p>
        ) : (
          <MapContainer
            center={mapCenter}
            zoom={12}
            style={{ height: '100%', width: '100%', minHeight: '400px' }} // Ensure explicit minHeight
            key={mapCenter.join(',')} // Force re-render on center change
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {trucks.length > 0 ? (
              trucks.map((truck) => (
                <Marker key={truck.id} position={[truck.lat, truck.lng]}>
                  <Popup>Truck ID: {truck.id}</Popup>
                </Marker>
              ))
            ) : (
              <div className="text-center text-gray-400">No trucks are currently active.</div>
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default GarbageTrucks;