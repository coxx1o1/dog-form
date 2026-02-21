const TOKEN_KEY = "jwt_token";

export async function login(password) {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    const { token } = await res.json();
    localStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated() {
  const token = getToken();
  // A more robust check would involve verifying the token's expiration
  // by decoding it, but for now, just checking for presence is sufficient.
  return !!token;
}
