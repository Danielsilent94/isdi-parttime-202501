import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: "" },
    bio: { type: String, default: "" },           // 👈 nuevo
    avatarUrl: { type: String, default: "" },     // 👈 nuevo
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)