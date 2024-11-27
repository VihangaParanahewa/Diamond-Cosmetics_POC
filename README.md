# Diamond-Cosmetics_POC

This project is a POC for Diamond Cosmetic Pvt Ltd. It is built with a Node.js backend and an Angular frontend. The project leverages MySQL as the database.

---

## Prerequisites

To run this project locally, ensure you have the following installed:
- **Node.js**: [Download Node.js](https://nodejs.org) > v18
- **MySQL**: [Download MySQL](https://dev.mysql.com/downloads/)
- **Angular CLI**: [Install Angular CLI](https://angular.io/cli) > v15

---

## Installation and Setup

### 1. Set Up the Database

1. Locate the `diamond_cosmetics_dev.sql` file provided with this project.
2. Import the `diamond_cosmetics_dev.sql` file into your MySQL database using one of the following methods:
   - **Command Line**:
     ```bash
     mysql -u [username] -p [database_name] < path/to/db.sql
     ```
   - **MySQL Workbench** or **phpMyAdmin**: Use the import feature to upload and execute the SQL file.
3. Verify that the database tables and data have been successfully imported.

---

### 2. Set Up the Backend Server

1. Navigate to the `Server` directory:
   ```bash
   cd Server
2. Install the required Node.js dependencies:
   ```bash
   npm install
3. Start the backend server:
   ```bash
   nodemon start
4. Verify that the server is running by checking its configured port (default):
   ```bash
   http://localhost:3000/

### 3. Set Up the Frontend

1. Navigate to the `Client` directory:
   ```bash
   cd Client
2. Install the required Angular dependencies:
   ```bash
   npm install
3. Start the Angular development server:
   ```bash
   ng serve
4. The Angular app will run at:
   ```bash
   http://localhost:4200/

