# Student Result Management System

## 🎯 Objective
The Student Result Management System simplifies the process of managing and accessing academic results. Designed for educational institutions, it ensures efficiency, transparency, and accuracy in handling student performance data. This system provides a user-friendly interface and robust backend for managing results securely.

## 🛠️ Built With
- **Frontend**: React.js, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker

## ⚙️ Getting Started
To run the project locally, follow these steps:

### 🚀 Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/student-result-management.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the project:
   ```bash
   npm start
   ```

### 🔧 Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables by creating a `.env` file in the root of the backend directory with the following content:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=your_preferred_port
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 🐳 Docker Setup
1. Ensure Docker is installed on your system.
2. Build the Docker images for the frontend and backend:
   ```bash
   sudo docker-compose build
   ```
3. Start the containers:
   ```bash
   sudo docker-compose up
   ```
4. Access the application at `http://localhost:<configured_port>`.

## 🛡️ Features
- Secure login for administrators, teachers, and students.
- Admin functionalities:
  - Add students, subjects, and classes.
  - Publish results.
- Student functionalities:
  - Login with their registered number.
  - View their results.
- Easy result entry and management for administrators and teachers.
- Quick and accessible result viewing for students.
- Scalable and secure database for storing results.
- 
---

**Languages Used:**
- JavaScript
- CSS
- React.js

