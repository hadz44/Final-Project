// Authentication utility functions

// Get token from localStorage
export function getToken() {
  return localStorage.getItem('token')
}

// Save token to localStorage
export function saveToken(token) {
  localStorage.setItem('token', token)
}

// Remove token from localStorage
export function removeToken() {
  localStorage.removeItem('token')
}

// Get user name from localStorage
export function getUserName() {
  return localStorage.getItem('userName')
}

// Save user name to localStorage
export function saveUserName(name) {
  localStorage.setItem('userName', name)
}

// Remove user name from localStorage
export function removeUserName() {
  localStorage.removeItem('userName')
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!getToken()
}

// Clear all auth data
export function clearAuth() {
  removeToken()
  removeUserName()
}

