// ----------------------------------------------
// cloudinary.js
// This script uploads the files from our server to cloudinary, and deletes it from the server once the upload was successfull
// ----------------------------------------------

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Once the file is uploaded to cloudinary, it should be deleted from the server

const deleteLocalFile = async (filepath) => {
  if (!filepath) return; // If the file doesn't exist

  try {
    await fs.unlink(filepath, (err) => {
      if (err) {
        console.error("Could not delete local file:", err);
        // You can choose whether to proceed or fail the request here.
        // Failing the upload because cleanup failed is usually too strict.
      } else {
        console.log("Local file deleted successfully.");
      }
    }); // delete the file
    console.log(`Local file deleted successfully: ${filepath}`);
  } catch (error) {
    // ENOENT (Error No Entry) means the file was already gone.
    if (error.code !== "ENOENT") {
      console.warn(
        `Could not delete local file (Permission/Locking Error): ${filepath}`,
        error.message
      );
    }
  }
};

// upload to cloudinary

const uploadOnCloudinary = async (filepath) => {
  if (!filepath) return null; // If the filepath doesn't exist

  console.log("api key: ", process.env.CLOUDINARY_API_KEY);

  try {
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto", // it uploads the file and provides the resource
    });

    console.log(
      "The file has been successfully uploaded and its URL: ",
      response.url
    );

    return response; // the url will be stored inside the database
  } catch (error) {
    console.error(
      "There was an error while uploading the file on Cloudinary:",
      error.message
    );
    return null;
  } finally {
    // File cleanup should happen regardless of success/failure
    await deleteLocalFile(filepath);
  }
};

// delete from cloudinary

const deleteFromCloudinary = async (fileUrl) => {
  if (!fileUrl) {
    console.error("The file doesn't exist on cloudinary!");
  }

  try {
    await cloudinary.uploader.destroy(fileUrl);
    console.log("The file has been successfully deleted from cloudinary!");
  } catch (error) {
    console.error(
      "There was an error while deleting the file from cloudinary: ",
      error
    );
  }
};

export { uploadOnCloudinary, deleteFromCloudinary }; // Export both for utility
