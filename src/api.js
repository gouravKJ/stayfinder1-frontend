export const BASE = "https://stayfinder-backend-knzo.onrender.com";

export const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: token } : {};
};

export const fetchJSON = async (url, options = {}) => {
  const res = await fetch(url, options);
  return await res.json();
};
