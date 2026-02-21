import { useEffect, useState } from "react";
import { fetchMessages, deleteMessage } from "../services/api";
import { login, logout, isAuthenticated } from "../services/authService";
import AddDog from "../components/addDog";

export default function Admin() {
  const [messages, setMessages] = useState([]);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      setIsUnlocked(true);
      loadMessages();
    }
  }, []);

  useEffect(() => {
    if (isUnlocked) {
      loadMessages();
    }
  }, [isUnlocked]);

  async function loadMessages() {
    try {
      const data = await fetchMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages:", error);
      if (error.message === "Unauthorized") {
        handleLogout();
      }
    }
  }

  async function handleDelete(id) {
    await deleteMessage(id);
    loadMessages();
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(password);
      setIsUnlocked(true);
      setError("");
      loadMessages();
    } catch (err) {
      setError(err.message || "Login failed");
      setIsUnlocked(false);
    }
  }

  function handleLogout() {
    logout();
    setIsUnlocked(false);
    setPassword("");
    setMessages([]);
  }

  const [showAddDog, setShowAddDog] = useState(false);

  // 🔐 PASSWORD SCREEN
  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-2xl shadow-xl w-[400px] space-y-6"
        >
          <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-900">Admin Login</h2>

          <input
            type="password"
            placeholder="Enter admin password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            Enter Dashboard
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Uses backend authentication
          </p>
        </form>
      </div>
    );
  }

  // ✅ ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-4xl font-extrabold text-gray-900">Admin Dashboard</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowAddDog(true)}
            className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            Add Dog
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>

      {showAddDog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <AddDog onClose={() => setShowAddDog(false)} />
        </div>
      )}

      {messages.length === 0 && (
        <p className="text-center text-gray-600 text-lg mt-8">No messages yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200 ease-in-out"
          >
            <div className="space-y-3 text-gray-800">
              <p className="text-sm">
                <b className="font-semibold text-gray-900">Name:</b> {msg.name}
              </p>
              <p className="text-sm">
                <b className="font-semibold text-gray-900">Email:</b> {msg.email}
              </p>
              <p className="text-sm">
                <b className="font-semibold text-gray-900">Subject:</b> {msg.subject}
              </p>
              <p className="text-base text-gray-700 mt-2">{msg.message}</p>
            </div>

            <button
              onClick={() => handleDelete(msg._id)}
              className="mt-6 bg-red-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 ease-in-out"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


