import { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post(
        '/api/v1/users/login',
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      
      navigate('/notes');
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className={`fixed inset-0 overflow-hidden ${darkMode ? 'bg-black/65' : 'bg-gradient-to-b from-black/30 to-black/70'}`}>
      <nav className="fixed top-0 right-0 z-20 p-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full focus:outline-none"
          >
            {darkMode ? (
              <FiSun className="w-5 h-5 text-white" />
            ) : (
              <FiMoon className="w-5 h-5 text-black" />
            )}
          </button>
          <a 
            href="/signup" 
            className={`text-lg ${darkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} transition-all border-b border-transparent hover:border-current`}
          >
            Sign Up
          </a>
        </div>
      </nav>

     
      <div className="relative z-10 h-full flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-md p-8 rounded-xl shadow-xl ${darkMode ? 'bg-black/20' : 'bg-white/80'}`}
        >
          <div className="text-center mb-8">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="w-32 mx-auto mb-6"
            />
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
              Welcome Back
            </h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {error}
              </p>
            )}

            <div className="mb-4">
              <label 
                htmlFor="email" 
                className={`block mb-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-white/80 border-black text-black' : 'bg-white border-gray-300 text-black'}`}
                required
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="password" 
                className={`block mb-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-white/80 border-black text-black' : 'bg-white border-gray-300 text-black'}`}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-full text-lg font-medium transition-all relative overflow-hidden group ${
                darkMode 
                  ? 'bg-white text-black hover:bg-white/60' 
                  : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              <span className="relative z-10">Login</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.4 }}
              />
            </button>

            <div className="text-center mt-6">
              <a 
                href="/forgot-password" 
                className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-gray-700 hover:text-blue-500'} transition-colors`}
              >
                Forgot password?
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
