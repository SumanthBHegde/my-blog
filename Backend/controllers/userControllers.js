import User from "../models/User.js";
import Comment from "../models/Comments.js";
import Post from "../models/Post.js";

// Middleware imports
import { uploadProfilePicture } from "../middleware/uploadPictureMiddleware.js";
import { cloudinary } from "../config/cloudinary.js";
import { sendVerificationEmail } from "../utils/emailService.js";

// Helper function to format user response data (excludes sensitive info like password)
const formatUserResponse = (user) => ({
  _id: user._id,
  avatar: user.avatar,
  name: user.name,
  email: user.email,
  verified: user.verified,
  admin: user.admin,
  token: user.token, // Token will be added separately
});

// Controller to handle user registration
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists with the provided email
    let user = await User.findOne({ email });

    if (user) {
      // If user exists but is not verified, allow re-registration with new details
      if (!user.verified) {
        // Generate new verification code
        const verificationCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

        // Update user with new details
        user.name = name;
        user.password = password; // This will be hashed by the pre-save hook
        user.verificationCode = verificationCode;
        await user.save();

        // Send verification email
        try {
          await sendVerificationEmail(email, verificationCode);
        } catch (emailError) {
          console.error("Email sending failed:", emailError.message);
          // In development, continue with registration even if email fails
          if (process.env.NODE_ENV === "production") {
            throw emailError;
          }
        }

        // Return success response
        return res.status(200).json({
          ...formatUserResponse(user),
          message:
            process.env.NODE_ENV === "production"
              ? "Account found but not verified. New verification code sent to your email."
              : `Account updated. Check console for verification code: ${verificationCode}`,
        });
      }

      // User exists and is verified
      throw new Error("User has already registered");
    }

    // Generate verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create a new user document in the database
    user = await User.create({
      name,
      email,
      password,
      verificationCode,
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationCode);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
      // In development, continue with registration even if email fails
      if (process.env.NODE_ENV === "production") {
        throw emailError;
      }
    }

    // Return success response with user data (without token until verified)
    return res.status(201).json({
      ...formatUserResponse(user),
      message:
        process.env.NODE_ENV === "production"
          ? "Registration successful. Please check your email for verification code."
          : `Registration successful. Check console for verification code: ${verificationCode}`,
    });
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};

// Controller to handle user login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email not found");
    }

    if (await user.comparePassword(password)) {
      if (!user.verified) {
        return res.status(403).json({
          message:
            "Please verify your email before logging in. Check your email for the verification code or request a new one.",
          verified: false,
          email: user.email, // Include email so frontend can offer to resend verification
          requiresVerification: true,
        });
      }

      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

// Controller to handle email verification
const verifyEmail = async (req, res, next) => {
  try {
    const { email, verificationCode } = req.body;

    // Find user by email
    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.verified) {
      throw new Error("Email already verified");
    }

    if (user.verificationCode !== verificationCode) {
      throw new Error("Invalid verification code");
    }

    // Update user as verified
    user.verified = true;
    user.verificationCode = undefined; // Clear the verification code
    await user.save();

    // Generate JWT token
    const token = await user.generateJWT();

    return res.status(200).json({
      ...formatUserResponse(user),
      token,
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Controller to resend verification code
const resendVerificationCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find user by email
    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.verified) {
      throw new Error("Email already verified");
    }

    // Generate new verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    user.verificationCode = verificationCode;
    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationCode);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
      if (process.env.NODE_ENV === "production") {
        throw emailError;
      }
    }

    return res.status(200).json({
      message:
        process.env.NODE_ENV === "production"
          ? "Verification code sent successfully"
          : `Verification code sent. Check console for code: ${verificationCode}`,
    });
  } catch (error) {
    next(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);

    if (user) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
      });
    } else {
      let error = new Error("User not found");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userIdToUpdate = req.params.userId;

    let userId = req.user._id;

    if (!req.user.admin && userId !== userIdToUpdate) {
      let error = new Error("Forbidden resource");
      error.statusCode = 403;
      throw error;
    }

    let user = await User.findById(userIdToUpdate);

    if (!user) {
      throw new Error("User not found");
    }

    if (typeof req.body.admin !== "undefined" && req.user.admin) {
      user.admin = req.body.admin;
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length < 7) {
      throw new Error("Password length must be at least 6 character");
    } else if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUserProfile = await user.save();

    res.json({
      _id: updatedUserProfile._id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verified,
      admin: updatedUserProfile.admin,
      token: await updatedUserProfile.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadProfilePicture.single("profilePicture");

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occured when uploading " + err.message
        );
        next(error);
      } else {
        // Everything went well
        if (req.file) {
          let updatedUser = await User.findById(req.user._id);

          // Delete old avatar from Cloudinary if exists
          if (updatedUser.avatar) {
            try {
              const publicId = updatedUser.avatar
                .split("/")
                .slice(-2)
                .join("/")
                .split(".")[0];
              await cloudinary.uploader.destroy(publicId);
            } catch (error) {
              console.error(
                "Error deleting old avatar from Cloudinary:",
                error
              );
            }
          }

          // Save new Cloudinary URL
          updatedUser.avatar = req.file.path;
          await updatedUser.save();

          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        } else {
          // Remove avatar
          let updatedUser = await User.findById(req.user._id);

          if (updatedUser.avatar) {
            try {
              const publicId = updatedUser.avatar
                .split("/")
                .slice(-2)
                .join("/")
                .split(".")[0];
              await cloudinary.uploader.destroy(publicId);
            } catch (error) {
              console.error("Error deleting avatar from Cloudinary:", error);
            }
          }

          updatedUser.avatar = "";
          await updatedUser.save();

          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.email = { $regex: filter, $options: "i" };
    }
    let query = User.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await User.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .sort({ updatedAt: "desc" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId);

    if (!user) {
      throw new Error("User no found");
    }

    const postsToDelete = await Post.find({ user: user._id });
    const postIdsToDelete = postsToDelete.map((post) => post._id);

    await Comment.deleteMany({
      post: { $in: postIdsToDelete },
    });

    await Post.deleteMany({
      _id: { $in: postIdsToDelete },
    });

    // Delete all post images from Cloudinary
    for (const post of postsToDelete) {
      if (post.photo) {
        try {
          const publicId = post.photo
            .split("/")
            .slice(-2)
            .join("/")
            .split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error("Error deleting post image from Cloudinary:", error);
        }
      }
    }

    // Delete user avatar from Cloudinary
    if (user.avatar) {
      try {
        const publicId = user.avatar
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Error deleting user avatar from Cloudinary:", error);
      }
    }

    await user.deleteOne();

    res.status(204).json({ message: "User is deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationCode,
  userProfile,
  updateProfile,
  updateProfilePicture,
  getAllUsers,
  deleteUser,
};
