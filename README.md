# 🏢 Hall Booking Frontend

A web application for creating and booking halls, complete with an **admin dashboard** to manage users (working), bookings, and halls.

🔗 **Live Demo:** [Visit the app](https://aniwakalkar.github.io/hallbooking_frontend/)

---

## 📌 Overview

This is the frontend of a hall booking system built using **React.js**. It allows:

* 🧑‍💼 **Admins** to create, edit, and manage halls
* 🙋 **Users** to view available halls and make bookings
* 🔐 Role-based access with separate views for users and admins

---

## ⚙️ Features

### ✅ User Features:

* View list of available halls
* Book a hall
* View your bookings

### 🛠️ Admin Features:

* Admin dashboard
* Create and manage halls
* View and manage all bookings

---

## 🚀 Technologies Used

* **React.js** (with functional components & hooks)
* **React Router** for navigation
* **Axios** for API calls
* **CSS / Tailwind**

---

## 📁 Project Structure (Simplified)

```
src/
├── components/        # Reusable UI components
|    ├── admminpages/            
|    ├── authpages/            
|    ├── Footer.jsx           
|    ├── Navbar.jsx            
|    ├── PublicHallViewer.jsx           
├── App.js             # Routes & main layout
└── index.js           # React entry point
```

---

## 🧑‍💻 Getting Started

To run the project locally:

```bash
git clone https://github.com/aniwakalkar/hallbooking_frontend.git
cd hallbooking_frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Make sure to configure the backend API URL:

Create a `.env` file in the root with:

```env
REACT_APP_API_URL=https://your-backend-api.com
```
