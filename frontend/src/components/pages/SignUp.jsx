import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveTokens } from '../../services/api';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const regRes = await fetch('/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const regData = await regRes.json();
      if (!regRes.ok) throw new Error(JSON.stringify(regData));
      
      const loginRes = await fetch('/api/auth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const loginData = await loginRes.json();
      if (!loginRes.ok) throw new Error(loginData.detail || 'Login after sign up failed');

      saveTokens(loginData);
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
        <h2 className="text-3xl text-center text-primary font-bold mb-6">Create Account</h2>
        {error && <p className="mb-4 p-3 rounded bg-red-500/20 text-red-400 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
          <button type="submit" disabled={loading} className="w-full py-3 bg-primary rounded-lg font-bold hover:bg-opacity-80 disabled:opacity-50">
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-400">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;