const API_BASE = "/api/messages";

export async function sendMessage(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}

export async function fetchMessages() {
  const res = await fetch(API_BASE);
  return res.json();
}

export async function deleteMessage(id) {
  await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
}
