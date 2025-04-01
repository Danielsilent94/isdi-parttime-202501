import { useEffect, useState } from "react"
import logics from "../logic"
import getLoggedUserId from "../logic/helpers/getLoggedUserId"
import UserAvatar from "./UserAvatar"
import './UserCard.css'

const UserCard = ({ userId, refreshSelf }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const retrivedUsername = logics.users.getUserUsernameById(userId)
        const retrivedBio = logics.users.getUserBioById(userId)

        setUser({ username: retrivedUsername, bio: retrivedBio })
    }, [refreshSelf])


    return <div className="user-card">
        <div className="user-card__username-avatar">
            <UserAvatar userId={userId} size={'lg'} />
            <h2>{user.username}</h2>

        </div>
        <p className="user-card__bio"><i className="bi bi-info-circle"></i>{user.bio}</p>
    </div>
}

export default UserCard