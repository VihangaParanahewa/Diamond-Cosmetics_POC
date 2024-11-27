const mysql = require('mysql');

// Load settings securely, e.g., using environment variables
const settings = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'diamond_cosmetics_dev',
};

let connection;

function connectDatabase() {
    if (!connection) {
        connection = mysql.createConnection(settings);

        // Establish connection
        connection.connect((err) => {
            if (err) {
                console.error("Error connecting to the database:", err.message);
                return;
            }
            console.log("Database connected successfully");
        });

        // Handle connection errors
        connection.on("error", (err) => {
            console.error("Database connection error:", err.message);

            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                console.log("Attempting to reconnect...");
                connection = null;
                connectDatabase(); // Re-establish connection
            }
        });
    }

    return connection;
}

module.exports = connectDatabase();
