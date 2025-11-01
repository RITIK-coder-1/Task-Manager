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
      timeout: 30000, // custom timeout for file upload
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
The function to display all the tasks
------------------------------------------------------------------------------ */

const displayAllTasks = async (userId) => {
  try {
    const response = await taskAxios.get(`/${userId}/tasks`);
    console.log("Tasks successfully retrieved!: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "There was a problem while retrieving the tasks: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

/* ---------------------------------------------------------------------------
The function to get a specific task
------------------------------------------------------------------------------ */

const getTask = async (userId, taskId) => {
  try {
    const response = await taskAxios.get(`/${userId}/tasks/${taskId}`);
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

const updateTask = async (userId, taskId, formData) => {
  try {
    const response = await taskAxios.patch(`${userId}/${taskId}`, formData);
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

const deleteTask = async (userId, taskId) => {
  try {
    const response = await taskAxios.delete(`${userId}/${taskId}`);
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

export { createTask, displayAllTasks, updateTask, deleteTask };
