// require("dotenv").config();

const app = require("./app");

// dotenv.config({path: "Backend/config/config.env"});
// const path = require("path");
// dotenv.config({ path: path.resolve(__dirname, "config/config.env") });

const connectDatabase = require("./config/database");
// console.log("PORT from .env:", process.env.PORT);
// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    console.error("Shutting down due to uncaught exception");
    process.exit(1);
});

// Load environment variables if not in production


// Connect to the database
connectDatabase();


 const PORT =  4000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
     
    
});

// Handle server errors
server.on("error", (err) => {
    if (err.code === "EACCES") {
        console.error(`Permission denied on port ${PORT}. Use another port or run with elevated privileges.`);
    } else if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Choose a different port.`);
    } else {
        console.error(`Server error: ${err.message}`);
    }
    process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Promise Rejection: ${err.message}`);
    console.error("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});
