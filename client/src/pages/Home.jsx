import { motion } from "framer-motion";
import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/video/video.mp4" type="video/mp4" />
        </video>
        <div
          className={`absolute inset-0 ${
            darkMode ? "bg-black/80" : "bg-black/20"
          }`}
        ></div>
      </div>

      <nav className="fixed top-0 right-0 z-20 p-6">
        <div className="flex items-center gap-6">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full focus:outline-none"
          >
            {darkMode ? (
              <FiSun
                className={`w-5 h-5 ${
                  darkMode ? "text-[#fff]" : "text-[#000]"
                }`}
              />
            ) : (
              <FiMoon
                className={`w-5 h-5 ${
                  darkMode ? "text-[#fff]" : "text-[#000]"
                }`}
              />
            )}
          </button>
          <div className="flex gap-12 w-full justify-end">
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
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative text-l bg-black font-medium px-5 py-2 rounded-xl text-white overflow-hidden group"
            >
              <span className="relative z-10">Sign Up</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 h-full flex flex-col ml-6 items-start justify-center p-8 text-left pl-12 md:pl-24">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="mb-8"
        ></motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1
            className={`text-5xl md:text-6xl font-bold mb-4 ${
              darkMode ? "text-gray-300" : "text-black"
            }`}
          >
            Welcome to{" "}
            <span className="font-medium">
              <img src="/images/logo.png" alt="Logo" className="w-40 inline" />
            </span>
          </h1>
          <p
            className={`text-xl md:text-3xl font-medium opacity-80 ${
              darkMode ? "text-[#fff]" : "text-[#000]"
            }`}
          >
            Your intelligent writing companion
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12"
        >
          <button
            onClick={() => navigate("/login")}
            className={`px-8 py-3 rounded-full text-lg font-medium transition-all relative overflow-hidden group   text-white bg-black hover:scale-105`}
          >
            <span className="relative z-10">Get Started</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4 }}
            />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
