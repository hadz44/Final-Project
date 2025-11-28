import { BASE_URL } from "../utils/constants";

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Server error: ${res.status} - ${res.statusText}`);
};

const getItems = () => {
  return fetch(`${BASE_URL}/items`)
    .then(handleServerResponse);
};

const addItem = ({ name, imageUrl, weather }, token) => {
  if (!token) {
    return Promise.reject('Authentication error: No authorization token found for adding item');
  }

  return fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleServerResponse);
};

const deleteItem = (_id, token) => {
  if (!token) {
    return Promise.reject('Authentication error: No authorization token found for deleting item');
  }

  return fetch(`${BASE_URL}/items/${_id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

const addCardLike = (id, token) => {
  if (!token) {
    return Promise.reject('Authentication error: No authorization token found for liking item');
  }

  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

const removeCardLike = (id, token) => {
  if (!token) {
    return Promise.reject('Authentication error: No authorization token found for unliking item');
  }

  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export { getItems, addItem, deleteItem, addCardLike, removeCardLike, handleServerResponse };
