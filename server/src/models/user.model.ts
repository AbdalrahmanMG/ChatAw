import mongoose, { Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";
import { IUser } from "../types";

const userSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: { type: String, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        if (ret) {
          delete (ret as any).password;
        }
        return ret;
      },
    },
  }
);


userSchema.pre("save", async function(next) {
  if (this.password && this.isModified("password")){
    this.password = await hashValue(this.password)
  }
})

userSchema.methods.comparePassword = async function( val: string) {
  return compareValue(val, this.password)
}

const UserModel = mongoose.model<IUser>("User", userSchema)
export default UserModel