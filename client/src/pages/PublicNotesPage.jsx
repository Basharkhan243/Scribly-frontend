import { useState, useEffect } from "react";
import { FiArrowLeft, FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function PublicNotesPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [publicNotes, setPublicNotes] = useState([]);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const fetchPublicNotes = async () => {
      try {
        const res = await api.get("/api/v1/notes/publicnotes");
        setPublicNotes(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch public notes:", err.message);
      }
    };
    fetchPublicNotes();
  }, []);

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${
        darkMode ? "bg-black/70" : "bg-gradient-to-b from-gray-100 to-gray-300"
      }`}
    >
      <nav className="fixed top-0 left-0 z-20 p-4 flex justify-between w-full items-center">
        <button
          onClick={() => navigate("/notes")}
          className="bg-gray-800 text-white py-2 px-4 rounded-full flex items-center gap-2"
        >
          <FiArrowLeft /> My Notes
        </button>
        <button onClick={toggleDarkMode} className="p-2 rounded-full">
          {darkMode ? (
            <FiSun className="w-5 h-5 text-white" />
          ) : (
            <FiMoon className="w-5 h-5 text-black" />
          )}
        </button>
      </nav>

      <div className="pt-24 pb-8 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`max-w-3xl mx-auto p-6 rounded-xl shadow-xl ${
            darkMode ? "bg-black/30 text-white" : "bg-white/80 text-black"
          } backdrop-blur-sm`}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            🌍 Public Notes
          </h1>
          {publicNotes.length === 0 ? (
            <p>No public notes available yet.</p>
          ) : (
            <div className="space-y-4">
              {publicNotes.map((note) => (
                <motion.div
                  key={note._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg ${
                    darkMode
                      ? "bg-black/80 text-white"
                      : "bg-gray-100 text-black"
                  } shadow`}
                >
                  <h3 className="font-bold">{note.title}</h3>
                  <p className="mt-2">{note.content}</p>
                  <p className="text-sm mt-1 italic text-green-400">Public</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
