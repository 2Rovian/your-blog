import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  briefDescription: string;
  posts: Array<{
    title: string;
    content: string;
    createdAt: Date;
  }>;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  briefDescription: { type: String },
  posts: {
    type: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    default: []
  }
});


const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;