import monpkg from "mongoose";
import hashpkg1 from "bcryptjs";
import tokenpkg from "jsonwebtoken";

const { hash } = hashpkg1;
const { Schema, model } = monpkg;
const { sign } = tokenpkg;

const UserSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    return next();
  }
  return next();
});

UserSchema.methods.generateJWT = async function () {
  return await sign({ id: this._id }, process.env.JWt_SECRET, {
    expiresIn: "30d",
  });
};

const User = model("User", UserSchema);
export default User;
