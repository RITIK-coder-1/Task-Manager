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
    const response = await userAxios.post("/register", userData); // the response object of axios
    console.log("User successfully registered!", response);
    return response.data; // the response sent by the backend
  } catch (error) {
    console.log(
      "Registration Failed: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to login a user
------------------------------------------------------------------------------ */
const loginUser = async (userData) => {
  try {
    const response = await userAxios.post("/login", userData);
    console.log("User successfully logged in!", response);
    return response.data;
  } catch (error) {
    console.log(
      "Login Failed: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to logout a user
------------------------------------------------------------------------------ */

const logout = async () => {
  try {
    const response = await userAxios.post("/logout");
    console.log("The user has been successfully logged out: ", response);
    return response.data;
  } catch (error) {
    console.error(
      "There was a problem while logging the user out: ",
      error.response?.message || error.message
    );
    throw error;
  }
};

export { registerUser, loginUser, logout };
