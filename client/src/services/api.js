import { getToken } from "./authService";

// Base API URL (your Render backend)
const API_URL = "https://dog-form-jehk.onrender.com/api";

const API_MESSAGES = `${API_URL}/messages`;
const API_DOGS = `${API_URL}/dogs`;

// Helper function to create authenticated headers
function getAuthHeaders() {
  const token = getToken();

  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  return {
    "Content-Type": "application/json",
  };
}

// =======================
// MESSAGE API CALLS
// =======================

export async function sendMessage(data) {
  const res = await fetch(API_MESSAGES, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    const errorData = await res.json();
    throw new Error(
      errorData.details || errorData.error || "Failed to send message"
    );
  }

  return res.json();
}

export async function fetchMessages() {
  const res = await fetch(API_MESSAGES, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    const errorData = await res.json();
    throw new Error(
      errorData.details || errorData.error || "Failed to fetch messages"
    );
  }

  return res.json();
}

export async function deleteMessage(id) {
  const res = await fetch(`${API_MESSAGES}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    const errorData = await res.json();
    throw new Error(
      errorData.details || errorData.error || "Failed to delete message"
    );
  }

  return true;
}

// =======================
// DOG API CALLS
// =======================

export async function addDog(dogData) {
  const res = await fetch(API_DOGS, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(dogData),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    const errorData = await res.json();
    throw new Error(
      errorData.details || errorData.error || "Failed to add dog"
    );
  }

  return res.json();
}

export async function fetchDogs() {
  const res = await fetch(API_DOGS, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    const errorData = await res.json();
    throw new Error(
      errorData.details || errorData.error || "Failed to fetch dogs"
    );
  }

  return res.json();
}

export async function deleteDog(id) {
  const res = await fetch(`${API_DOGS}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    const errorData = await res.json();
    throw new Error(
      errorData.details || errorData.error || "Failed to delete dog"
    );
  }

 return true;
}