import jsonwebtokenpkg from "jsonwebtoken";
import User from "../models/User.js";

const { verify } = jsonwebtokenpkg;

/*Middleware function to authenticate user requests using JWT tokens. */

export const authGuard = async (req, res, next) => {
  // Check if the request contains an authorization header and if it starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the JWT token from the authorization header
      const token = req.headers.authorization.split(" ")[1];
      // Verify the token using the JWT_SECRET from environment variables
      const { id } = verify(token, process.env.JWT_SECRET);
      // Retrieve user information from the database based on the token payload
      req.user = await User.findById(id).select("-password");
      // Call the next middleware function
      next();
    } catch (error) {
      // Handle token verification or user retrieval errors
      let err = new Error("Not authorized, Token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    // If the authorization header is missing or doesn't start with "Bearer", respond with an error
    let error = new Error("Not authorized, No token");
    error.statusCode = 401;
    next(error);
  }
};
