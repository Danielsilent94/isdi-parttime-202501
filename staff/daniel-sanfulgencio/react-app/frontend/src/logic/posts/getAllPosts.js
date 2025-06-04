import { errors } from "common";
import getLoggedUserId from "../helpers/getLoggedUserId";

const getAllPosts = (callback) => {
    const loggedUserId = getLoggedUserId();

    try {
        // 🚫 Eliminamos validación que asume que loggedUserId debe ser número
        if (!loggedUserId || typeof loggedUserId !== "string") {
            throw new TypeError("Logged user ID is not valid");
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${import.meta.env.VITE_API_APP}/posts`, true);
        xhr.setRequestHeader("Authorization", `Basic ${loggedUserId}`);

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
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (errors[response.name]) {
                            callback(new errors[response.name](response.message));
                        } else {
                            callback(new Error(`${response.name}: ${response.message}`));
                        }
                    } catch {
                        callback(new Error("Unexpected error retrieving posts"));
                    }
                }
            }
        };

        xhr.send();
    } catch (error) {
        callback(error);
    }
};

export default getAllPosts;
