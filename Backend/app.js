// const product = require("./routes/productRoute");
// const user = require("./routes/userRoutes");
// const order = require("./routes/orderRoute");
// const bodyParser = require("body-parser")
// const payment = require("./routes/paymentRoute");
// const express = require('express');
// const cors = require("cors");
// const app = express();
// const dotenv = require("dotenv");
// // dotenv.config({path: "config/config1.env"});
// require("dotenv").config({
//   path: require("path").resolve(__dirname, "config/config1.env"),
//   debug: true
// });

// const cookieParser = require("cookie-parser");

// // ✅ Add this before routes or middleware that uses request body
// app.use(cors({
//   origin: "http://localhost:5173", // your frontend dev URL
//   credentials: true
// }));

// app.use(express.json());
// app.use(cookieParser());


// app.use(bodyParser.urlencoded({extended:true}));

// const errorMiddleware = require("../Backend/middleware/error")
// //Routes import


// console.log("Loaded Environment Variables:", process.env);
// app.use("/api/v1",product); //  /api/v1 always gets add you can give any name
// //Middleware of error
// app.use("/api/v1",user);
// app.use("/api/v1", order);
// app.use("/api/v1", payment);


// app.use(errorMiddleware);


// module.exports = app;
const express = require('express');
const app = express();
const dotenv = require("dotenv");
const path = require("path");

// ✅ Load env vars at the top
require("dotenv").config({
  path: path.resolve(__dirname, "config/config1.env"),
  debug: true
});

// ✅ Log for sanity check

// Continue with imports
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

// Middlewares
const allowedOrigins = [
  "https://quick-basket-one.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173", // Vite preview port
  process.env.FRONTEND_URL // Allow environment variable for frontend URL
].filter(Boolean); // Remove any undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Error handling
const errorMiddleware = require("../Backend/middleware/error");
app.use(errorMiddleware);

module.exports = app;


