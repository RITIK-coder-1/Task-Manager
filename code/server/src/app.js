// ----------------------------------------------
// app.js
// Configuration of the backend application.
// ----------------------------------------------

import express from "express"; // importing express
import cors from "cors"; // importing cors for security
import cookieParser from "cookie-parser"; // importing cookie-parser
import ApiError from "./utils/apiError.js"; // importing the API error class

const app = express(); // the express app
const jsonlimit = "16kb"; // setting the limit of accepting data

// setting the cors origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    // only this particular origin can access the server
    credentials: true,
  })
);

// parsing different data into JSON objects to accept in the req.body
app.use(
  express.json({
    limit: jsonlimit, // the limit of the data is defined so that it doesn't get overloaded
  })
);

// parsing URLs and form data
app.use(
  express.urlencoded({
    limit: jsonlimit,
    extended: true, // parsing nested objects too
  })
);

app.use("/static", express.static("public")); // public is the folder that serves the static files
app.use(cookieParser()); // parsing cookies manually because express doesn't do it automatically

// ----------------------------------------------
// Routes
// ----------------------------------------------
import statusRouter from "./routes/status.routes.js"; // Importing the authentication route

// Simple status check
app.use("/api/v1", statusRouter);

// ----------------------------------------------
// Error Handlers
// ----------------------------------------------

// Error handler for non-existant routes
app.use((req, res, next) => {
  next(
    new ApiError(
      404,
      `The requested resource was not found at ${req.originalUrl}`
    )
  );
});

// Global error handling middleware
app.use((error, _req, res, _next) => {
  // we're only using error and res here
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? error : undefined, // Full error object for debugging (only in development)
  });
});

export default app; // exporting the app
