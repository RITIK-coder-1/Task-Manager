// ----------------------------------------------
// auth.middleware.js
// This middleware verifies the access token of users before logging them out
// ----------------------------------------------

import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import User from "../models/users.model";

const verifyJwtFunction = async (req, _, next) => {
  try {
    // the client can send a cookie or a custom header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", ""); // replace "Bearer <token>" to "<token>"

    if (!token) {
      throw new ApiError(400, "Unauthorized request");
    } // throw an error if there is no access token

    // decoding the payload of the token (only if it is valid)
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // the user
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(400, "Invalid Access Token");
    } // if the user doesn't exist with the specific token

    req.user = user; // adding the user to the request object for later processing

    next();
  } catch (error) {
    throw new ApiError(400, "Could not verify the access token");
  }
};

const verifyJwt = asyncHandler(verifyJwtFunction);

export default verifyJwt;
