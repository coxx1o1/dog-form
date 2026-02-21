import { getToken } from "./authService"; // Import getToken

const API_BASE = "/api/messages";
const API_DOGS = "/api/dogs"; // Define API_DOGS base for dog routes

// Helper function to create authenticated headers
function getAuthHeaders() {
  const token = getToken();
  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  return { "Content-Type": "application/json" };
}

export async function sendMessage(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: getAuthHeaders(), // Use authenticated headers
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // Handle unauthorized responses more gracefully
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to send message");
  }

  return res.json();
}

export async function fetchMessages() {
  const res = await fetch(API_BASE, {
    headers: getAuthHeaders(), // Use authenticated headers
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch messages");
  }

  return res.json();
}

export async function deleteMessage(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(), // Use authenticated headers
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to delete message");
  }
}

// Dog-related API calls (assuming these need authentication)
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
    throw new Error("Failed to add dog");
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
    throw new Error("Failed to fetch dogs");
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
    throw new Error("Failed to delete dog");
  }
}
