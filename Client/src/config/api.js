const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_URL = rawApiUrl.replace(/\/$/, "");

export const apiPath = (path) => `${API_URL}${path}`;

export const wsPath = (path) => `${API_URL.replace(/^http/, "ws")}${path}`;
