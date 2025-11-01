import { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function SignupPage() {
  
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const toggleDarkMode = () => setDarkMode(!darkMode);

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError('');

     try {
     const { data } = await api.post('/api/v1/users/register', {
  name: formData.name,
  email: formData.email,
  password: formData.password,
});


console.log("Registration success:", data);


navigate('/login', { state: { from: 'signup', email: formData.email } });


      
      navigate('/login', { state: { from: 'signup', email: formData.email } });
      
    } catch (err) {
      console.error('Signup Error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 overflow-hidden ${darkMode ? 'bg-black/65' : 'bg-gradient-to-b from-black/30 to-black/70'}`}>
      
      <nav className="fixed top-0 right-0 z-20 p-4 sm:p-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <FiSun className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            ) : (
              <FiMoon className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            )}
          </button>
          <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative text-l font-medium bg-black px-5 py-2 rounded-xl text-white overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
        </div>
      </nav>

      
      <div className="relative z-10 h-full flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-md p-6 sm:p-8 rounded-xl shadow-xl ${darkMode ? 'bg-black/20' : 'bg-white/80'} backdrop-blur-sm`}
        >
          <div className="text-center mb-6 sm:mb-8">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="w-24 sm:w-32 mx-auto mb-4 sm:mb-6"
            />
            <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
              Create Account
            </h1>
            <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              Join our community
            </p>
          </div>

         
          {error && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              darkMode ? 'bg-red-900/50 text-red-100' : 'bg-red-100 text-red-800'
            }`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            <div className="mb-3 sm:mb-4">
              <label 
                htmlFor="name" 
                className={`block mb-1 sm:mb-2 text-xs sm:text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border ${darkMode ? 'bg-white/80 border-black text-black' : 'bg-white border-gray-300 text-black'}`}
                required
                autoComplete="name"
              />
            </div>

           
            <div className="mb-3 sm:mb-4">
              <label 
                htmlFor="email" 
                className={`block mb-1 sm:mb-2 text-xs sm:text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border ${darkMode ? 'bg-white/80 border-black text-black' : 'bg-white border-gray-300 text-black'}`}
                required
                autoComplete="email"
              />
            </div>

            
            <div className="mb-3 sm:mb-4">
              <label 
                htmlFor="password" 
                className={`block mb-1 sm:mb-2 text-xs sm:text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border ${darkMode ? 'bg-white/80 border-black text-black' : 'bg-white border-gray-300 text-black'}`}
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>

            
            <div className="mb-6 sm:mb-8">
              <label 
                htmlFor="confirmPassword" 
                className={`block mb-1 sm:mb-2 text-xs sm:text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border ${darkMode ? 'bg-white/80 border-black text-black' : 'bg-white border-gray-300 text-black'}`}
                required
                autoComplete="new-password"
              />
            </div>

            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 sm:py-3 px-4 rounded-full text-sm sm:text-lg font-medium transition-all relative overflow-hidden group ${
                darkMode 
                  ? 'bg-white text-black hover:bg-white/60' 
                  : 'bg-black text-white hover:bg-black/80'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10">
                {loading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : 'Sign Up'}
              </span>
              {!loading && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </button>

            
            <div className="text-center mt-4 sm:mt-6">
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account?{' '}
                Then Login from above.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}


