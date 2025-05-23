import { errors, validator } from "common";
import getLoggedUserId from "../helpers/getLoggedUserId";

const getAllPosts = (callback) => {
    const loggedUserId = getLoggedUserId();

    try {
        // Quitar esta validación ya que el ID de Mongo es un string
        // validator.id(loggedUserId); ❌

        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${import.meta.env.VITE_API_APP}/posts`, true);
        xhr.setRequestHeader('Authorization', `Basic ${loggedUserId}`);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const posts = JSON.parse(xhr.response);

                    posts.forEach(post => {
                        const date = new Date(post.createdOn);
                        post.createdOn = date.toLocaleString();
                        post.isLiked = post.likes.includes(loggedUserId);
                    });

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

export default getAllPosts;
