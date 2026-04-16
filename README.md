# Rule-Based Discount Eligibility Management System (Backend)

## Overview
This project is the backend service for a Rule-Based Discount Eligibility Management System.

It is built using Node.js, Express, and MongoDB, and provides secure APIs for both ADMIN and CUSTOMER users.

The backend supports:
- User registration and login
- Role-based access control
- Discount rule creation and management
- Discount eligibility checks
- Discount application and usage tracking
- Admin usage reports

---

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cookie Parser
- CORS
- Dotenv

---

## Base URL
http://localhost:5000/api

---

## User Roles and Permissions

### CUSTOMER
- Register
- Login
- View discount rules
- Check discount eligibility
- Apply discount
- View own applied discounts

### ADMIN
- Register
- Login
- Create discount rules
- Toggle rule active/inactive
- View all rules
- View discount usage reports

---

## API Endpoints

### Authentication
- POST /auth/register
- POST /auth/login
- POST /auth/logout

### Discount Rules
- POST /discount-rules (Admin only)
- GET /discount-rules
- PATCH /discount-rules/:id/toggle (Admin only)
- POST /discount-rules/check-eligibility
- POST /discount-rules/apply
- GET /discount-rules/my-applied-discounts
- GET /discount-rules/usage-report (Admin only)

### Additional Applied Discount Route
- POST /applied/apply

