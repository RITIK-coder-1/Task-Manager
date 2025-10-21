// ----------------------------------------------
// apiError.js
// This file creates an API error class that will be used to handle any type of errors in the codebase
// ----------------------------------------------

class ApiError extends Error {
  constructor(statusCode, message, errors = [], stack = "") {
    super(typeof message === "string" ? message : JSON.stringify(message)); // if the message is in JSON data, convert it into string
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    // Stack trace handling
    this.stack = stack || new Error().stack; // If a stack trace is provided, it uses that. Otherwise, it generates a new stack trace. This helps in debugging by showing where the error originated in the code.
  }
}

export default ApiError;
