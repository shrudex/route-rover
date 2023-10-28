import jwt from "jsonwebtoken";

// Define a secret key. You should replace this with your actual secret key.
const secretKey = "shrudex-key";

// Create a function to decode the token and return user info.
const decodeToken = (token) => {
  try {
    // Verify and decode the token using your secret key.
    const decoded = jwt.verify(token, secretKey);

    // The decoded object should contain user information.
    return decoded;
  } catch (error) {
    // If there's an error, the token is invalid or has expired.
    // You can handle this error as needed.
    console.error("Token decoding error:", error);
    return null; // or throw an error
  }
};

export default decodeToken;
