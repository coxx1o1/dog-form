const TOKEN_KEY = "jwt_token";

const API_URL = "https://dog-form-jehk.onrender.com/api";

export async function login(password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
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