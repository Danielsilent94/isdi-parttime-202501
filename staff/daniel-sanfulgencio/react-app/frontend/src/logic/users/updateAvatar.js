import { errors, validator } from "common";
import getLoggedUserId from "../helpers/getLoggedUserId";

const updateAvatar = (avatar, callback) => {
    const id = getLoggedUserId();

    try {
        // ✅ Ya no validamos que sea un número porque ahora es un ObjectId (string)
        if (!id || typeof id !== 'string') throw new TypeError("ID is not valid");

        const xhr = new XMLHttpRequest();
        xhr.open("PATCH", `${import.meta.env.VITE_API_APP}/users/${id}/avatar`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", `Basic ${id}`);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 204) {
                    callback(null);
                } else {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (errors[response.name]) callback(new errors[response.name](response.message));
                        else callback(new Error(`${response.name}: ${response.message}`));
                    } catch (parseError) {
                        callback(new Error("Unexpected response format"));
                    }
                }
            }
        };

        xhr.send(JSON.stringify({ avatar }));
    } catch (error) {
        callback(error);
    }
};

export default updateAvatar;
