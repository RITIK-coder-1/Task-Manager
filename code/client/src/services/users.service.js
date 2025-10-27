/* ---------------------------------------------------------------------------
user.service.js
This script handles all the API calls using axios for user related queries
------------------------------------------------------------------------------ */

import axios from "axios";

const userAxios = axios.create({
  baseURL: "http://0.0.0.0:3000/api/v1/users",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------------------------------------------------------------------
The function to register a user
------------------------------------------------------------------------------ */
const registerUser = async (userData) => {
  try {
    const response = await userAxios.post("/register", userData);
    console.log("User successfully registered!", response);
    return response;
  } catch (error) {
    console.log("Registration Failed: ", error);
    throw error;
  }
};

export { registerUser };
