import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveTokens, authFetch } from '../../services/api';

const StaffLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const tokenRes = await fetch('/api/auth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const tokenData = await tokenRes.json();
      if (!tokenRes.ok) throw new Error(tokenData.detail || 'Login failed');
      
      saveTokens(tokenData);
      
      const profileRes = await authFetch('/auth/me/');
      const profileData = await profileRes.json();
      if (!profileRes.ok) throw new Error('Could not verify account');

      if (!profileData.is_staff) {
        throw new Error('This is not a staff account.');
      }

      window.dispatchEvent(new Event("storage"));
      navigate('/staff/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full px-4">
      <div className="w-full max-w-md bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
        <h2 className="text-3xl text-center text-primary font-bold mb-6">Staff Login</h2>
        {error && <p className="mb-4 p-3 rounded bg-red-500/20 text-red-400 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Staff Username" required className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          <button type="submit" disabled={loading} className="w-full py-3 bg-primary rounded-lg font-bold hover:bg-opacity-80 disabled:opacity-50">
            {loading ? 'Authenticating...' : 'Staff Login'}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-400">
          Not staff? <Link to="/login" className="text-primary hover:underline">User Login</Link>
        </p>
      </div>
    </div>
  );
};

export default StaffLogin;