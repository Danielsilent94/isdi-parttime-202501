import { errors } from "common"
import { data } from "../data/index.js"

const populateAuthor = (authorId, post, callback) => {
    data.users.findUserById(authorId, (error, author) => {
        if (error) callback(error)
        else {
            if (!author) callback(new errors.ExistenceError('author not found'))
            else {
                post.author = { id: author.id, username: author.username, avatar: author.avatar }
                const date = new Date(post.createdOn)
                post.createdOn = date.toLocaleString()
                if (post.likes.length > 0 && post.likes.includes(loggedUserId)) {
                    post.isLiked = true
                } else {
                    post.isLiked = false
                }
                callback(null, post)
            }
        }
    })
}


const getAllPosts = (userId, callback) => {
    data.users.findUserById(userId, (error, user) => {
        if (error) callback(error)
        else {
            if (!user) callback(new errors.ExistenceError('user not found'))
            else {
                data.posts.findPosts((error, posts) => {
                    if (error) callback(error)
                    else {
                        if (posts.length > 0) posts.sort((item1, item2) => new Date(item2.createdOn) - new Date(item1.createdOn))

                        for (let i = 0; i < posts.length; i++) {
                            populateAuthor(posts[i].author, posts[i], (error, post) => {

                            })
                        }
                    }
                })
            }
        }
    })
}

export default getAllPosts