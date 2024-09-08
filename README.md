# Employee Management System

## Description

The Employee Management System is a web application designed to allow
administrators to perform CRUD (Create, Read, Update, Delete) operations on
employee records. The application ensures proper validation and authentication
mechanisms to protect sensitive employee data.

## Features

- **User Authentication**: Secure login and registration system using JWT (JSON
  Web Tokens).
- **CRUD Operations**: Administrators can create, read, update, and delete
  employee records.
- **Data Validation**: Robust data validation on both client and server sides.
- **Responsive Design**: User-friendly interface designed with responsiveness in
  mind.

## Tech Stack

- **Frontend**:
  - React
  - Tailwind CSS
  - Axios
  - Redux
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JSON Web Tokens (JWT) for authentication
  - bcrypt for password hashing
  - validator for input validation

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/toyaAoi/PRODIGY_FS_02.git
   cd PRODIGY_FS_02

   ```

2. **Install dependencies:**

- Backend:

  ```bash
    cd server
    pnpm install

    ## or

    npm install
  ```

- Frontend:

  ```bash
    cd client
    pnpm install

    ## or

    npm install
  ```

3. **Environment Variables:** Create a `.env` file in the `server` directory
   with the following variables:

```bash
  PORT=5000
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
```

4. **Run the application:**

- Backend:

  ```bash
    cd server
    pnpm start

    ## or

    npm start
  ```

- Frontend:

  ```bash
    cd client
    pnpm run dev

    ## or

    npm run dev
  ```

## Usage

1. **Register a new admin user:**

- Send a POST request to `/auth/register` with `username`, `password`.

2. **Login as an admin:**

- Send a POST request to `/auth/login` with `username` and `password`.
- Receive a JWT token upon successful login.

3. **Manage Employee Records:**

- Use the JWT token to authenticate API requests for managing employee records.

  **Endpoints**:

  - `POST /employees` - Create a new employee.
  - `GET /employees` - Retrieve all employees.
  - `GET /employees/:id` - Retrieve a single employee by ID.
  - `PUT /employees/:id` - Update an employee.
  - `DELETE /employees/:id` - Delete an employee.
