import data from "../../data"
import { AuthError, ExistenceError } from "../../utils/errors"
import validator from "../../utils/validators"

const deletePost = (userId, postId) => {
    validator.id(userId)
    validator.id(postId)
    const post = data.posts.findPostById(postId)
    if (!post) throw new ExistenceError('post not found')
    if (post.author !== userId) throw new AuthEror('no permissions')

    data.posts.deletePostById(postId)
}

export default deletePost