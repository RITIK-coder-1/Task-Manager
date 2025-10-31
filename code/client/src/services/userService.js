/* ---------------------------------------------------------------------------
userService.js
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
The axios request interceptor for credentials
------------------------------------------------------------------------------ */

userAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // If the token exists, attach it to the Headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  // Error handling if the request config fails
  (error) => {
    return Promise.reject(error);
  }
);

/* ---------------------------------------------------------------------------
The function to register a user
------------------------------------------------------------------------------ */
const registerUser = async (userData) => {
  try {
    const response = await userAxios.post(
      "/register",
      userData, // The file data payload
      {
        headers: {
          // It forces Axios to let the browser set the correct 'multipart/form-data' header (Because a user can upload the profile pic while registering).
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // custom timeout for file related operations
      }
    );
    console.log("user data: ", userData);

    console.log("User successfully registered!", response.data);
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
    console.log("User successfully logged in!", response.data);
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

const logoutUser = async () => {
  try {
    const response = await userAxios.post("/logout");
    console.log("The user has been successfully logged out: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "There was a problem while logging the user out: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to fetch a user's details
------------------------------------------------------------------------------ */

const getUser = async () => {
  try {
    const response = await userAxios.get("/me");
    console.log("The user has been successfully fetched! :", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "There was an error while fetching the user's details : ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to update a user's details
------------------------------------------------------------------------------ */

const updateUser = async (updatedData) => {
  try {
    const response = await userAxios.patch("/me/details", updatedData);
    console.log(
      "The details of the user has been successfully updated! :",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "There was an error while updating the user's details : ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to update a user's password
------------------------------------------------------------------------------ */

const updatePassword = async (updatedData) => {
  try {
    const response = await userAxios.patch("/me/password", updatedData);
    console.log(
      "The password of the user has been successfully updated! :",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "There was an error while updating the user's password : ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to update a user's profile pic
------------------------------------------------------------------------------ */

const updatePic = async (profileFormData) => {
  try {
    const response = await userAxios.patch(
      "/me/profile",
      profileFormData, // The file data payload
      {
        headers: {
          // It forces Axios to let the browser set the correct 'multipart/form-data' header.
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // custom timeout for image upload
      }
    );

    console.log(
      "The profile pic of the user has been successfully updated! :",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "There was an error while updating the user's profile : ",
      error.response?.data?.message || error.message,
      "Status:",
      error.response?.status
    );
    throw error;
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  updatePassword,
  updatePic,
};
