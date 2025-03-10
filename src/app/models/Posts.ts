import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  user: mongoose.Types.ObjectId; // Referência ao usuário dono do post
  createdAt: Date;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
