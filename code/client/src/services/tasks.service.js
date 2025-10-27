/* ---------------------------------------------------------------------------
tasks.service.js
This script handles all the API calls using axios for task related queries
------------------------------------------------------------------------------ */

import axios from "axios";

const taskAxios = axios.create({
  baseURL: "http://0.0.0.0:3000/api/v1/tasks",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------------------------------------------------------------------
The function to create a task
------------------------------------------------------------------------------ */

const createTask = async (formData) => {
  try {
    const response = await taskAxios.post("/create", formData, {
      headers: { "Content-Type": "multipart/form-data" }, // because users can attach an image to tasks
    });
    console.log("Task successfully created!: ", response.data);
    return response.data; // the response sent by the backend
  } catch (error) {
    console.log(
      "There was an error while creating the task: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export { createTask };
