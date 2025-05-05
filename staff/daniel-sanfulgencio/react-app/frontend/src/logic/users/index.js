import deleteUserById from "./deleteUserById";
import getUserAvatar from "./getUserAvatar";
import getUserBioById from "./getUserBioById";
import getUserIdByUsername from "./getUserIdByUsername";
import getUserUsername from "./getUserUsername";
import isUserLoggedIn from "./isUserLoggedIn";
import loginUser from "./loginUser";
import logoutUser from "./logoutUser";
import registerUser from "./registerUser";
import getRandomBio from "./getRandomBio";
import updateAvatar from "./updateAvatar";
import updateBio from "./updateBio";
import updateEmail from "./updateEmail";
import updatePassword from "./updatePassword";
import updateUsername from "./updateUsername";

const users = {
    getUserUsername,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    updateAvatar,
    updateBio,
    updateUsername,
    getUserAvatar,
    getUserBioById,
    getUserIdByUsername,
    updatePassword,
    updateEmail,
    deleteUserById,
    getRandomBio
}

export default users