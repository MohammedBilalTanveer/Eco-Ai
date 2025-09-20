// Updated AI_ECO/frontend/src/components/pages/GarbageTrucks.jsx

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet core for marker icon fix
import { authFetch } from '../../services/api';
import Footer from '../Footer';
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
    <>
      <div className="bg-[#050414] min-h-screen flex flex-col items-center justify-center px-4 md:px-10 py-12">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-white">
          Live <span className="text-[#8245ec]">Garbage Truck</span> Map
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Real-time simulation of garbage truck locations across your city.
        </p>

        <div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(130,69,236,0.4)]">
          {loading ? (
            <p className="text-center text-xl text-gray-300">Loading map and truck locations...</p>
          ) : error ? (
            <p className="text-center text-xl text-red-400">{error}</p>
          ) : (
            <MapContainer
              center={mapCenter}
              zoom={12}
              style={{ height: '70vh', width: '100%' }} // Increased height to 70% viewport
              key={mapCenter.join(',')} // Force re-render on center change
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {trucks.length > 0 ? (
                trucks.map((truck) => (
                  <Marker key={truck.id} position={[truck.lat, truck.lng]}>
                    <Popup>
                      <div className="text-sm font-semibold text-gray-800">
                        🚛 Truck ID: {truck.id}
                      </div>
                    </Popup>
                  </Marker>
                ))
              ) : (
                <p className="text-center text-gray-400">No trucks are currently active.</p>
              )}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default GarbageTrucks;
