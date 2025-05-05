import { useEffect, useState } from 'react'
import './MyProfileSettings.css'
import logics from '../../logic'
import Form from '../../components/lib/Form'
import getLoggedUserId from '../../logic/helpers/getLoggedUserId'
import { useNavigate } from "react-router"
import checkPasswordSecurity from '../../logic/helpers/checkPasswordSecurity'
import locales from '../../locales'
import { errors } from "common"

const Settings = ({ locale }) => {
    const [showNewEmailForm, setShowNewEmailForm] = useState(false)
    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false)
    const [showDeleteAccountForm, setShowDeleteAccountForm] = useState(false)
    const [securityErrors, setSecurityErrors] = useState(null)
    const navigate = useNavigate()
    const [translations, setTranslations] = useState(locales[locale]['settings'])
    const [formTranslations, setFormTranslations] = useState(locales[locale]['forms'])

    useEffect(() => {
        setTranslations(locales[locale]['settings'])
        setFormTranslations(locales[locale]['forms'])
    }, [locale])

    const emailObject = { label: formTranslations.emailLabel, inputType: 'email', inputPlaceholder: formTranslations.emailPlaceholder, inputId: 'email', isRequired: true }

    const oldPasswordObject = { label: formTranslations.currentPswrLabel, inputType: 'password', inputPlaceholder: '·········', inputId: 'old-password', isRequired: true }
    const newPasswordObject = { label: formTranslations.newPasswordLabel, inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }
    const newPasswordConfirmObject = { label: formTranslations.confirmPasswordLabel, inputType: 'password', inputPlaceholder: '·········', inputId: 'confirmation-password', isRequired: true }

    const passwordObject = { label: formTranslations.deleteAccountLabel, inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }

    const onUpdateEmail = (formData, onSuccess) => {
        const newEmail = formData.email

        try {
            logics.users.updateEmail(newEmail)
            onSuccess()
        } catch (error) {
            alert(formTranslations.errorMsg)
            console.error(error)
        }
    }

    const onUpdatePassword = (formData, onSuccess) => {
        const oldPassword = formData['old-password']
        const newPassword = formData['password']
        const confirmPassword = formData['confirmation-password']

        try {
            logics.users.updatePassword(newPassword, confirmPassword, oldPassword)
            onSuccess()
            setSecurityErrors(null)
        } catch (error) {
            if (error instanceof errors.FormatError) {
                setSecurityErrors((error.message).split(','))
            } else {
                alert(formTranslations.errorMsg)
                console.error(error.message)
            }
        }
    }

    const onPasswordInputChange = (password) => {
        setSecurityErrors(checkPasswordSecurity(password))
    }

    const onDeleteAccount = (formData, onSuccess) => {
        try {
            const doesUserAgree = confirm(translations.confirmDelete)
            if (doesUserAgree) {
                logics.users.deleteUserById(getLoggedUserId(), formData.password)
                logics.users.logoutUser()
                onSuccess()
                navigate('/register')
            }
        } catch (error) {
            alert(error)
            console.error(error)
        }
    }

    return <div className='main-container'>
        <div className='settings__section-title' onClick={() => setShowNewEmailForm(!showNewEmailForm)}>
            <h2>{translations.emailTitle}</h2>
            <i className={`bi bi-chevron-compact-${showNewEmailForm ? 'up' : 'down'}`}></i>
        </div>
        {
            showNewEmailForm && <Form
                inputsArray={[emailObject]}
                submitButtonText={formTranslations.updateSubmit}
                onSubmitCallback={onUpdateEmail}
            />
        }
        <div className='settings__section-title' onClick={() => setShowNewPasswordForm(!showNewPasswordForm)}>
            <h2>{translations.passwordTitle}</h2>
            <i className={`bi bi-chevron-compact-${showNewPasswordForm ? 'up' : 'down'}`}></i>
        </div>
        {
            showNewPasswordForm && <Form
                inputsArray={[oldPasswordObject, newPasswordObject, newPasswordConfirmObject]}
                submitButtonText={formTranslations.updateSubmit}
                onSubmitCallback={onUpdatePassword}
                onPasswordChangeCallback={onPasswordInputChange}
                securityPasswordErrors={securityErrors}
            />
        }
        <div className='settings__section-title' onClick={() => setShowDeleteAccountForm(!showDeleteAccountForm)}>
            <h2>{translations.deleteTitle}</h2>
            <i className={`bi bi-chevron-compact-${showDeleteAccountForm ? 'up' : 'down'}`}></i>
        </div>
        {
            showDeleteAccountForm && <Form
                inputsArray={[passwordObject]}
                submitButtonText={translations.deleteTitle}
                onSubmitCallback={onDeleteAccount}
            />
        }
    </div>
}

export default Settings