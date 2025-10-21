// ----------------------------------------------
// status.routes.js
// It's a special route for simple status checks of the server
// ----------------------------------------------

import { Router } from "express"; // importing the router

// ----------------------------------------------
// All the variables and constants of the file
// ----------------------------------------------

const statusRouter = Router();

// ----------------------------------------------
// Defining the route
// ----------------------------------------------

statusRouter.get("/", (req, res) => {
  res.send("Hey, the server of Task Manager is running!");
});

export default statusRouter; // exporting as default
