# ☕ Full-Stack POS System with Analytics, Auth, and Admin Calendar

## 🧰 toolkit
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=white)
![https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=white](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SCSS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)&nbsp;
![Python](https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=white)&nbsp;
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white)

# Demo
https://drive.google.com/file/d/1gXqOkUylMEd9uap7tssXMtrdpCfTCPQ-/view?usp=sharing

## 🧠 Overview

This project is a full-featured **Point of Sale (POS) System** for a café. It includes:

- A dynamic sales interface
- Order history tracking
- Business analytics dashboard
- Role-based login authentication
- An admin-only employee scheduling calendar with `.ics` file import

The goal of this project is to **learn full-stack development end-to-end**, from React UI components to backend APIs with Flask and data modeling in PostgreSQL.

---

## 🚀 Features

### 👥 Authentication
- Login page using email & password
- Session/token storage
- Role-based access (admin vs employee)
- Protected routes across the app

### 🛍️ POS Interface (/pos)
- Clickable item menu (coffee, tea, etc.)
- Customer name input
- Cart sidebar with item list and total
- "Complete Order" button that submits order to backend

### 📋 Order History (/orders)
- List of all submitted orders
- Displays customer name, timestamp, items, and total
- Pulled dynamically from PostgreSQL

### 📊 Analytics Dashboard (/dashboard)
- Revenue over time (bar or line chart)
- Most popular items (pie chart)
- Orders per day (table or chart)
- Powered by SQL aggregation + chart libraries

### 📆 Employee Calendar (/calendar)
- Viewable calendar with scheduled shifts
- Upload `.ics` files (iCalendar format) to populate events
- Admin-only ability to add/edit/delete events
- Role-checking ensures only authorized access

---

## 🧰 Technologies You’re Learning

### 🖼️ Frontend (React + Vite)
- **React**: UI building with components and state
- **Vite**: Fast modern React development
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **Axios**: API communication
- **Recharts / Chart.js**: Data visualization
- **Context API**: Global state (auth, cart)
- **LocalStorage**: Persistent login session
- **FileReader API**: For parsing uploaded `.ics` calendar files

### 🔧 Backend (Flask + PostgreSQL)
- **Flask**: Web server & API routing
- **Flask-CORS**: Enable frontend/backend communication
- **Flask-SQLAlchemy**: ORM for PostgreSQL
- **Flask-Bcrypt**: Secure password hashing
- **psycopg2-binary**: PostgreSQL database driver
- **dotenv**: Environment variable management
- **Role-based auth**: Secure route access by role

### 🗄️ Database (PostgreSQL)
- **Relational data modeling** (users, orders, items, calendar events)
- **SQL queries** for analytics (SUM, COUNT, GROUP BY)
- **Role column** to distinguish admins and employees

---
