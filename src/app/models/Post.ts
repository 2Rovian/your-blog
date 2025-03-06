import mongoose, { Schema, Document } from 'mongoose'

export interface IPost extends Document {
  title: string
  content: string
  user: mongoose.Types.ObjectId // Referência ao usuário
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Relacionamento com User
})

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)

export default Post