import data from "../../data";
import { ExistenceError } from "common/errors";
import validator from "common";
import getLoggedUserId from "../helpers/getLoggedUserId";

const toggleLike = (postId) => {
    const loggedUserId = getLoggedUserId()

    validator.id(loggedUserId)

    const post = data.posts.findPostById(postId)

    if (!post) throw new ExistenceError('post not found')

    if (!post.likes) post.likes = [];

    const userIndex = post.likes.indexOf(loggedUserId)

    if (userIndex !== -1) {
        post.likes.splice(userIndex, 1);
    } else {
        post.likes.push(loggedUserId)
    }

    data.posts.updatePostById(postId, post)

}

export default toggleLike