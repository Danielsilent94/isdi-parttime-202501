import { useEffect, useState } from "react"
import Btn from "./lib/Btn"
import logics from "../logic"
import './UserAvatar.css'

const UserAvatar = ({ userId, buttonCallback, size }) => {
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        const retrivedAvatar = logics.users.getUserAvatarById(userId)
        if (retrivedAvatar) {
            setAvatar(retrivedAvatar)
        } else {
            const retrivedUsername = logics.users.getUserUsernameById(userId)
            setUsername(retrivedUsername)
        }
    }, [])

    if ((avatar || username) && buttonCallback) {
        return <Btn
            btnContent={avatar ? <img className='avatar--image' src={avatar} /> : <div>{username[0].toUpperCase()}</div>}
            btnCallback={buttonCallback}
            btnClassnames={`avatar-btn ${size} ${avatar ? 'avatar-with-image' : 'avatar'}`}
        />
    }
    if (avatar || username) {
        return <div className={`${size} ${avatar ? 'avatar-with-image' : 'avatar'}`}>
            {avatar ? <img className='avatar--image' src={avatar} /> : <div>{username[0].toUpperCase()}</div>}
        </div>
    }
}

export default UserAvatar