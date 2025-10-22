// ----------------------------------------------
// generateRandomTokenString.js
// This script generates cryptographically secure, random hexadecimal strings that will be created to validate refresh tokens
// ----------------------------------------------

import crypto from "crypto";

// function to generate a secure random string (e.g., 64 characters long)
function generateRandomTokenString(length = 32) {
  // Generate 32 random bytes and convert to a 64-character hexadecimal string
  return crypto.randomBytes(length).toString("hex");
}

export default generateRandomTokenString;
