# TrueMate Dating App - API Documentation

## Overview

This document provides comprehensive documentation for all API endpoints in the TrueMate dating application backend. The API is built with Express.js and uses JWT authentication for protected routes.

**Base URL**: `http://localhost:3000/api`
**Authentication**: Bearer Token (JWT)
**Content-Type**: `application/json`

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Response Format

All API responses follow this structure:

### Success Response
```json
{
  "success": true,
  "data": {}, // Response data
  "message": "Success message",
  "pagination": { // For paginated endpoints
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## API ENDPOINTS

### 1. Authentication Routes (`/api/auth`)

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "gender": "male|female|other",
  "dateOfBirth": "1990-01-01",
  "phone": "+1234567890",
  "bio": "Looking for meaningful connections",
  "interests": ["music", "travel", "reading"],
  "hobbies": ["photography", "hiking"],
  "lookingFor": "Serious relationship",
  "location": {
    "city": "New York",
    "state": "NY",
    "country": "USA"
  },
  "authMethod": "email|google"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful!",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "male",
    "age": 34,
    "tokens": 50,
    "profilePhotos": [],
    "isVerified": false,
    "registrationComplete": true
  }
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "male",
    "age": 34,
    "bio": "Looking for meaningful connections",
    "profilePhotos": [],
    "tokens": 50,
    "role": "user",
    "isVerified": false,
    "hobbies": ["photography", "hiking"],
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "USA"
    }
  }
}
```

#### POST `/api/auth/check-user`
Check if a user exists (for Google sign-in flow).

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "exists": true,
  "registrationComplete": true,
  "authMethod": "google"
}
```

#### POST `/api/auth/google-login`
Login with Google for existing users.

**Request Body:**
```json
{
  "email": "john@example.com",
  "googleId": "google-id-here"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "male",
    "age": 34,
    "bio": "Looking for meaningful connections",
    "profilePhotos": [],
    "tokens": 50,
    "role": "user",
    "isVerified": false,
    "hobbies": ["photography", "hiking"],
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "USA"
    }
  }
}
```

#### GET `/api/auth/me` 🔒
Get current user profile.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "male",
    "age": 34,
    "bio": "Looking for meaningful connections",
    "profilePhotos": [
      {
        "url": "/uploads/photo.jpg",
        "isMain": true,
        "isVerified": false
      }
    ],
    "tokens": 50,
    "totalEarned": 100,
    "totalSpent": 50,
    "isOnline": true,
    "lastSeen": "2024-01-01T12:00:00Z",
    "isVerified": false,
    "isPhotoVerified": false,
    "isBlocked": false,
    "role": "user",
    "interests": ["music", "travel"],
    "hobbies": ["photography", "hiking"],
    "lookingFor": "Serious relationship",
    "location": {
      "city": "New York",
      "state": "NY",
      "country": "USA"
    },
    "preferences": {
      "ageMin": 18,
      "ageMax": 50,
      "maxDistance": 100,
      "interestedIn": "female"
    }
  }
}
```

#### POST `/api/auth/logout` 🔒
Logout current user.

**Response:**
```json
{
  "success": true,
  "message": "Logged out"
}
```

#### PUT `/api/auth/fcm-token` 🔒
Update FCM token for push notifications.

**Request Body:**
```json
{
  "fcmToken": "fcm-token-here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "FCM token updated"
}
```

---

### 2. User Routes (`/api/users`)

#### GET `/api/users/profiles` 🔒
Get user profiles for discovery (paginated).

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `minAge` (number, optional)
- `maxAge` (number, optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "user-id",
      "name": "Jane Doe",
      "age": 28,
      "bio": "Love traveling and meeting new people",
      "profilePhotos": [
        {
          "url": "/uploads/photo.jpg",
          "isMain": true,
          "isVerified": false
        }
      ],
      "location": {
        "city": "Los Angeles",
        "state": "CA",
        "country": "USA"
      },
      "interests": ["music", "travel"],
      "hobbies": ["photography"],
      "lookingFor": "Serious relationship",
      "isOnline": true,
      "lastSeen": "2024-01-01T12:00:00Z",
      "isVerified": true,
      "gender": "female"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

#### GET `/api/users/explore` 🔒
Alias for `/api/users/profiles`

#### GET `/api/users/online` 🔒
Get online users only.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "user-id",
      "name": "Jane Doe",
      "age": 28,
      "profilePhotos": [
        {
          "url": "/uploads/photo.jpg",
          "isMain": true,
          "isVerified": false
        }
      ],
      "isVerified": true
    }
  ]
}
```

#### GET `/api/users/:id` 🔒
Get specific user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "Jane Doe",
    "age": 28,
    "bio": "Love traveling and meeting new people",
    "profilePhotos": [
      {
        "url": "/uploads/photo.jpg",
        "isMain": true,
        "isVerified": false
      }
    ],
    "location": {
      "city": "Los Angeles",
      "state": "CA",
      "country": "USA"
    },
    "interests": ["music", "travel"],
    "isOnline": true,
    "lastSeen": "2024-01-01T12:00:00Z",
    "isVerified": true,
    "gender": "female"
  }
}
```

#### PUT `/api/users/profile` 🔒
Update user profile.

**Request Body:**
```json
{
  "name": "John Updated",
  "bio": "Updated bio",
  "interests": ["music", "travel", "cooking"],
  "hobbies": ["photography", "hiking", "reading"],
  "lookingFor": "Casual dating",
  "location": {
    "city": "San Francisco",
    "state": "CA",
    "country": "USA"
  },
  "preferences": {
    "ageMin": 25,
    "ageMax": 40,
    "maxDistance": 50,
    "interestedIn": "female"
  },
  "dateOfBirth": "1990-01-01"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Updated",
    "bio": "Updated bio",
    // ... updated user fields
  }
}
```

#### POST `/api/users/photo` 🔒
Upload profile photo.

**Request:** `multipart/form-data`
- `photo` (file, required): Image file (max 5MB, image/*)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "url": "/uploads/photo-1234567890.jpg",
      "isMain": true,
      "isVerified": false
    }
  ]
}
```

#### DELETE `/api/users/photo/:photoId` 🔒
Delete profile photo.

**Response:**
```json
{
  "success": true,
  "data": [
    // Remaining photos array
  ]
}
```

#### PUT `/api/users/photo/:photoId/main` 🔒
Set photo as main profile photo.

**Response:**
```json
{
  "success": true,
  "data": [
    // Updated photos array with new main photo
  ]
}
```

#### POST `/api/users/:id/block` 🔒
Block a user.

**Response:**
```json
{
  "success": true,
  "message": "User blocked"
}
```

#### DELETE `/api/users/:id/block` 🔒
Unblock a user.

**Response:**
```json
{
  "success": true,
  "message": "User unblocked"
}
```

---

### 3. Chat Routes (`/api/chat`)

#### GET `/api/chat/conversations` 🔒
Get all conversations for current user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "conversation-id",
      "user": {
        "id": "user-id",
        "name": "Jane Doe",
        "profilePhotos": [
          {
            "url": "/uploads/photo.jpg",
            "isMain": true,
            "isVerified": false
          }
        ],
        "isOnline": true,
        "lastSeen": "2024-01-01T12:00:00Z",
        "gender": "female"
      },
      "lastMessage": {
        "sender": "user-id",
        "content": "Hey! How are you?",
        "timestamp": "2024-01-01T12:00:00Z",
        "isRead": false
      },
      "unreadCount": 2,
      "updatedAt": "2024-01-01T12:00:00Z"
    }
  ]
}
```

#### POST `/api/chat/conversation/:userId` 🔒
Get or create conversation with a user.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "conversation-id",
    "user": {
      "id": "user-id",
      "name": "Jane Doe",
      "profilePhotos": [
        {
          "url": "/uploads/photo.jpg",
          "isMain": true,
          "isVerified": false
        }
      ],
      "isOnline": true,
      "lastSeen": "2024-01-01T12:00:00Z",
      "gender": "female"
    },
    "messages": [
      {
        "sender": "user-id",
        "content": "Hey! How are you?",
        "timestamp": "2024-01-01T12:00:00Z",
        "isRead": false
      }
    ],
    "unreadCount": 2
  }
}
```

#### GET `/api/chat/conversation/:conversationId/messages` 🔒
Get messages in a conversation (paginated).

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 50)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "sender": "user-id",
      "content": "Hey! How are you?",
      "timestamp": "2024-01-01T12:00:00Z",
      "isRead": false
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "hasMore": true
  }
}
```

#### PUT `/api/chat/conversation/:conversationId/read` 🔒
Mark all messages in conversation as read.

**Response:**
```json
{
  "success": true,
  "message": "Messages marked as read"
}
```

---

### 4. Call Routes (`/api/calls`)

#### POST `/api/calls/initiate` 🔒
Initiate a voice or video call.

**Request Body:**
```json
{
  "receiverId": "user-id",
  "callType": "audio|video"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "callId": "call-id",
    "roomId": "room-uuid",
    "callType": "video",
    "receiver": {
      "id": "user-id",
      "name": "Jane Doe",
      "profilePhotos": [
        {
          "url": "/uploads/photo.jpg",
          "isMain": true,
          "isVerified": false
        }
      ]
    }
  }
}
```

#### PUT `/api/calls/:callId/accept` 🔒
Accept an incoming call.

**Response:**
```json
{
  "success": true,
  "data": {
    "callId": "call-id",
    "roomId": "room-uuid",
    "callType": "video"
  }
}
```

#### PUT `/api/calls/:callId/decline` 🔒
Decline an incoming call.

**Response:**
```json
{
  "success": true,
  "message": "Call declined"
}
```

#### PUT `/api/calls/:callId/end` 🔒
End an ongoing call.

**Response:**
```json
{
  "success": true,
  "data": {
    "callId": "call-id",
    "duration": 15,
    "tokensCharged": 30,
    "tokensEarned": 20
  }
}
```

#### GET `/api/calls/history` 🔒
Get call history (paginated).

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "call-id",
      "user": {
        "id": "user-id",
        "name": "Jane Doe",
        "profilePhotos": [
          {
            "url": "/uploads/photo.jpg",
            "isMain": true,
            "isVerified": false
          }
        ]
      },
      "callType": "video",
      "status": "ended",
      "duration": 15,
      "isCaller": true,
      "tokensCharged": 30,
      "tokensEarned": 0,
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50
  }
}
```

---

### 5. Token Routes (`/api/tokens`)

#### GET `/api/tokens/packages` 🔒
Get available token packages.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "package-id",
      "name": "Starter Pack",
      "description": "Perfect for beginners",
      "tokens": 100,
      "bonusTokens": 20,
      "price": 9.99,
      "isActive": true,
      "features": ["Chat", "Audio calls"]
    }
  ]
}
```

#### POST `/api/tokens/purchase` 🔒
Purchase token package.

**Request Body:**
```json
{
  "packageId": "package-id",
  "paymentMethod": "card|paypal|upi",
  "paymentId": "payment-transaction-id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Purchase successful!",
  "data": {
    "tokens": 120,
    "newBalance": 170
  }
}
```

#### GET `/api/tokens/transactions` 🔒
Get transaction history (paginated).

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `type` (string, optional): Filter by transaction type

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "transaction-id",
      "type": "purchase",
      "amount": 9.99,
      "tokens": 120,
      "description": "Purchased Starter Pack",
      "status": "completed",
      "balanceAfter": 170,
      "relatedUser": null,
      "createdAt": "2024-01-01T12:00:00Z"
    },
    {
      "id": "transaction-id",
      "type": "chat_deduct",
      "amount": 0,
      "tokens": -5,
      "description": "Chat with Jane Doe",
      "status": "completed",
      "balanceAfter": 165,
      "relatedUser": {
        "id": "user-id",
        "name": "Jane Doe",
        "profilePhotos": [
          {
            "url": "/uploads/photo.jpg",
            "isMain": true,
            "isVerified": false
          }
        ]
      },
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

#### GET `/api/tokens/balance` 🔒
Get current token balance and statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "tokens": 170,
    "totalEarned": 100,
    "totalSpent": 50
  }
}
```

#### GET `/api/tokens/gifts` 🔒
Get available virtual gifts.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "gift-id",
      "name": "Rose",
      "description": "A virtual rose",
      "price": 10,
      "imageUrl": "/uploads/gifts/rose.png",
      "isActive": true
    },
    {
      "id": "gift-id",
      "name": "Chocolate",
      "description": "Virtual chocolate box",
      "price": 25,
      "imageUrl": "/uploads/gifts/chocolate.png",
      "isActive": true
    }
  ]
}
```

#### POST `/api/tokens/gifts/send` 🔒
Send a virtual gift to a user.

**Request Body:**
```json
{
  "giftId": "gift-id",
  "receiverId": "user-id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Gift sent!",
  "data": {
    "gift": {
      "id": "gift-id",
      "name": "Rose",
      "price": 10
    },
    "newBalance": 160
  }
}
```

---

### 6. Notification Routes (`/api/notifications`)

#### GET `/api/notifications` 🔒
Get user notifications (paginated).

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "notification-id",
      "type": "new_message",
      "title": "New message",
      "message": "Jane Doe sent you a message",
      "isRead": false,
      "relatedUser": {
        "id": "user-id",
        "name": "Jane Doe",
        "profilePhotos": [
          {
            "url": "/uploads/photo.jpg",
            "isMain": true,
            "isVerified": false
          }
        ]
      },
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ],
  "unreadCount": 5
}
```

#### POST `/api/notifications/fcm-token`
Save FCM token for push notifications (no auth required).

**Request Body:**
```json
{
  "fcmToken": "fcm-token-here"
}
```

**Response:**
```json
{
  "success": true
}
```

#### PUT `/api/notifications/:id/read` 🔒
Mark notification as read.

**Response:**
```json
{
  "success": true
}
```

#### PUT `/api/notifications/read-all` 🔒
Mark all notifications as read.

**Response:**
```json
{
  "success": true
}
```

#### DELETE `/api/notifications/:id` 🔒
Delete notification.

**Response:**
```json
{
  "success": true
}
```

---

### 7. Admin Routes (`/api/admin`)

#### POST `/api/admin/login`
Admin login for web panel.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin-password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "admin-jwt-token",
  "user": {
    "name": "Admin User",
    "email": "admin@example.com"
  }
}
```

#### GET `/api/admin/dashboard` 🔒🔐
Get admin dashboard statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1000,
    "activeUsers": 500,
    "totalRevenue": 10000,
    "todayRevenue": 500,
    "totalCalls": 2000,
    "todayCalls": 50
  }
}
```

#### GET `/api/admin/users` 🔒🔐
Get all users (paginated).

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `search` (string, optional)
- `gender` (string, optional)
- `isBlocked` (boolean, optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "gender": "male",
      "age": 34,
      "tokens": 50,
      "isOnline": true,
      "isBlocked": false,
      "isVerified": false,
      "registrationComplete": true,
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1000
  }
}
```

#### PUT `/api/admin/users/:id` 🔒🔐
Update user information.

**Request Body:**
```json
{
  "name": "Updated Name",
  "isBlocked": true,
  "isVerified": true,
  "tokens": 100
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    // Updated user object
  }
}
```

#### POST `/api/admin/users/:id/tokens` 🔒🔐
Add tokens to user account.

**Request Body:**
```json
{
  "tokens": 50,
  "reason": "Bonus tokens"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tokens added successfully"
}
```

#### GET `/api/admin/settings` 🔒🔐
Get admin settings.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "key": "welcome_tokens_male",
      "value": "50",
      "description": "Welcome tokens for male users"
    }
  ]
}
```

#### PUT `/api/admin/settings/:key` 🔒🔐
Update admin setting.

**Request Body:**
```json
{
  "value": "75"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Setting updated"
}
```

#### GET `/api/admin/transactions` 🔒🔐
Get all transactions (paginated).

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `type` (string, optional)
- `userId` (string, optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "transaction-id",
      "type": "purchase",
      "amount": 9.99,
      "tokens": 120,
      "description": "Purchased Starter Pack",
      "status": "completed",
      "balanceAfter": 170,
      "user": {
        "id": "user-id",
        "name": "John Doe"
      },
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5000
  }
}
```

#### GET `/api/admin/call-rates` 🔒🔐
Get call rate settings.

**Response:**
```json
{
  "success": true,
  "data": {
    "video_call_token_per_minute_male": 30,
    "video_call_token_per_minute_female": 0,
    "video_call_token_per_minute_other": 15,
    "audio_call_token_per_minute_male": 20,
    "audio_call_token_per_minute_female": 0,
    "audio_call_token_per_minute_other": 10,
    "min_tokens_for_video_call": 30,
    "min_tokens_for_audio_call": 20
  }
}
```

#### PUT `/api/admin/call-rates` 🔒🔐
Update call rate settings.

**Request Body:**
```json
{
  "video_call_token_per_minute_male": 35,
  "audio_call_token_per_minute_male": 25,
  "min_tokens_for_video_call": 40
}
```

**Response:**
```json
{
  "success": true,
  "message": "Call rates updated"
}
```

#### POST `/api/admin/packages` 🔒🔐
Create new token package.

**Request Body:**
```json
{
  "name": "Premium Pack",
  "description": "Best value package",
  "tokens": 500,
  "bonusTokens": 100,
  "price": 39.99,
  "features": ["Unlimited chat", "HD video calls", "Priority support"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "package-id",
    "name": "Premium Pack",
    "description": "Best value package",
    "tokens": 500,
    "bonusTokens": 100,
    "price": 39.99,
    "isActive": true,
    "features": ["Unlimited chat", "HD video calls", "Priority support"]
  }
}
```

#### PUT `/api/admin/packages/:id` 🔒🔐
Update token package.

#### DELETE `/api/admin/packages/:id` 🔒🔐
Delete token package.

#### POST `/api/admin/gifts` 🔒🔐
Create new virtual gift.

**Request Body:**
```json
{
  "name": "Teddy Bear",
  "description": "Cute virtual teddy bear",
  "price": 50,
  "imageUrl": "/uploads/gifts/teddy.png"
}
```

#### PUT `/api/admin/gifts/:id` 🔒🔐
Update virtual gift.

#### DELETE `/api/admin/gifts/:id` 🔒🔐
Delete virtual gift.

---

## Socket.IO Events

### Connection
Client connects to WebSocket server.

### Events:

#### `join`
Join user's personal room for notifications.

**Emit:**
```json
{
  "userId": "user-id"
}
```

#### `message`
Send chat message.

**Emit:**
```json
{
  "conversationId": "conversation-id",
  "content": "Hello!",
  "receiverId": "user-id"
}
```

**Receive:**
```json
{
  "id": "message-id",
  "conversationId": "conversation-id",
  "sender": "user-id",
  "content": "Hello!",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### `call:initiate`
Initiate call.

**Emit:**
```json
{
  "callId": "call-id",
  "roomId": "room-uuid",
  "caller": {
    "id": "user-id",
    "name": "John Doe"
  },
  "callType": "video"
}
```

#### `call:accept`
Accept call.

#### `call:decline`
Decline call.

#### `call:end`
End call.

#### `typing`
Typing indicator.

**Emit:**
```json
{
  "conversationId": "conversation-id",
  "isTyping": true
}
```

#### `online`
User online status update.

---

## Error Codes

### HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `402` - Payment Required (insufficient tokens)
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Custom Error Responses:
```json
{
  "success": false,
  "message": "Email already exists"
}
```

```json
{
  "success": false,
  "message": "Insufficient tokens",
  "tokensNeeded": 30,
  "currentTokens": 10
}
```

```json
{
  "success": false,
  "message": "Inappropriate content detected. Please upload a different photo.",
  "error": "NSFW_CONTENT_DETECTED"
}
```

---

## Token System

### Token Deduction Rules:
- **Male to Female Chat**: 5 tokens per message
- **Female to Male Chat**: Free
- **Other Gender Chat**: 2 tokens per message
- **Male Video Call**: 30 tokens per minute
- **Female Video Call**: Free (earns 20 tokens/min)
- **Male Audio Call**: 20 tokens per minute
- **Female Audio Call**: Free (earns 15 tokens/min)

### Minimum Token Requirements:
- **Video Call**: 30 tokens minimum
- **Audio Call**: 20 tokens minimum
- **Chat**: 5 tokens minimum

---

## File Uploads

### Profile Photos:
- **Max Size**: 5MB
- **Allowed Types**: image/*
- **NSFW Detection**: Automatic content filtering
- **Storage**: `/uploads/` directory
- **URL Format**: `/uploads/filename.jpg`

---

## Rate Limiting & Caching

### Caching Strategy:
- **User Profiles**: 30 seconds TTL
- **Profile Listings**: 30 seconds TTL  
- **Call History**: 30 seconds TTL
- **Settings**: Long TTL (1 hour)

### Rate Limits:
- **File Uploads**: 5MB max per request
- **API Requests**: No explicit rate limiting (implement as needed)

---

## Security Features

### Authentication:
- JWT tokens with 7-day expiration
- Password hashing with bcrypt (10 rounds)
- Google OAuth integration

### Content Moderation:
- NSFW image detection using TensorFlow.js
- Automatic photo rejection for inappropriate content

### Data Protection:
- Password field excluded from queries by default
- Input validation and sanitization
- CORS enabled for cross-origin requests

---

## Environment Variables

Required environment variables:

```env
NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/truemate

# JWT
JWT_SECRET=your-jwt-secret-key

# Firebase (optional)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

---

## Testing

### Health Check:
```bash
GET /
```

**Response:**
```json
{
  "app": "truemate API",
  "status": "running",
  "version": "1.0.0",
  "cache": {
    "hits": 100,
    "misses": 20,
    "size": 50
  }
}
```

---

## Support

For API support and issues, contact the development team or check the application logs for detailed error information.

---

*Last Updated: January 2024*
