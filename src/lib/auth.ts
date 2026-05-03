const ACCESS_KEY = "knowai-token";
const REFRESH_KEY = "knowai-refresh-token";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

// ── Token storage ─────────────────────────────────────────────────────────────

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

function setTokens(access: string, refresh: string): void {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearToken(): void {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

// ── JWT expiry check (no library needed — JWT payload is just base64 JSON) ───

function isExpired(token: string): boolean {
  try {
    // JWT uses base64url — replace url-safe chars and add padding before decoding
    const base64url = token.split(".")[1];
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/").padEnd(
      base64url.length + ((4 - (base64url.length % 4)) % 4), "="
    );
    const payload = JSON.parse(atob(base64));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

// ── Auth state ────────────────────────────────────────────────────────────────

export function isLoggedIn(): boolean {
  const token = getToken();
  if (!token) return false;
  if (isExpired(token)) {
    clearToken();
    return false;
  }
  return true;
}

// ── Silent token refresh ──────────────────────────────────────────────────────

export async function tryRefresh(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  const refresh = localStorage.getItem(REFRESH_KEY);
  if (!refresh || isExpired(refresh)) {
    clearToken();
    return false;
  }
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }),
    });
    if (!res.ok) { clearToken(); return false; }
    const data = await res.json();
    setTokens(data.access_token, data.refresh_token);
    return true;
  } catch {
    clearToken();
    return false;
  }
}

// ── Auth API calls ────────────────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<void> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? "Invalid email or password");
  }

  const data = await res.json();
  setTokens(data.access_token, data.refresh_token);
}

export interface UserProfile {
  id: number;
  email: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

export async function getMe(): Promise<UserProfile> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function updateMe(data: { username?: string; display_name?: string; bio?: string }): Promise<UserProfile> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/auth/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    if (Array.isArray(body.detail)) {
      throw new Error(body.detail[0]?.msg ?? "Update failed");
    }
    throw new Error(body.detail ?? "Update failed");
  }
  return res.json();
}

export async function register(email: string, password: string): Promise<void> {
  // Derive a username from the email (part before @), ensure it's valid
  const username = email.split("@")[0].replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);

  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    // Pydantic validation errors come as an array
    if (Array.isArray(body.detail)) {
      throw new Error(body.detail[0]?.msg ?? "Registration failed");
    }
    throw new Error(body.detail ?? "Registration failed");
  }

  const data = await res.json();
  setTokens(data.access_token, data.refresh_token);
}
