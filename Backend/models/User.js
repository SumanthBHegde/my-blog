import monpkg from "mongoose";
import hashpkg1 from "bcryptjs";
import tokenpkg from "jsonwebtoken";

const { hash, compare } = hashpkg1;
const { Schema, model } = monpkg;
const { sign } = tokenpkg;

// Define the User schema for MongoDB using Mongoose
// This schema represents the structure of user documents in the database
const UserSchema = new Schema(
  {
    avatar: { type: String, default: "" }, // Optional user avatar URL
    name: {
      type: String,
      required: [true, "Name is required"], // Validation: name is mandatory
      minlength: [2, "Name must be at least 2 characters long"], // Minimum length validation
      maxlength: [50, "Name cannot exceed 50 characters"], // Maximum length validation
    },
    email: {
      type: String,
      required: [true, "Email is required"], // Email is mandatory
      unique: true, // Ensures no duplicate emails in the database
      lowercase: true, // Converts email to lowercase before saving
      validate: {
        validator: function (v) {
          // Custom validator for email format using regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email address", // Error message for invalid email
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"], // Password is mandatory
      minlength: [6, "Password must be at least 6 characters long"], // Minimum length for security
    },
    verified: { type: Boolean, default: false }, // Email verification status
    verificationCode: { type: String, required: false }, // Code for email verification
    admin: { type: Boolean, default: false }, // Admin privilege flag
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Add database indexes for performance optimization
UserSchema.index({ admin: 1 }); // Index on admin for role-based queries

// Pre-save middleware to hash the password before saving to the database
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Only hash if password has been modified
    this.password = await hash(this.password, 10); // Hash with salt rounds of 10
    return next();
  }
  return next();
});

// Instance method to generate a JWT token for authentication
UserSchema.methods.generateJWT = async function () {
  return await sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 30 days
  });
};

// Instance method to compare entered password with stored hashed password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password); // Returns true if passwords match
};

// Create and export the User model based on the schema
const User = model("User", UserSchema);
export default User;

