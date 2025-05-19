import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  img: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdOn: { type: Date, default: Date.now }
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

export default Post
