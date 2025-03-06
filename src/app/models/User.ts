import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  password: string
  posts: mongoose.Types.ObjectId[] // Lista de referências aos posts
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }] // Relacionamento com Post
})

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User