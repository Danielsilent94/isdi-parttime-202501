const isUserLoggedIn = () => {
    const userId = localStorage.getItem('userId');
    return Boolean(userId);
};

export default isUserLoggedIn;
