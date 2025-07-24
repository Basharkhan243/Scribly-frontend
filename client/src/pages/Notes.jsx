import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiPlus, FiTrash2, FiEdit2, FiLogOut, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../utils/api';

export default function NotesPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '', isPublic: false });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const fetchNotes = async () => {
    setNoteLoading(true);
    try {
      const res = await api.get('/api/v1/notes/getmynotes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch notes', err.message);
    } finally {
      setNoteLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewNote((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingId) {
        const res = await api.put(`/api/v1/notes/${editingId}`, newNote, { 
          headers: { Authorization: `Bearer ${token}` }
        });
        const updated = res.data.note || res.data;
        setNotes(notes.map((note) => (note._id === editingId ? updated : note)));
      } else {
        const res = await api.post('/api/v1/notes/createnote', newNote, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const createdNote = res.data.note || res.data;
        if (!createdNote || !createdNote.title) {
          alert("Invalid note data received from server.");
          return;
        }
        setNotes([...notes, createdNote]);
      }

      setNewNote({ title: '', content: '', isPublic: false });
      setEditingId(null);
    } catch (err) {
      console.error('Error submitting note:', err.message);
      alert("Something went wrong while saving the note.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    setNewNote({ title: note.title, content: note.content, isPublic: note.isPublic });
    setEditingId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/v1/notes/${id}`, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error('Error deleting note:', err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/api/v1/users/logout');
      localStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
    } else {
      const matched = notes
        .filter((n) => n.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((n) => n.title);
      setSuggestions([...new Set(matched)].slice(0, 5));
    }
  }, [searchTerm, notes]);

  return (
    <div className={`fixed inset-0 overflow-y-auto ${darkMode ? 'bg-black/65' : 'bg-gradient-to-b from-black/30 to-black/70'}`}>
     
      <nav className="fixed top-0 left-0 z-20 p-4 sm:p-6 flex flex-wrap justify-between w-full items-center gap-4">
        <div className="flex gap-4 flex-grow">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full flex items-center gap-2"
          >
            <FiLogOut /> Logout
          </button>
          <button onClick={toggleDarkMode} className="p-2 rounded-full">
            {darkMode ? <FiSun className="w-5 h-5 text-white" /> : <FiMoon className="w-5 h-5 text-black" />}
          </button>
        </div>
        <div className="relative flex-grow md:max-w-xs w-12 ml-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-9 rounded-full border dark:bg-white dark:text-black"
            />
            <FiSearch className="absolute left-2.5 top-2.5 text-gray-500" />
          </div>
          {suggestions.length > 0 && (
            <div className={`absolute mt-1 md:w-full w-12 bg-white text-white dark:bg-black/20 shadow-lg rounded-lg z-50`}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10"
                  onClick={() => setSearchTerm(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      
      <div className="relative z-10 pt-24 pb-4 px-4 sm:px-6 min-h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`max-w-3xl mx-auto p-6 rounded-xl shadow-xl ${darkMode ? 'bg-black/20' : 'bg-white/80'} backdrop-blur-sm`}
        >
          <h1 className={`text-2xl sm:text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
            My Notes
          </h1>

          
          <form onSubmit={handleSubmit} className="mb-8">
            <input
              type="text"
              name="title"
              placeholder="Note title"
              value={newNote.title}
              onChange={handleInputChange}
              className={`w-full mb-4 px-4 py-3 rounded-lg border ${darkMode ? 'bg-white/80 text-black' : 'bg-white text-black'}`}
              required
            />
            <textarea
              name="content"
              placeholder="Note content"
              value={newNote.content}
              onChange={handleInputChange}
              rows="3"
              className={`w-full mb-4 px-4 py-3 rounded-lg border ${darkMode ? 'bg-white/80 text-black' : 'bg-white text-black'}`}
              required
            />
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                name="isPublic"
                checked={newNote.isPublic}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className={`${darkMode ? 'text-white' : 'text-black'}`}>Make Public</span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-full font-medium transition-all relative overflow-hidden group ${
                darkMode 
                  ? 'bg-white text-black hover:bg-white/70' 
                  : 'bg-black text-white hover:bg-black/80'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg 
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editingId ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    {editingId ? 'Update Note' : 'Add Note'} <FiPlus />
                  </>
                )}
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
          </form>

         
          <div className="space-y-4 md:max-h-[400px] md:overflow-y-auto">
            {noteLoading ? (
              <div className="flex justify-center items-center h-32">
                <svg 
                  className="animate-spin h-8 w-8 text-current" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : filteredNotes.length === 0 ? (
              <p className={`text-center py-8 ${darkMode ? 'text-white/70' : 'text-black/70'}`}>
                {searchTerm ? 'No matching notes found' : 'No notes yet. Create one!'}
              </p>
            ) : (
              filteredNotes.map((note) => (
                <motion.div
                  key={note._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg ${darkMode ? 'bg-black/80 text-white' : 'bg-white text-black'} shadow`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{note.title}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(note)} className="hover:text-blue-500">
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDelete(note._id)} className="hover:text-red-500">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2">{note.content}</p>
                  {note.isPublic && <p className="text-sm mt-1 italic text-green-400">Public</p>}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
