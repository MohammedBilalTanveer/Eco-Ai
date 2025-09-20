import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { authFetch } from '../../services/api';
import { motion } from 'framer-motion';
import { FiImage, FiClock, FiFileText } from 'react-icons/fi';
import Footer from '../Footer';
const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({ click: (e) => setPosition(e.latlng) });
  return position ? <Marker position={position}><Popup>Selected Location</Popup></Marker> : null;
};

const FoodWastePage = () => {
  const [position, setPosition] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setPosition({ lat: 12.9716, lng: 77.5946 })
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !position || !preparationTime) {
      setIsError(true);
      setMessage('Image, location, and preparation time are required.');
      return;
    }
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);
    formData.append('preparation_time', new Date(preparationTime).toISOString());
    formData.append('location_lat', position.lat);
    formData.append('location_lng', position.lng);

    try {
      const res = await authFetch('/reports/foodwaste/create/', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      setIsError(false);
      setMessage('Food report submitted successfully!');
      e.target.reset();
      setImage(null);
    } catch (err) {
      setIsError(true);
      setMessage(`Submission failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!position) return <div className="text-center py-20 text-white">Loading Map...</div>;

  return (<>
    <div className="bg-[#050414] min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(130,69,236,0.4)]"
      >
        <h1 className="text-3xl md:text-4xl text-center text-white font-bold mb-2">
          Report <span className="text-[#8245ec]">Surplus Food</span>
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Prevent food waste. Report edible surplus food for donation.
        </p>

        {message && (
          <p
            className={`mb-6 p-3 rounded text-center text-sm ${
              isError ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
            }`}
          >
            {message}
          </p>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FiImage className="absolute left-3 top-3 text-gray-400 text-xl" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
                className="w-full pl-10 p-3 bg-gray-800/80 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#8245ec]/20 file:text-[#8245ec] hover:file:bg-[#8245ec]/30"
              />
            </div>

            <div className="relative">
              <FiClock className="absolute left-3 top-3 text-gray-400 text-xl" />
              <input
                type="datetime-local"
                value={preparationTime}
                onChange={(e) => setPreparationTime(e.target.value)}
                required
                className="w-full pl-10 p-3 bg-gray-800/80 rounded-lg focus:ring-2 focus:ring-[#8245ec] outline-none text-white"
              />
            </div>

            <div className="relative">
              <FiFileText className="absolute left-3 top-3 text-gray-400 text-xl" />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                placeholder="e.g., 10 servings of vegetable curry"
                className="w-full pl-10 p-3 bg-gray-800/80 rounded-lg focus:ring-2 focus:ring-[#8245ec] outline-none text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#8245ec] to-purple-500 rounded-lg font-bold text-white shadow hover:from-purple-500 hover:to-[#8245ec] transition-all disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Food Report'}
            </button>
          </form>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-white/10">
            <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
        </div>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
};

export default FoodWastePage;
