export const API_URL = "";

async function fetcher(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  } as any;

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

export const api = {
  auth: {
    login: (credentials: any) => fetcher("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
    signup: (data: any) => fetcher("/auth/signup", { method: "POST", body: JSON.stringify(data) }),
  },
  dashboard: {
    get: () => fetcher("/dashboard"),
  },
  courses: {
    list: () => fetcher("/courses"),
  },
  practice: {
    questions: () => fetcher("/practice/questions"),
  }
};
