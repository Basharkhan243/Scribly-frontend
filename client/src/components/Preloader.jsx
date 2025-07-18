import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check for saved theme preference
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Match your preloader duration
    
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  // Preloader Component
  if (isLoading) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/30`}>
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 1.2,
            repeat: Infinity
          }}
        >
          <img 
            src="/images/logo.png" 
            alt="Loading" 
            className="h-16 w-auto" 
          />
        </motion.div>
      </div>
    );
  }
  // In your LoginPage component
return (
  <>
    {/* Preloader with fade-out animation */}
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 1.2,
          repeat: Infinity
        }}
      >
        <img src="/images/logo.png" alt="Loading" className="h-16 w-auto" />
      </motion.div>
    </motion.div>

    {/* Main Content with fade-in animation */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Your existing login page content */}
      <div className={`fixed inset-0 overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-black/30'}`}>
      <h1 className='flex justify-center items-center h-full text-2xl'> <i>Loading...</i></h1>
        {/* ... rest of your login page ... */}
      </div>
    </motion.div>
  </>
);

  
}