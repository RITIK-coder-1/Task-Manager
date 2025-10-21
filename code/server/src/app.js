import express from "express"; // importing express
import cors from "cors"; // importing cors for security
import cookieParser from "cookie-parser"; // importing cookie-parser
import "dotenv/config"; // importing environment variables

const app = express(); // the express app
const limit = "16kb"; // setting the limit of accepting data

// setting the cors origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // only this particular origin can access the server
    credentials: true,
  })
);

// parsing different data into JSON objects to accept in the req.body
app.use(
  express.json({
    limit: limit, // the limit of the data is defined so that it doesn't get overloaded
  })
);

// parsing URLs and form data
app.use(
  express.urlencoded({
    limit: limit,
    extended: true, // parsing nested objects too
  })
);

app.use(express.static("public")); // public is the folder that serves the static files
app.use(cookieParser()); // parsing cookies manually because express doesn't do it automatically

// ----------------------------------------------
// Routes
// ----------------------------------------------
import statusRouter from "./routes/status.routes.js"; // Importing the authentication route

// Simple status check
app.use("/", statusRouter);

export default app; // exporting the app
