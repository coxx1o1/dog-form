import { useEffect, useState } from "react";
import { fetchMessages, deleteMessage } from "../services/api";
import { login, logout, isAuthenticated } from "../services/authService"; // Import authService functions
import AddDog from "../components/addDog";

export default function Admin() {
  const [messages, setMessages] = useState([]);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false); // Managed by token presence
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if authenticated on component mount
    if (isAuthenticated()) {
      setIsUnlocked(true);
      loadMessages();
    }
  }, []); // Run once on mount

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
      // If authentication fails, log out and lock the admin page
      if (error.message === "Unauthorized") { // Assuming API throws 'Unauthorized' for invalid token
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
      // Optionally reload messages after successful login
      loadMessages();
    } catch (err) {
      setError(err.message || "Login failed");
      setIsUnlocked(false);
    }
  }

  function handleLogout() {
    logout();
    setIsUnlocked(false);
    setPassword(""); // Clear password field
    setMessages([]); // Clear messages on logout
  }

  //addDog for admin page
  const [showAddDog, setShowAddDog] = useState(false);


  // 🔐 PASSWORD SCREEN
  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg w-[350px]"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

          <input
            type="password"
            placeholder="Enter admin password"
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
          >
            Enter Dashboard
          </button>

          <p className="text-xs text-gray-400 mt-4 text-center">
            Uses backend authentication
          </p>
        </form>
      </div>
    );
  }

  // ✅ ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      onClick={() => setShowAddDog(true)}>Add Dog</button>
      {showAddDog && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <AddDog  onClose={() => setShowAddDog(false)} />
        </div>
      )}

      {messages.length === 0 && (
        <p className="text-gray-500">No messages yet</p>
      )}

      <div className="grid gap-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-white p-5 rounded-xl shadow-sm border"
          >
            <div className="grid gap-1 text-sm">
              <p>
                <b>Name:</b> {msg.name}
              </p>
              <p>
                <b>Email:</b> {msg.email}
              </p>
              <p>
                <b>Subject:</b> {msg.subject}
              </p>
              <p className="text-gray-700">{msg.message}</p>
            </div>

            <button
              onClick={() => handleDelete(msg._id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

