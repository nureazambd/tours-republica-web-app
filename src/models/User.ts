import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  password: string;
  newsletter: boolean;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    password: { type: String, required: true },
    newsletter: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
