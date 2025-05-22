import { errors, validator } from "common";

const registerUser = (email, password, callback) => {
    try {
        validator.email(email);
        validator.password(password);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${import.meta.env.VITE_API_APP}/users`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    try {
                        //const { id } = JSON.parse(xhr.responseText);
                        //localStorage.setItem("userId", id);
                        callback(null);
                    } catch (error) {
                        callback(new Error("Unexpected response format", error.message));
                    }
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

        xhr.send(JSON.stringify({ email, password }));
    } catch (error) {
        callback(error);
    }
};

export default registerUser;

