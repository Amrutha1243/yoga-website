# 🧘‍♀️ PranaVeda – A Yoga Class Booking Platform

PranaVeda is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for yoga students and instructors. It allows users to register, login, view and book yoga classes, and for instructors to manage their offerings.

---

## 🌐 Features

### 🔐 Authentication
- JWT-based login and registration
- Passwords are securely hashed using `bcrypt`
- Auto-login post registration
- Protected frontend routes based on token presence

### 👥 User Roles
- **Student**: Can browse, book, and enroll in classes
- **Instructor**: Can create and manage classes
- **Admin** (optional): Can manage users and all classes

### 🧑‍🏫 Instructor Dashboard
- Add, edit, and update yoga classes
- View enrolled students (planned)

### 📚 Class Management
- Add classes with name, price, seats, video link, etc.
- Approve/pending class moderation system
- Enrollments handled per class

### 🛒 Cart (Optional)
- Add to cart functionality for students before booking

### 💳 Payments (Pluggable)
- Stripe logic included but commented (easy to enable)

---

## 📁 Project Structure

### 🖥️ Frontend (`/client`)
- Built using **React + Tailwind CSS**
- React Router DOM used for navigation
- Role-based navigation and route protection
- Beautiful landing page with Swiper carousel
- Pages:
  - `Home`, `Classes`, `Instructors`
  - `Auth.js` – combined Login/Register page with background image
  - Protected routes and logout logic
- Token stored in `localStorage`

### 🔧 Backend (`/server`)
- Built with **Node.js + Express**
- MongoDB Atlas for data storage
- Collections:
  - `users`, `classes`, `instructors`, `cart`, `enrolled`, `applied`
- RESTful API for all CRUD operations
- JWT middleware (`verifyJWT`) for protected routes
- Password hashing and comparison using `bcryptjs`

---

## 🔐 Security

- JWT signed using `.env` secret
- Password hashing using bcrypt
- Admin/Instructor route protection
- Token expiry check on frontend

---

## 📦 Installation & Setup

### Backend (Server)
```bash
cd server
npm install
npm run dev   # or node index.js
#live executions
Frontend: https://frontend-9cjjtkxze-sunkara-amrutha-varshinis-projects.vercel.app

Backend: https://yoga-website-1zrn.onrender.com
