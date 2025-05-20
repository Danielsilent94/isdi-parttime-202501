import { errors, validator } from "common";
import getLoggedUserId from "../helpers/getLoggedUserId";

const publishPost = (title, description, img, callback) => {
    try {
        validator.text(title, 40, 1, 'Post-Title');
        validator.text(description, 210, 1, 'Post-Description');

        const postData = { title, description, img };

        const xhr = new XMLHttpRequest();

        xhr.open('POST', `${import.meta.env.VITE_API_APP}/posts`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Basic ${getLoggedUserId()}`);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    callback(null);
                } else {
                    try {
                        const response = JSON.parse(xhr.response);
                        if (errors[response.name]) {
                            callback(new errors[response.name](response.message));
                        } else {
                            callback(new Error(`${response.name}: ${response.message}`));
                        }
                    } catch (parseError) {
                        callback(new Error('Unexpected server response'));
                    }
                }
            }
        };

        xhr.send(JSON.stringify(postData));
    } catch (error) {
        callback(error);
    }
};

export default publishPost;
