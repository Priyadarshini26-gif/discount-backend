<b>Rule-Based Discount Eligibility Management System (Backend)</b>

Project Overview:
This is the Backend of a Rule-Based Discount Eligibility Management System built with Node.js, Express, and MongoDB.  
It provides APIs to:
- Register and authenticate users (CUSTOMER / ADMIN)  
- Manage discount rules (ADMIN)  
- Evaluate discount eligibility (CUSTOMER)  
- Apply discounts and track usage (CUSTOMER)  
- Generate usage reports (ADMIN) 

User Role and Permission:
CUSTOMER: Register/Login/Check discount eligibility/Apply discount/View applied discounts
ADMIN: Register/Login/Create discount rules/View discount usage report/

Method:
POST
GET

URL: 

Sample request and response formats:

1. Registration:
req_data:{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}

res_data: {
  "_id": "65f1a2c9e4b0c1a123456789",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "CUSTOMER",
  "token": "jwt_token_here"
}

2. Login:
req_data:{
  "email": "john@example.com",
  "password": "password123"
}

res_data:{
  "_id": "65f1a2c9e4b0c1a123456789",
  "name": "John Doe",
  "role": "CUSTOMER",
  "token": "jwt_token_here"
}

3. Create discount rule:
req_data: {
  "name": "NEWYEAR10",
  "minOrderValue": 1000,
  "allowedRole": "CUSTOMER",
  "maxUsage": 5,
  "discountPercent": 10
}

res_data:{
  "_id": "65f2b9cde4b0c1a987654321",
  "name": "NEWYEAR10",
  "minOrderValue": 1000,
  "allowedRole": "CUSTOMER",
  "maxUsage": 5,
  "discountPercent": 10,
  "isActive": true
}

4. Check discount eligibility:
req_data:{
  "ruleId": "65f2b9cde4b0c1a987654321",
  "orderValue": 1200
}

res_data:{
  "isEligible": true,
  "message": "User is eligible for the discount"
}

5. Apply discount:
req_data:{
  "ruleId": "65f2b9cde4b0c1a987654321",
  "orderValue": 1200
}

res_data:{
  "discountAmount": 120,
  "finalAmount": 1080,
  "message": "Discount applied successfully"
}

6. View applied discounts:
res_data:[
  {
    "_id": "65f3d1eae4b0c1a555555555",
    "orderValue": 1200,
    "discountAmount": 120,
    "finalAmount": 1080,
    "ruleId": {
      "name": "NEWYEAR10",
      "discountPercent": 10
    }
  }
]

7. Discount usage report:
res_data:[
  {
    "discountName": "NEWYEAR10",
    "usedCount": 3
  }
]


status code:
200 - success
401 - created
400 - Already exist
401 - Unauthorised
403 - invalid code
500 - Server error