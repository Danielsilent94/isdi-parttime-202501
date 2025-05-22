import { useEffect, useState } from "react";
import logics from "../../logic";
import locales from "../../locales";
import getLoggedUserId from "../../logic/helpers/getLoggedUserId";

const UserProfile = ({ locale }) => {
    const [translations, setTranslations] = useState(locales[locale]['userProfile']);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTranslations(locales[locale]['userProfile']);
    }, [locale]);

    useEffect(() => {
        const userId = getLoggedUserId();

        logics.users.getUserById(userId, (error, userData) => {
            if (error) {
                console.error(error);
                setError("Error fetching user profile.");
            } else {
                setUser(userData);
            }
        });
    }, []);

    if (error) return <div>{error}</div>;
    if (!user) return <div>{translations.loading}</div>;

    return (
        <div className="main-container">
            <h1>{translations.title}</h1>
            <div className="profile__info">
                <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="Avatar"
                    className="profile__avatar"
                />
                <p><strong>{translations.username}:</strong> {user.username}</p>
                <p><strong>{translations.email}:</strong> {user.email}</p>
            </div>
        </div>
    );
};

export default UserProfile;
