import Post from '../models/Post.js'
import { errors } from 'common'

const posts = {
    createPost: async (post, callback) => {
        try {
            post.createdOn = new Date()
            post.likes = []
            const newPost = await Post.create(post)
            callback(null, newPost)
        } catch (error) {
            callback(error)
        }
    },

    findPosts: async (callback) => {
        try {
            const allPosts = await Post.find()
            callback(null, allPosts)
        } catch (error) {
            callback(error)
        }
    },

    findPostById: async (id, callback) => {
        try {
            const post = await Post.findById(id)
            callback(null, post)
        } catch (error) {
            callback(error)
        }
    },

    updatePostById: async (id, newPostData, callback) => {
        try {
            const updated = await Post.findByIdAndUpdate(id, newPostData, { new: true })
            if (!updated) return callback(new errors.ExistenceError('post not found'))
            callback(null, updated)
        } catch (error) {
            callback(error)
        }
    }
}

export default posts
