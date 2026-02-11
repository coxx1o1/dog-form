import { useState } from "react";
import { sendMessage } from "../services/api";
import { Navigate } from "react-router-dom";


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    livingType: "",
    city: "",
    landmark: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

 async function handleSubmit(e) {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.livingType || !formData.city || !formData.message) {
    setError("Please fill all required fields");
    return;
  }

  try {
    await sendMessage(formData);
    setSuccess("Message sent successfully!");
    setError("");
    setFormData({
     name: "",
    email: "",
    subject: "",
    livingType: "",
    city: "",
    landmark: "",
    message: "",
    });
  } catch (err) {
    setError("Failed to send message");
  }
  
}


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Contact Us</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <input
        type="text"
        name="name"
        placeholder="Name *"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email *"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="livingType"
        value={formData.livingType}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Living Type *</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="farm">farm</option>
      </select>

      <input
        type="text"
        name="city"
        placeholder="City *"
        value={formData.city}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="landmark"
        placeholder="Landmark"
        value={formData.landmark}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="message"
        placeholder="Message *"
        value={formData.message}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button className="w-full bg-black text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
}
