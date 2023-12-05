import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";

const userSchema = new Schema(
  {
    user_uuid: {
      type: true,
      required: true,
      default: () => uuidV4(),
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//To prevent modification of password property when user documents when updated
userSchema.pre("save", async function () {
  if (this.isModified("password") && !this.isNew) {
    throw ErrInvalidPassword;
  }
});

const User = model("Users", userSchema);

export default User;
