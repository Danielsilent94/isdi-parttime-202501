const getLoggedUserId = () => {
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    if (!userId) throw new Error('User not logged in');
    return userId; // no se convierte a número
};

export default getLoggedUserId;


