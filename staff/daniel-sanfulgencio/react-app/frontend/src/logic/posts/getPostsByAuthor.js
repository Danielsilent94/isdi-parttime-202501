import { errors, validator } from "common";
import getLoggedUserId from "../helpers/getLoggedUserId";

const getPostsByAuthor = (authorId, callback) => {
    const loggedUserId = getLoggedUserId();

    try {
        validator.id(loggedUserId);
        validator.id(authorId);

        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${import.meta.env.VITE_API_APP}/posts/author/${authorId}`, true);
        xhr.setRequestHeader('Authorization', `Basic ${loggedUserId}`);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const posts = JSON.parse(xhr.response);

                    // Normalizamos cada post recibido
                    for (let i = 0; i < posts.length; i++) {
                        const post = posts[i];
                        post.createdOn = new Date(post.createdOn).toLocaleString();
                        if (!post.likes) post.likes = [];
                        post.isLiked = post.likes.includes(loggedUserId);
                    }

                    callback(null, posts);
                } else {
                    const response = JSON.parse(xhr.response);
                    if (errors[response.name]) callback(new errors[response.name](response.message));
                    else callback(new Error(`${response.name}: ${response.message}`));
                }
            }
        };

        xhr.send();
    } catch (error) {
        callback(error);
    }
};

export default getPostsByAuthor;
