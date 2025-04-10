import { useEffect, useState } from "react"
import Form from "../../components/lib/Form"
import logics from "../../logic/index"
import './MyProfileSettings.css'
import UserCard from "../../components/UserCard"
import getLoggedUserId from "../../logic/helpers/getLoggedUserId"
import Btn from "../../components/lib/Btn"

const MyProfile = ({ updateHeader }) => {
    const [showUsernameForm, setShowUsernameForm] = useState(false)
    const [showAvatarForm, setShowAvatarForm] = useState(false)
    const [showBioForm, setShowBioForm] = useState(false)
    const [refreshUserCard, setRefreshUserCard] = useState(Date.now())
    const [tempAvatar, setTempAvatar] = useState()
    const [isLocalAvatar, setIsLocalAvatar] = useState (false)

    const usernameObject = { label: 'Username', inputType: 'text', inputPlaceholder: 'myNewUserName', inputId: 'username', isRequired: true }
    const avatarObject = { label: 'Load a local file', inputType: 'file', inputPlaceholder: '', inputId: 'avatar-64', isRequired: false }
    const avatarObject2 = { label: 'Use a public url image', inputType: 'url', inputPlaceholder: 'https/new.com/avatar.png', inputId: 'avatar-url', isRequired: false }
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
        setIsLocalAvatar(formData['avatar-64'] ? true : false)
        try {
            if (isLocalAvatar) {
                const newAvatar = formData['avatar-64']
                const image = new FileReader();
                image.onload = () => {
                    const base64 = image.result;
                    setTempAvatar(base64)
                };
                image.readAsDataURL(newAvatar)
            } else {
                setTempAvatar(formData['avatar-url'])
            }
            

            logics.users.updateAvatar(tempAvatar)
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

    const onChangeTemporal = (newTempAvatar, isBase64Avatar) => {
        setIsLocalAvatar (isBase64Avatar)
        setTempAvatar (newTempAvatar)
    }

    /*const saveRandomBio = () => {
        const xhr = new XMLHttpRequest()
    }*/

    return <div className="main-container">
        <UserCard userId={getLoggedUserId()} refreshSelf={refreshUserCard} tempAvatar={tempAvatar} />
        <div className="account__section-title" onClick={() => setShowUsernameForm(!showUsernameForm)}>
            <h2>Change my username</h2>
            <i className={`bi bi-chevron-compact-${showUsernameForm ? 'up' : 'down'}`}></i>
        </div>
        {showUsernameForm && <Form inputsArray={[usernameObject]} onSubmitCallback={onUpdateUsername} submitButtonText={"Save new username"} />}
        <div className="account__section-title" onClick={() => setShowAvatarForm(!showAvatarForm)}>
            <h2>Change my avatar</h2>
            <i className={`bi bi-chevron-compact-${showAvatarForm ? 'up' : 'down'}`}></i>
        </div>
        {showAvatarForm && <Form inputsArray={[avatarObject, avatarObject2]} onSubmitCallback={onUpdateAvatar} submitButtonText={"Save new avatar"} onChangeCallback={onChangeTemporal} />}
        <div className="account__section-title" onClick={() => setShowBioForm(!showBioForm)}>
            <h2>Change my bio</h2>
            <i className={`bi bi-chevron-compact-${showBioForm ? 'up' : 'down'}`}></i>
        </div>
        {showBioForm && <Form inputsArray={[bioObject]} onSubmitCallback={onUpdateBio} submitButtonText={"Save new bio"} />}
        {showBioForm && <div> Are you bored? Generate a random bio. <Btn btnContent= {'Randomize!'} btnCallback={saveRandomBio} btnClassnames={''}/> </div>}
    </div>
}

export default MyProfile