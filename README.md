1- Prerequisites--------

Before you start, ensure you have the following installed:

Node.js (v14 or later)
npm or yarn (for package management)
MongoDB (for the database, optional if using cloud solutions)

2- Installation-------
Clone the Repository

bash
Copy code
git clone https://github.com/rahulsinghpharthyal/assingment
Navigate to the Project Directory

bash
Copy code
cd your-repo-name
Install Backend Dependencies

bash
Copy code
cd backend
npm install
Install Frontend Dependencies

bash
Copy code
cd ../frontend
npm install

3- Backend Configuration

Create a .env file in the backend directory.

Add the following environment variables:

makefile
Copy code
MONGO_URI=mongodb://localhost:27017/your-database-name
PORT=5000
JWT_SECRET=your-jwt-secret


Running the Project
Start the Backend Server

bash
Copy code
cd backend
npm start
The backend server will run on http://localhost:7000 by default.

Start the Frontend Development Server

bash
Copy code
cd ../frontend
npm start
The frontend development server will run on http://localhost:3000 by default.


When you start the project you may sign in as a default user if you want to admin you can manualy change the role into the backend role is admin like that 
if you want to use my Database url: -mongodb+srv://rahulpharthyal04:ypM9D0wlm97ApuFM@cluster0.cumer.mongodb.net/assingment
and the credential for admin is suraj@gmail.com and password is: admin
so kindaly login as a admin in this



API Endpoints
User Routes
GET /api/auth/get-avilable - Retrieve a list of available users.
GET /api/auth/getuserdata/:id - Get user availability by user ID and date.
Availability Routes
POST /api/availability - Create or update availability.
GET /api/availability/:id - Retrieve availability by user ID.
Contributing
If you'd like to contribute to this project, follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/YourFeature).
Create a Pull Request.

create a admin manualiy from database 
that after login as a user and login as admin user can be add the slots in the for as availibility
