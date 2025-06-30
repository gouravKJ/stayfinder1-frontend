stayfinder/
├── backend/
│   ├── index.js
│   ├── models/
│   │   └── Listing.js
│   ├── routes/
│   │   └── listingRoutes.js
│   ├── .env.template
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Bookings.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env.template
│   └── package.json
├── README.md
└── .gitignore

# StayFinder 🏡

**StayFinder** is a full-stack MERN application for discovering and booking verified stays. It includes user login, admin-uploaded listings, and a responsive design.

## 🚀 Tech Stack

| Frontend        | Backend           | Database | Auth  | Deploy |
|----------------|-------------------|----------|-------|--------|
| React, CSS     | Node.js, Express  | MongoDB  | JWT   | Vercel + Render |

---

## 🔧 Features

- 🌐 View all listings
- 🔒 Register / Login / Logout
- 📑 Book listings (only if logged in)
- 🧑 Admin panel to upload properties
- 📱 Clean UI with responsive layout (in progress)

---

## 🛠️ Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/stayfinder.git
cd stayfinder
Setup Backend
bash
Copy
Edit
cd backend
npm install
cp .env.template .env  # Then fill in MONGO_URI and JWT_SECRET
npm run dev

Setup Frontend
bash
Copy
Edit
cd frontend
npm install
cp .env.template .env  # Then set VITE_API_URL=http://localhost:10000
npm start

📁 Environment Variables
backend/.env
env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
frontend/.env
env
Copy
Edit
VITE_API_URL=http://localhost:10000

📦 Deployment
Frontend: Deployed on Vercel

Backend: Deployed on Render

Connect MongoDB Atlas in production

💡 Future Improvements
Mobile responsive navbar

Payment gateway (Razorpay)

Admin dashboard analytics

Google Maps integration

Full SEO optimization

🧑‍💻 Author
Gourav Kumar Jaiswal

