// ----------------------------------------------
// apiResponse.js
// This file creates an API response class that will be used to handle responses on any successful execution of the program
// ----------------------------------------------

class ApiResponse {
  constructor(statusCode, message = "success", data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400; // the status codes should be less than 400 to represent success
  }
}

export default ApiResponse;
