// ----------------------------------------------
// cloudinary.js
// This script uploads the files from our server to cloudinary
// ----------------------------------------------

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filepath) => {
  try {
    const response = await cloudinary.uploader.upload(filepath, {
      resourse_type: "auto",
    });
    console.log(
      "The file has been successfully uploaded and its url: ",
      response.url
    );

    // delete the file after uploading
    fs.unlink(filepath, (error) => {
      error
        ? console.error(
            "The file has been uploaded successfully but there was an error while deleting the file from the server: ",
            error
          )
        : console.log(
            "The file has been uploaded successfully and it has been deleted from the server"
          );
    });

    return response;
  } catch (error) {
    // delete the file incase it's been tampered with
    fs.unlink(filepath, (error) => {
      error
        ? console.error(
            "The file hasn't been uploaded and there was an error while deleting the file from the server: ",
            error
          )
        : console.log(
            "The file hasn't been uploaded but it has been deleted from the server"
          );
    });

    console.error(
      "There was an error while uploading the file on cloudinary: ",
      error
    );

    return null;
  }
};

export default uploadOnCloudinary;
