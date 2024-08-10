import mongoose, { Document, Schema } from "mongoose";

// Define the interface for a User document
export interface IUser extends Document {
  username: string;
  password: string;
}

// Defined the schema for a User
const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create and export the User model
const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
