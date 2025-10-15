import jsonpkg from "jsonwebtoken";
const { verify } = jsonpkg;
import User from "../models/User.js";

export const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select("-password");
      if (!req.user) {
        let err = new Error("User not found");
        err.statusCode = 401;
        return next(err);
      }
      next();
    } catch (error) {
      let err = new Error("Not authorized, Token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized, No token");
    error.statusCode = 401;
    next(error);
  }
};

export const adminGuard = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    let error = new Error("Not authorized as an admin");
    error.statusCode = 403;
    next(error);
  }
};

export const verifiedGuard = (req, res, next) => {
  if (req.user && req.user.verified) {
    next();
  } else {
    let error = new Error(
      "Email not verified. Please verify your email to access this resource."
    );
    error.statusCode = 403;
    next(error);
  }
};

