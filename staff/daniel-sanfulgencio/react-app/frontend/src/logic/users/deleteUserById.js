import data from "../../data"
import { AuthError, ExistenceError } from "common/errors"
import validator from "common"

const deleteUserById = (id, password) => {
    validator.id(id)
    validator.password(password)

    const user = data.users.findUserById(id)

    if (!user) throw new ExistenceError('user not found')
    if (user.password !== password) throw new AuthError('incorrect password')

    const userPosts = data.posts.retrievePostsByAuthorId(id)

    userPosts.forEach(post => {
        data.posts.deletePostById(post.id)
    });

    const allPosts = data.posts.retrievePosts()

    allPosts.forEach(post => {
        const likeIndex = post.likes.indexOf(id)
        if (likeIndex !== -1) {
            const newPost = post
            newPost.likes.splice(likeIndex, 1)

            data.posts.updatePostById(post.id, newPost)
        }
    })

    data.users.deleteUserById(id)
}

export default deleteUserById