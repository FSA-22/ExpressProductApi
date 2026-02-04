# Product CRUD API – Express.js

A secure and scalable **Product CRUD REST API** built with **Express.js**, featuring **JWT authentication**, **refresh tokens**, **role-based authorization**, **rate limiting**, and **request validation**.

This project is designed for **API architecture practice**, **scalable backend development**, and **production-ready Express.js patterns**, using MongoDB as the primary data store.

---

## 🚀 Features

- Full **Create, Read, Update, Delete (CRUD)** operations for products
- **JWT Authentication**
  - Access tokens
  - Refresh tokens
- **Role-Based Authorization**
  - Admin and User access control
- **Protected Routes** using layered middleware
- **Rate Limiting**
  - Prevents abuse and brute-force attempts
  - Endpoint-specific limits for sensitive operations
- **Request Validation**
  - Robust input validation using `express-validator`
  - Centralized validation error handling
- **Image Upload**
  - File uploads handled with `multer`
  - Image URLs stored via **Cloudinary**
- **MongoDB Integration**
  - Data persistence using Mongoose
- **External API Integration**
  - Fetches and maps data from an external API
  - Saves mapped data into a `user-todo` model
- **Centralized Error Handling**
- **Environment Configuration**
  - Secure environment variables using `dotenv`

---

## 🧱 Architecture Highlights

- Middleware-driven request lifecycle
- Clear separation of concerns:
  - Authentication
  - Authorization
  - Rate limiting
  - Validation
  - Business logic (controllers)
- Clean and maintainable project structure
- Easily extendable for future scaling (e.g., Redis, API gateways)

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JSON Web Tokens (JWT)**
- **Multer**
- **Cloudinary**
- **express-validator**
- **express-rate-limit**
- **dotenv**

---

## 📁 Project Structure

```bash
src/
├── controllers/
│   └── products.js
│
├── middleware/
│   ├── authentication.js
│   ├── authorize.js
│   ├── rateLimit.js
│   ├── validate.js
│   ├── upload.js
│   └── errorHandler.js
│
├── validators/
│   └── productValidator.js
│
├── routes/
│   └── products.js
│
├── models/
│   ├── Product.js
│   └── UserTodo.js
│
├── config/
│   ├── db.js
│   └── cloudinary.js
│
├── utils/
│   └── token.js
│
├── app.js
└── server.js
```
