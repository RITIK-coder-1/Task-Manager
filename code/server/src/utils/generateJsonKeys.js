// ----------------------------------------------
// generateJsonKeys.js (JWT Secret Key Generator)
// This script generates cryptographically secure, random hexadecimal strings suitable for use as JWT secrets (ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET)
// ----------------------------------------------

import { randomBytes } from "crypto";

const BYTE_LENGTH = 64; // The length of the random data to generate (64 bytes is highly secure)

function generateSecret() {
  // 1. Generate random bytes.
  // 2. Convert the bytes to a hexadecimal string for easy reading and pasting.
  return randomBytes(BYTE_LENGTH).toString("hex");
}

console.log(`Access key generated: ${generateSecret()}`);
console.log(`Refresh key generated: ${generateSecret()}`);
