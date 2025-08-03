# 🧘‍♀️ PranaVeda – A Yoga Class Booking Platform

PranaVeda is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for yoga students and instructors. It allows users to register, login, create and manage wellness sessions (yoga/meditation flows), and track their progress.

---

## 🌐 Features

### 🔐 Authentication
- JWT-based login and registration
- Passwords securely hashed with `bcrypt`
- Protected routes (frontend + backend)

### 👥 User Roles
- **Student**: Can browse and book sessions
- **Instructor**: Can create and manage sessions
- **Admin** (optional): Manage users and all sessions

### 🧑‍🏫 Session Editor
- Title, Tags, JSON URL
- Auto-save (after 5s inactivity or every 30s)
- Save Draft / Publish
- Visual feedback on save

### 📊 Dashboard
- View, edit, and manage created sessions
- Role-based dashboard view

### 💳 Payments (Optional)
- Stripe logic present (currently commented out)

---

## 📁 Project Structure
yoga-project/
├── backend/
│ ├── index.js
│ ├── package.json
│ ├── .env.example
│ └── data/*.json
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── tailwind.config.js
│
└── README.md

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Auth**: JWT + bcrypt
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 🧪 Environment Variables

Create a `.env` file inside `backend/` with the following:
PORT=5000
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection

yaml
Copy code



Refer to `.env.example` for structure.

---

## 💻 Installation & Setup

### 1️⃣ Backend
```bash
cd backend
npm install
npm run dev
2️⃣ Frontend
bash
Copy code
cd frontend
npm install
npm run start
🚀 Live Demo
Frontend: https://frontend-9cjjtkxze-sunkara-amrutha-varshinis-projects.vercel.app

Backend: https://yoga-website-1zrn.onrender.com
