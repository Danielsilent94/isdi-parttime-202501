const getLoggedUserId = () => {
    let loggedUserId;
    if (localStorage.userId) {
        loggedUserId = localStorage.getItem('userId');
    } else {
        loggedUserId = sessionStorage.getItem('userId');
    }

    return loggedUserId;
};

export default getLoggedUserId;


