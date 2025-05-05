import { errors } from "common"
import { data } from "../data/index.js"

const createPost = (authorId, title, description, img, callback) => {
    data.users.findUserById(authorId, (error, user) => {
        if (error) callback(error)
        else {
            if (!user) callback(new errors.ExistenceError('user not found'))
            else {
                const post = {
                    likes: [],
                    createdOn: new Date(),
                    title,
                    description,
                    img,
                    author: authorId
                }
                data.posts.createPost(post, (error, post) => {
                    if (error) callback(error)
                    else {
                        if (!post) callback(new errors.ServerError('unexpected error'))
                        else {
                            callback(null)
                        }
                    }
                })
            }
        }
    })
}

export default createPost