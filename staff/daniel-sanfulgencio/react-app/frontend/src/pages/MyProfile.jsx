import { useEffect, useState } from "react"
import Form from "../components/lib/Form"
import logics from "../logic/index"
import './MyProfile.css'
import UserCard from "../components/UserCard"
import getLoggedUserId from "../logic/helpers/getLoggedUserId"

const MyProfile = ({ updateHeader }) => {
    const [showUsernameForm, setShowUsernameForm] = useState(false)
    const [showAvatarForm, setShowAvatarForm] = useState(false)
    const [showBioForm, setShowBioForm] = useState(false)
    const [refreshUserCard, setRefreshUserCard] = useState(Date.now())

    const usernameObject = { label: 'Username', inputType: 'text', inputPlaceholder: 'myNewUserName', inputId: 'username', isRequired: true }
    const avatarObject = { label: 'Avatar', inputType: 'url', inputPlaceholder: 'https/new.com/avatar.png', inputId: 'avatar', isRequired: true }
    const bioObject = { label: 'Bio', inputType: 'text-area', inputPlaceholder: 'More about me here!', inputId: 'bio', isRequired: true }

    const onUpdateUsername = (formData) => {
        try {
            logics.users.updateUsername(formData['username'])
            updateHeader(Date.now())
            setRefreshUserCard(Date.now())
            setShowUsernameForm(false)
        } catch (error) {
            alert('ups! try again!')
            console.error(error)
        }
    }

    const onUpdateAvatar = (formData) => {
        try {
            logics.users.updateAvatar(formData['avatar'])
            updateHeader(Date.now())
            setRefreshUserCard(Date.now())
            setShowAvatarForm(false)
        } catch (error) {
            alert('ups! try again!')
            console.error(error)
        }
    }

    const onUpdateBio = (formData) => {
        try {
            logics.users.updateBio(formData['bio'])
            updateHeader(Date.now())
            setRefreshUserCard(Date.now())
            setShowBioForm(false)
        } catch (error) {
            alert('ups! try again!')
            console.error(error)
        }
    }

    return <div className="main-container">
        <UserCard userId={getLoggedUserId()} refreshSelf={refreshUserCard} />
        <div className="account__section-title" onClick={() => setShowUsernameForm(!showUsernameForm)}>
            <h2>Change my username</h2>
            <i className={`bi bi-chevron-compact-${showUsernameForm ? 'up' : 'down'}`}></i>
        </div>
        {showUsernameForm && <Form inputsArray={[usernameObject]} onSubmitCallback={onUpdateUsername} submitButtonText={"Save new username"} />}
        <div className="account__section-title" onClick={() => setShowAvatarForm(!showAvatarForm)}>
            <h2>Change my avatar</h2>
            <i className={`bi bi-chevron-compact-${showAvatarForm ? 'up' : 'down'}`}></i>
        </div>
        {showAvatarForm && <Form inputsArray={[avatarObject]} onSubmitCallback={onUpdateAvatar} submitButtonText={"Save new avatar"} />}
        <div className="account__section-title" onClick={() => setShowBioForm(!showBioForm)}>
            <h2>Change my bio</h2>
            <i className={`bi bi-chevron-compact-${showBioForm ? 'up' : 'down'}`}></i>
        </div>
        {showBioForm && <Form inputsArray={[bioObject]} onSubmitCallback={onUpdateBio} submitButtonText={"Save new bio"} />}
    </div>
}

export default MyProfile