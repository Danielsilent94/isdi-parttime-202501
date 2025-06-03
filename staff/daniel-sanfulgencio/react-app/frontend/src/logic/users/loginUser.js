import { errors, validator } from "common";

const loginUser = (email, password, callback) => {
    try {
        validator.email(email);
        validator.text(password, 'password');

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${import.meta.env.VITE_API_APP}/users/auth`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.response);
                    const userId = response.id;

                    // Guardamos el ID en localStorage
                    localStorage.setItem('userId', userId);

                    callback(null); // Éxito
                } else {
                    try {
                        const response = JSON.parse(xhr.response);
                        if (errors[response.name]) {
                            callback(new errors[response.name](response.message));
                        } else {
                            callback(new Error(`${response.name}: ${response.message}`));
                        }
                    } catch (parseError) {
                        callback(new Error("Unexpected error occurred"));
                    }
                }
            }
        };

        xhr.send(JSON.stringify({ email, password }));

    } catch (error) {
        callback(error);
    }
};

export default loginUser;
