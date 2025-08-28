const BASE = (import.meta.env?.VITE_BACKEND_URL || "").replace(/\/$/, "");
const CREDS =
  (import.meta.env?.VITE_API_CREDENTIALS || "omit").toLowerCase() === "include"
    ? "include"
    : "omit";

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method: "GET",
    credentials: CREDS,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });

  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      msg = (await res.json())?.message || msg;
    } catch {}
    throw new Error(msg);
  }

  if (res.status === 204) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export const getGoals = () => request(`/goals`);
export const getGoal = (id) => request(`/goals/${id}`);
export const createGoal = (payload) =>
  request(`/goals`, { method: "POST", body: JSON.stringify(payload) });
export const updateGoal = (id, payload) =>
  request(`/goals/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const deleteGoal = (id) =>
  request(`/goals/${id}`, { method: "DELETE" });
