// ----------------------------------------------
// apiError.js
// This file creates an API error class that will be used to handle any type of errors in the codebase
// ----------------------------------------------

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong", // default message for better robustness
    errors = [],
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    // Using Error.captureStackTrace for clean stack traces in Node.js environments
    if (stack) {
      this.stack = stack;
    } else {
      // Capture stack trace, starting from the function after the constructor
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
