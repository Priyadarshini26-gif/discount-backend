# Rule-Based Discount Eligibility Management System (Backend)

## Project Overview

The Rule-Based Discount Eligibility Management System is a backend application that allows administrators to create and manage discount rules while enabling customers to check eligibility and apply discounts.

The system evaluates discount eligibility dynamically based on configurable business rules such as minimum order value, user role, usage limits, discount validity period, and first-time user restrictions.

All discount rules, eligibility results, discount usage, and applied discounts are stored in MongoDB to ensure data persistence and consistency.

---

## Features

### Authentication & Authorization
- User Registration
- User Login
- JWT-based Authentication
- Role-Based Access Control (RBAC)
- Protected API Routes

### Discount Rule Management (Admin)
- Create Discount Rules
- View All Discount Rules
- Activate/Deactivate Discount Rules
- Configure:
  - Minimum Order Value
  - Allowed User Role
  - Maximum Usage Limit
  - Discount Percentage
  - Discount Start Date
  - Discount End Date
  - Maximum Discount Amount
  - First-Time User Restriction

### Discount Eligibility Evaluation
- Dynamic Rule Validation
- Eligibility Result Storage
- Validation Based On:
  - Active Status
  - Date Range
  - User Role
  - Minimum Order Value
  - Usage Limits
  - First-Time User Rules

### Discount Application
- Apply Eligible Discounts
- Store Applied Discount History
- Track User Discount Usage
- Enforce Maximum Discount Cap

### Reporting
- Discount Usage Reports for Admin
- Applied Discount History for Customers

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- cors

---

## User Roles

### ADMIN
- Register/Login
- Create Discount Rules
- View Discount Rules
- Activate/Deactivate Rules
- View Usage Reports

### CUSTOMER
- Register/Login
- View Available Discounts
- Check Eligibility
- Apply Discounts
- View Applied Discounts

---

## Database Collections

### Users

```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "password": "String",
  "role": "ADMIN | CUSTOMER"
}
```

### DiscountRule

```json
{
  "_id": "ObjectId",
  "name": "String",
  "minOrderValue": "Number",
  "allowedRole": "String",
  "maxUsage": "Number",
  "discountPercent": "Number",
  "startDate": "Date",
  "endDate": "Date",
  "maxDiscountAmount": "Number",
  "isFirstTimeOnly": "Boolean",
  "isActive": "Boolean"
}
```

### DiscountUsage

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "ruleId": "ObjectId",
  "usedCount": "Number"
}
```

### EligibilityResult

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "ruleId": "ObjectId",
  "orderValue": "Number",
  "isEligible": "Boolean",
  "reason": "String"
}
```

### AppliedDiscount

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "ruleId": "ObjectId",
  "orderValue": "Number",
  "discountAmount": "Number",
  "finalAmount": "Number"
}
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

### Discount Rules

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/discount-rules | Create Discount Rule (Admin) |
| GET | /api/discount-rules | View All Rules (Admin) |
| PATCH | /api/discount-rules/:id/toggle | Activate/Deactivate Rule |
| POST | /api/discount-rules/check-eligibility | Check Discount Eligibility |
| POST | /api/discount-rules/apply | Apply Discount |
| GET | /api/discount-rules/usage-report | Discount Usage Report |
| GET | /api/discount-rules/my-applied-discounts | Customer Applied Discounts |

---

## Business Rules

A discount is applied only when all conditions are satisfied:

- Discount Rule is Active
- Current Date falls within Start Date and End Date
- User Role matches Allowed Role
- Order Value meets Minimum Order Requirement
- Usage Count does not exceed Maximum Usage Limit
- First-Time User condition is satisfied (if enabled)

If any condition fails, the discount application is rejected.

---

## Deployment

Backend deployed on Render.

Backend URL:

```text
https://your-backend-url.onrender.com
```

---

## Author

Priyadarshini
