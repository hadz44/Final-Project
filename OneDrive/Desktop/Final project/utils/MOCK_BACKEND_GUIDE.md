# Mock Backend Responses Guide

This document explains how the mock backend responses work and how to test them.

## Overview

The application uses mock data to simulate backend responses when `USE_MOCK_DATA = true` in `utils/api.js`. This allows the instructor to fully review the project without requiring a live backend.

## Simulated Backend Responses

### 1. Authentication Responses

#### Login (`authApi.login`)
**Request:**
```javascript
{
  email: "user@example.com",
  password: "password123"
}
```

**Success Response:**
```javascript
{
  token: "mock-jwt-token-1234567890",
  data: {
    _id: "1",
    name: "User Name",
    email: "user@example.com"
  }
}
```

**Error Cases:**
- Invalid email format: `"Invalid email format"`
- Password too short: `"Password must be at least 8 characters"`
- User not found: Throws error

#### Register (`authApi.register`)
**Request:**
```javascript
{
  email: "newuser@example.com",
  password: "password123",
  name: "New User"
}
```

**Success Response:**
```javascript
{
  token: "mock-jwt-token-1234567890",
  data: {
    _id: "1234567890",
    name: "New User",
    email: "newuser@example.com"
  }
}
```

**Error Cases:**
- Invalid email: `"Invalid email format"`
- Password too short: `"Password must be at least 8 characters"`
- Email already exists: `"User with this email already exists"`

#### Check Token (`authApi.checkToken`)
**Request:** Token string

**Success Response:** `true` (boolean)

**Error Response:** `false` (boolean) - Invalid or expired token

#### Get Current User (`authApi.getCurrentUser`)
**Request:** Token string

**Success Response:**
```javascript
{
  _id: "1",
  name: "User Name",
  email: "user@example.com"
}
```

**Error Cases:**
- Invalid token: `"Invalid token"`
- User not found: `"User not found"`

### 2. Stock Operations

#### Save Stock to Watchlist (`stockApi.saveStock`)
**Request:**
```javascript
{
  symbol: "AAPL",
  keyword: "Apple",
  title: "Apple Inc. Stock",
  text: "Stock information...",
  data: { /* stock data */ }
}
```

**Success Response:**
```javascript
{
  data: {
    _id: "1234567890",
    symbol: "AAPL",
    keyword: "Apple",
    title: "Apple Inc. Stock",
    text: "Stock information...",
    date: "2024-01-01T00:00:00.000Z",
    source: "Stock Market API",
    link: "https://example.com/stock/AAPL",
    image: "https://example.com/images/aapl.jpg",
    data: { /* stock data */ }
  },
  message: "Stock saved successfully"
}
```

**Error Cases:**
- Missing symbol: `"Stock symbol is required"`
- Already in watchlist: `"Stock already in watchlist"`

#### Get Saved Stocks (`stockApi.getSavedStocks`)
**Request:** Token string

**Success Response:**
```javascript
[
  {
    _id: "1",
    symbol: "AAPL",
    keyword: "Apple",
    title: "Apple Inc. Stock Analysis",
    text: "...",
    date: "2024-01-01T00:00:00.000Z",
    source: "Stock Market API",
    link: "https://example.com/stock/AAPL",
    image: "https://example.com/images/aapl.jpg",
    data: { /* stock data */ }
  },
  // ... more stocks
]
```

#### Delete Stock from Watchlist (`stockApi.deleteStock`)
**Request:** Stock ID (string)

**Success Response:**
```javascript
{
  message: "Stock deleted successfully",
  data: {
    _id: "1",
    symbol: "AAPL"
  }
}
```

**Error Cases:**
- Missing ID: `"Stock ID is required"`
- Not found: `"Stock not found"`

## Testing Mock Responses

### Test Login
1. Open the app
2. Click "Sign in"
3. Enter any email and password (min 8 characters)
4. Should successfully log in and show user name

### Test Registration
1. Click "Sign up"
2. Enter email, password (min 8 chars), and name
3. Should create account and log in automatically

### Test Token Validation
1. Log in
2. Refresh the page
3. Should remain logged in (token validated)

### Test Save Stock
1. Search for a stock (e.g., "AAPL")
2. Click save/add to watchlist button (if implemented)
3. Stock should be added to watchlist

### Test Delete Stock
1. Go to Watchlist page
2. Click delete button on a stock
3. Stock should be removed from watchlist

### Test Error Cases
- Try logging in with invalid email format
- Try registering with password less than 8 characters
- Try registering with existing email
- Try deleting non-existent stock

## Pre-populated Mock Data

### Mock Users
- `test@example.com` / any password (8+ chars)
- `demo@example.com` / any password (8+ chars)

### Mock Saved Stocks
- AAPL (Apple Inc.)
- TSLA (Tesla, Inc.)
- MSFT (Microsoft Corporation)

## Switching to Real Backend

To use real backend:
1. Set `USE_MOCK_DATA = false` in `utils/api.js`
2. Configure API URLs in `utils/constants.js`
3. Ensure backend endpoints match the expected format

## Response Format Consistency

All mock responses match the structure of typical backend APIs:
- Success responses include `data` object
- Error responses throw Error with message
- Authentication includes `token` and user `data`
- CRUD operations return created/updated/deleted items

