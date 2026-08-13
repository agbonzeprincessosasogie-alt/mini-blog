# Mini Blog API

A RESTful blog API built with Node.js, Express, MongoDB and JWT authentication.

## Features

- User registration
- User login
- JWT authentication
- Create posts
- View published posts
- Update posts
- Delete posts
- Post ownership authorization
- Request validation

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-validator

## Installation

Clone the repository.

Install dependencies:

npm install

Create a .env file:

PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

Run the server:

node server.js

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Posts

GET /api/posts

POST /api/posts

PUT /api/posts/:id

DELETE /api/posts/:id

## Authentication

Protected endpoints require:

Authorization: Bearer <token>