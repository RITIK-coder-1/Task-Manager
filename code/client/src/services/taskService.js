/* ---------------------------------------------------------------------------
taskService.js
This script handles all the API calls using axios for task related queries
------------------------------------------------------------------------------ */

import axios from "axios";

const taskAxios = axios.create({
  baseURL: "http://0.0.0.0:3000/api/v1/users",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------------------------------------------------------------------
The axios request interceptor for credentials
------------------------------------------------------------------------------ */

taskAxios.interceptors.request.use(
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
The function to create a task
------------------------------------------------------------------------------ */

const createTask = async (userId, formData) => {
  try {
    const response = await taskAxios.post(`${userId}/tasks/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" }, // because users can attach an image to tasks
    });
    console.log("Task successfully created!: ", response.data);
    return response.data; // the response sent by the backend
  } catch (error) {
    console.error(
      "There was an error while creating the task: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to get a task
------------------------------------------------------------------------------ */

const getTask = async (taskId) => {
  if (!taskId) {
    throw new Error("The task ID is required to fetch the task!");
  }
  try {
    const response = await taskAxios.get(`/${taskId}`);
    console.log("Task successfully retrieved!: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "There was a problem while retrieving the task: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to update a task
------------------------------------------------------------------------------ */

const updateTask = async (taskId, formData) => {
  try {
    const response = await taskAxios.patch(`/${taskId}`, formData);
    console.log("Task successfully updated!: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "There was a problem while updating the task: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to delete a task
------------------------------------------------------------------------------ */

const deleteTask = async (taskId) => {
  try {
    const response = await taskAxios.delete(`/${taskId}`);
    console.log("Task successfully deleted!: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "There was a problem while deleting the task: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export { createTask, getTask, updateTask, deleteTask };
