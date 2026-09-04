export type ClientSession = {
  email: string;
  credits: number;
  role?: string;
};

const SESSION_KEY = "ai-image-session";
const SESSION_EVENT = "ai-image-session-change";

function notify() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SESSION_EVENT));
  }
}

export function getSession(): ClientSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as ClientSession;
    if (!data?.email || typeof data.credits !== "number") return null;
    return data;
  } catch {
    return null;
  }
}

export function setSession(session: ClientSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  notify();
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  notify();
}

export function subscribeSession(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  const handler = () => onStoreChange();
  window.addEventListener(SESSION_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(SESSION_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function getSessionSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}

export function getServerSessionSnapshot(): null {
  return null;
}
