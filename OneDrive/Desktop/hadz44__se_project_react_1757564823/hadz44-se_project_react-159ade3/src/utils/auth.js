import { BASE_URL } from "../utils/constants";

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Server error: ${res.status} - ${res.statusText}`);
};

export const register = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password })
  }).then(handleServerResponse);
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  }).then(handleServerResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    }
  }).then(handleServerResponse);
};

export const updateProfile = ({ name, avatar }, token) => {
  if (!token) {
    return Promise.reject('Authentication error: No authorization token found for profile update');
  }

  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar })
  }).then(handleServerResponse);
};

