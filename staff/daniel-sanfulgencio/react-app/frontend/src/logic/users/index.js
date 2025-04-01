import getUserAvatarById from "./getUserAvatarById";
import getUserBioById from "./getUserBiobyId";
import getUserUsernameById from "./getUserUsernameById";
import isUserLoggedIn from "./isUserLoggedIn";
import loginUser from "./loginUser";
import logoutUser from "./logoutUser";
import registerUser from "./registerUser";
import updateAvatar from "./updateAvatar";
import updateBio from "./updateBio";
import updateUsername from "./updateUsername";

const users = {
    getUserUsernameById,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    updateAvatar,
    updateBio,
    updateUsername,
    getUserAvatarById,
    getUserBioById
}

export default users