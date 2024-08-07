# Blog Challenge API

## Overview

This project provides an API for handling user authentication and transaction management. It uses Express.js for the server framework and MongoDB for data storage. The API supports user registration, transaction creation, and retrieval of transactions.

## Features

- User authentication and authorization
- Create & Read operations for transactions
- Comprehensive error handling
- Unit tests for transaction service

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - Authentication
  - Transaction
- [Validation & Error Handling](#validation-&-error-handling)
- [Running Tests](#running-tests)
- [Contributing](#contributing)

## Getting Started

Follow these instructions to set up the project on your local machine.

## Prerequisite

- node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)
- TypeScript
- Express
- mongoose
- JWT
- mongodb
- cookie parser
- cors
- bcrypt

## Installation

1.  Clone the repository:

    ```sh
    git clone https://github.com/peterihimire/qasetech-task.git
    ```

2.  Change directory into the project folder:

    ```sh
    cd qasetech-task
    ```

3.  Install dependencies:

    ```sh
    npm install
    ```

4.  Set up the environment variables (See Environment Variables):
    Create a .env file in the root directory and add the necessary environment variables.

    ```sh
    cp .env.example .env
    ```

## Running the Server

1.  Start the server:

    ```sh
    npm start
    # or
    yarn start
    ```

2.  Access the API documentation:

    Vsit the postman documentation [Link](https://documenter.getpostman.com/view/12340633/2sA3kUFhDT) of this blog app.

## API Endpoints

All endpoints except authentication endpoints require a valid JWT token. The token should be included in the **Authorization** header as follows:

```makefile
Authorization: Bearer <token>
```

### Authentication

- **Sign Up**:

- URL: /api/auth/signup
- Method: POST
- Auth Required: No
- Request body:

  ```json
  {
    "username": "benji4life",
    "password": "Eromo1123@"
  }
  ```

- Response:

  ```json
  {
    "status": "success",
    "msg": "Signup successful!",
    "data": {
      "username": "benji4life",
      "_id": "66b3cf65f16f7de24d17b834",
      "__v": 0
    }
  }
  ```

- **Sign In**:

- URL: /api/auth/signin
- Method: POST
- Auth Required: No
- Request body:

  ```json
  {
    "username": "benji4life",
    "password": "Eromo1123@"
  }
  ```

- Response:

  ```json
  {
    "status": "success",
    "msg": "Login successful!",
    "data": {
      "username": "peter4lovereal",
      "email": "peterihimire@gmail.com",
      "acctId": "51a2dee1-b89d-42db-bf85-74380e5ea000",
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MWEyZGVlMS1iODlkLTQyZGItYmY4NS03NDM4MGU1ZWEwMDAiLCJlbWFpbCI6InBldGVyaWhpbWlyZUBnbWFpbC5jb20iLCJpYXQiOjE3MjEzNzM5OTcsImV4cCI6MTcyMTQ0NTk5N30.JnBWEl93qojw5FteXgr7X9guMt0NOy9H9PqtpHGTWZo"
    }
  }
  ```

  - **Refresh Token**:

  - URL: /api/auth/refresh-token
  - Method: POST
  - Auth Required: No
  - Request body:

  ```json
  {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzc2NGNhMi03MTA0LTQyMmItYjU4MC01Yjc3MWI0Yzg4ODIiLCJlbWFpbCI6InBldGVyaWhpbWlyZUBnbWFpbC5jb20iLCJpYXQiOjE3MjE0MTM2MzQsImV4cCI6MTcyMjAxODQzNH0.usdmLL9hEYcc_vKAo8ueZeOCvZfrFgkx1DbolyQb4ME"
  }
  ```

- Response:

  ```json
  {
    "status": "success",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzc2NGNhMi03MTA0LTQyMmItYjU4MC01Yjc3MWI0Yzg4ODIiLCJlbWFpbCI6InBldGVyaWhpbWlyZUBnbWFpbC5jb20iLCJpYXQiOjE3MjE0MTM2NTgsImV4cCI6MTcyMTQxNDU1OH0.zTxDP-MC-EYAlr21Dc7DcFlM_mpn3_FF9-Lo2OF1JLg",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzc2NGNhMi03MTA0LTQyMmItYjU4MC01Yjc3MWI0Yzg4ODIiLCJlbWFpbCI6InBldGVyaWhpbWlyZUBnbWFpbC5jb20iLCJpYXQiOjE3MjE0MTM2NTgsImV4cCI6MTcyMjAxODQ1OH0.jN9Km5pXKnH8mKjG9vPTuddN5QZXlWJjydVUtESPsi4"
    }
  }
  ```

- **Sign Out**:
- URL: /api/auth/signout
- Method: POST
- Auth Required: No

- Response:

  ```json
  {
    "status": "success",
    "msg": "Signout successful."
  }
  ```

### Transaction

- **Create a Transaction**:

- URL: /api/transactions
- Method: POST
- Auth Required: Yes
- Request body:

  ```json
  {
    "amount": 50000,
    "type": "credit",
    "description": "Yes this is the $50000 credit"
  }
  ```

- Response:

  ```json
  {
    "status": "success",
    "msg": "Transactionn added!",
    "data": {
      "transactionData": {
        "amount": 50000,
        "type": "credit",
        "description": "Yes this is the $50000 credit",
        "id": "33850df7-e435-4785-acaf-fb4dd7c84702",
        "date": "2024-08-07T19:51:45.689Z",
        "__v": 0
      }
    }
  }
  ```

- **Get All Transactions**:

- URL: /api/transactions
- Method: GET
- Auth Required: Yes

- Response:

  ```json
  {
    "status": "success",
    "msg": "All transactions",
    "data": [
      {
        "id": "96463b56-663b-402a-9d0c-0556731bb229",
        "amount": 100,
        "type": "debit",
        "description": "For tesing purposes",
        "date": "2024-08-07T16:48:42.410Z",
        "__v": 0
      },
      {
        "id": "ca47c426-eb12-4589-bc3a-6bd7042a3f08",
        "amount": 1000,
        "type": "credit",
        "description": "For credit tesing purposes",
        "date": "2024-08-07T16:49:19.734Z",
        "__v": 0
      }
    ]
  }
  ```

- **Get a Transaction**:

- URL: /api/transactions/:id
- Method: GET
- Auth Required: Yes

- Response:

  ```json
  {
    "status": "success",
    "msg": "Transaction info",
    "data": {
      "transactionData": {
        "amount": 50000,
        "type": "credit",
        "description": "Yes this is the $50000 credit",
        "id": "70f5659e-85aa-46e0-927e-b2626cad6a52",
        "date": "2024-08-07T19:41:30.396Z",
        "__v": 0
      }
    }
  }
  ```

## Validation & Error Handling

Input validation was integrated for adding transactions. Also the API uses a centralized error handling mechanism to ensure consistent error responses. Errors are categorized by HTTP status codes and include descriptive messages.

The API uses standard HTTP status codes to indicate the success or failure of an API request. Errors are returned in the following JSON format:

```json
{
  "status": "fail",
  "msg": "Error message",
}
```

**Common Errors**:

- 400 Bad Request: The request was invalid or cannot be otherwise served.
- 401 Unauthorized: Authentication credentials were missing or incorrect.
- 403 Forbidden: The request is understood, but it has been refused or access is not allowed.
- 404 Not Found: The requested resource could not be found.

## Running Test

Unit test with jest was integrated. To test the application simply run the below command:

```sh
npm run test
# or
yarn run test
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request.
