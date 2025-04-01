const getLoggedUserId = () => {
    let loggedUserId;
    if (localStorage.id) {
        loggedUserId = JSON.parse(localStorage.getItem('id'));
    } else {
        loggedUserId = JSON.parse(sessionStorage.getItem('id')); //comprobar si se ha guardado el id de un usuario loggeado
    }

    return loggedUserId
}

export default getLoggedUserId