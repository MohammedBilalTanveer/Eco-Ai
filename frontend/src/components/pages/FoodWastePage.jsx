import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { authFetch } from '../../services/api';

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
      setMessage('Food report submitted! If verified as fresh and edible, local NGOs will be notified.');
      e.target.reset();
      setImage(null);
    } catch (err) {
      setIsError(true);
      setMessage(`Submission failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!position) return <div className="text-center py-20">Loading Map...</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-2 text-primary">Report Surplus Food</h1>
      <p className="text-center text-gray-400 mb-8">Prevent food waste. Report edible surplus food for donation.</p>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 text-center text-white ${isError ? 'bg-red-500/30' : 'bg-green-500/30'}`}>
          {message}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 space-y-4">
          <div>
            <label className="font-bold">1. Upload Food Image*</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required className="w-full mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30" />
          </div>
          <div>
            <label className="font-bold">2. When was it prepared?*</label>
            <input type="datetime-local" value={preparationTime} onChange={(e) => setPreparationTime(e.target.value)} required className="w-full mt-2 p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="font-bold">3. Describe the Food</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder="e.g., 10 servings of vegetable curry" className="w-full mt-2 p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-primary rounded-lg font-bold hover:bg-opacity-80 disabled:opacity-50">
            {loading ? 'Analyzing & Submitting...' : 'Submit Food Report'}
          </button>
        </form>

        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
          <h2 className="font-bold text-center mb-4">4. Pinpoint Location on Map*</h2>
          <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default FoodWastePage;