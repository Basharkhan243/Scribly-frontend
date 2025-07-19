import React, { useState, useEffect } from "react";
import { FiLogOut, FiMoon, FiPlus, FiSearch, FiSun } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Home = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "", isPublic: false });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/api/v1/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data.notes || res.data);
      } catch (err) {
        console.error("Failed to fetch notes:", err.message);
      }
    };
    fetchNotes();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        const res = await api.put(`/api/v1/notes/${editingId}`, newNote, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const updated = res.data.note || res.data;
        setNotes(notes.map((note) => (note._id === editingId ? updated : note)));
      } else {
        const res = await api.post("/api/v1/notes/createnote", newNote, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const createdNote = res.data.note || res.data;
        setNotes([...notes, createdNote]);
      }

      setNewNote({ title: "", content: "", isPublic: false });
      setEditingId(null);
    } catch (err) {
      console.error("Error submitting note:", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (note) => {
    setNewNote({ title: note.title, content: note.content, isPublic: note.isPublic });
    setEditingId(note._id);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.post("/api/v1/users/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSuggestions([]);
    } else {
      const matched = notes
        .filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((note) => note.title);
      setSuggestions(matched.slice(0, 5));
    }
  }, [searchTerm, notes]);

  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      <nav className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Scribly</h1>

        <div className="flex-grow flex justify-end sm:justify-start mx-4">
          <div className="relative w-40 sm:w-64 md:w-72">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-9 rounded-full border dark:bg-white dark:text-black"
            />
            <FiSearch className="absolute left-2.5 top-2.5 text-gray-500" />
            {suggestions.length > 0 && (
              <div className="absolute mt-1 w-full bg-white text-white dark:bg-black/20 shadow-lg rounded-lg z-50">
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
        </div>

        <div className="flex gap-3 items-center">
          <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full flex items-center gap-2 ${
              isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoggingOut ? "Logging out..." : <><FiLogOut /> Logout</>}
          </button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="w-full p-2 border rounded dark:bg-black dark:text-white"
          />
          <textarea
            placeholder="Content"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            className="w-full p-2 border rounded dark:bg-black dark:text-white"
          ></textarea>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newNote.isPublic}
              onChange={(e) => setNewNote({ ...newNote, isPublic: e.target.checked })}
            />
            Public
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-full font-medium transition-all ${
              darkMode ? "bg-white text-black hover:bg-white/70" : "bg-black text-white hover:bg-black/80"
            } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span className="flex items-center justify-center gap-2">
              {isSubmitting ? "Saving..." : editingId ? "Update Note" : "Add Note"} <FiPlus />
            </span>
          </button>
        </form>

        <section className="mt-8">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="border rounded p-4 mb-4 dark:border-white/20 shadow-md hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p>{note.content}</p>
              <p className="text-sm text-gray-500 mt-1">
                {note.isPublic ? "Public" : "Private"}
              </p>
              <button
                onClick={() => handleEdit(note)}
                className="mt-2 text-blue-500 hover:underline"
              >
                Edit
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
