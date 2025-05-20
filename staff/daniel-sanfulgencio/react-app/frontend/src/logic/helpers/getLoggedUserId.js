const getLoggedUserId = () => {
    let loggedUserId;
    if (localStorage.id) {
        loggedUserId = localStorage.getItem('id');
    } else {
        loggedUserId = sessionStorage.getItem('id'); // ahora es un string (Mongo ID)
    }

    return loggedUserId;
}

export default getLoggedUserId;
