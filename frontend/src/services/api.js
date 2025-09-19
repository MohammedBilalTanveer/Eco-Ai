const API_URL = '/api';

export function saveTokens({ access, refresh }) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

export function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export async function authFetch(url, options = {}) {
  const token = localStorage.getItem('access_token');
  
  const headers = {
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Do not set Content-Type for FormData, browser does it with boundary
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  } else if (!headers['Content-Type']) {
     headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${url}`, { ...options, headers });

  if (response.status === 401) {
    // Handle token refresh or logout
    clearTokens();
    window.location.href = '/login'; 
    throw new Error("Unauthorized");
  }

  return response;
}