import { errors } from "common";
import getLoggedUserId from "../helpers/getLoggedUserId";

const getUserById = (id, callback) => {
    try {
        const loggedUserId = getLoggedUserId();
        if (!loggedUserId) throw new Error("No user logged in");

        const xhr = new XMLHttpRequest();

        xhr.open("GET", `${import.meta.env.VITE_API_APP}/users/${id}`, true);
        xhr.setRequestHeader("Authorization", `Basic ${loggedUserId}`);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const user = JSON.parse(xhr.responseText);
                    callback(null, user);
                } else {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (errors[response.name]) {
                            callback(new errors[response.name](response.message));
                        } else {
                            callback(new Error(`${response.name}: ${response.message}`));
                        }
                    } catch (parseError) {
                        callback(new Error("Unexpected response format"));
                    }
                }
            }
        };

        xhr.send();
    } catch (error) {
        callback(error);
    }
};

export default getUserById;
