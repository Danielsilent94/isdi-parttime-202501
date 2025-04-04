import deletePost from "./deletePost";
import getAllPosts from "./getAllPosts";
import getPostsByAuthor from "./getPostsByAuthor";
import publishPost from "./publishPost";
import toggleLike from "./toggleLike";


const posts = {
    getAllPosts,
    publishPost,
    toggleLike,
    getPostsByAuthor,
    deletePost
}

export default posts