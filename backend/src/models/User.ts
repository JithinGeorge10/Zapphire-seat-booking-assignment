import { Schema, model } from "mongoose";
import { userValidators } from "./User.validator"; // Adjust the import path as necessary

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: userValidators.username.validator,
        message: userValidators.username.message,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: userValidators.email.validator,
        message: userValidators.email.message,
      },
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: userValidators.phone.validator,
        message: userValidators.phone.message,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: userValidators.password.validator,
        message: userValidators.password.message,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
