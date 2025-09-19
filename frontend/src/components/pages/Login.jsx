import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveTokens } from '../../services/api';

const Login = () => {
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
      const res = await fetch('/api/auth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Login failed');
      }
      saveTokens(data);
      // Trigger storage event for Navbar update
      window.dispatchEvent(new Event("storage"));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full px-4">
      <div className="w-full max-w-md bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
        <h2 className="text-3xl text-center text-primary font-bold mb-6">User Login</h2>
        {error && <p className="mb-4 p-3 rounded bg-red-500/20 text-red-400 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary rounded-lg font-bold hover:bg-opacity-80 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-400">
          No account? <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;