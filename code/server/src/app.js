// ----------------------------------------------
// app.js
// Configuration of the backend application.
// ----------------------------------------------

import express from "express"; // importing express
import cors from "cors"; // importing cors for security
import cookieParser from "cookie-parser"; // importing cookie-parser
import ApiError from "./utils/apiError.js"; // importing the API error class
import path from "path"; // importing the path module

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

// public is the folder that serves the static files.
// it takes the absolute path of the current working directory and joins it with the public folder
app.use("/static", express.static(path.join(path.resolve(), "public")));
app.use(cookieParser()); // parsing cookies manually because express doesn't do it automatically

// ----------------------------------------------
// Routes
// ----------------------------------------------
import statusRouter from "./routes/status.routes.js"; // Importing the authentication route
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";

// Simple status check
app.use("/api/v1", statusRouter);

// User routes
app.use("/api/v1/users", userRouter);

// Task routes
app.use("/api/v1/tasks", taskRouter);

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
  console.log("error");
});

export default app; // exporting the app
