import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveTokens } from '../../services/api';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import Footer from '../Footer';

const FloatingBlob = ({ size, color, top, left, delay }) => (
  <motion.div
    className="absolute rounded-full mix-blend-screen filter blur-3xl opacity-30"
    style={{ width: size, height: size, top, left, backgroundColor: color }}
    animate={{ y: [0, -30, 0] }}
    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay }}
  />
);

const Signup = () => {
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
      if (!loginRes.ok) throw new Error(loginData.detail || 'Auto-login failed');

      saveTokens(loginData);
      localStorage.setItem('role', 'user');
      window.dispatchEvent(new Event("storage"));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="bg-[#050414] min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Grid */}

      {/* Floating Blobs */}
      

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(130,69,236,0.4)]"
      >
        <h2 className="text-3xl text-center text-white font-bold mb-6">
          Create <span className="text-[#8245ec]">Account</span>
        </h2>

        {error && (
          <p className="mb-4 p-3 rounded bg-red-500/20 text-red-400 text-center text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full pl-10 p-3 bg-gray-800/80 rounded-lg focus:ring-2 focus:ring-[#8245ec] outline-none text-white"
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full pl-10 p-3 bg-gray-800/80 rounded-lg focus:ring-2 focus:ring-[#8245ec] outline-none text-white"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full pl-10 p-3 bg-gray-800/80 rounded-lg focus:ring-2 focus:ring-[#8245ec] outline-none text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#8245ec] to-purple-500 rounded-lg font-bold text-white shadow hover:from-purple-500 hover:to-[#8245ec] transition-all disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Already registered?{' '}
          <Link to="/login" className="text-[#8245ec] hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
};

export default Signup;
