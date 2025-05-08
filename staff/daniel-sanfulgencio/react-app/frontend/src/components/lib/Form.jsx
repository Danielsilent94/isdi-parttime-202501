import { useState } from 'react'
import './Form.css'
import PasswordFeedback from './PasswordFeedback'
import PasswordInput from './PasswordInput'

const Form = ({
    inputsArray = [],
    onSubmitCallback,
    submitButtonText = "Submit",
    onFileChangeCallback,
    onPasswordChangeCallback,
    securityPasswordErrors
}) => {
    const [tempPassword, setTempPassword] = useState()
    const [arePasswordsEqual, setArePasswordsEqual] = useState(null)

    const handleFileInputChange = (event) => {
        event.preventDefault()
        if (!onFileChangeCallback) return

        const file = event.target.files?.[0]
        if (!file) {
            return onFileChangeCallback(event.target.value, false)
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            const base64 = reader.result
            onFileChangeCallback(base64, true)
        }
        reader.readAsDataURL(file)
    }

    const handlePasswordInputChange = (event, inputId) => {
        const password = event.target.value

        if (onPasswordChangeCallback) {
            if (inputId === 'password') {
                setTempPassword(password)
                onPasswordChangeCallback(password)
            }
            if (inputId === 'confirmation-password') {
                setArePasswordsEqual(password === tempPassword)
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const formData = {}

        for (let i = 0; i < inputsArray.length; i++) {
            const field = inputsArray[i]
            const id = field.inputId
            let value

            if (field.inputType === 'checkbox') {
                value = form[id].checked
            } else if (field.inputType === 'file') {
                value = form[id].files[0]
            } else {
                value = form[id].value
            }

            formData[id] = value
        }

        try {
            onSubmitCallback(formData, () => form.reset())
        } catch (error) {
            console.error(error)
            if (['FormatError', 'RangeError', 'TypeError'].includes(error.name)) {
                alert('incorrect inputs, check your form data again')
            }
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {inputsArray.map((input, index) => {
                const { inputType, inputId, label, inputPlaceholder, isRequired } = input

                if (inputType === 'checkbox') {
                    return (
                        <fieldset key={index}>
                            <input type="checkbox" id={inputId} required={isRequired} />
                            <label htmlFor={inputId}>{label}</label>
                        </fieldset>
                    )
                }

                if (inputType === 'text-area') {
                    return (
                        <div className="form__input" key={index}>
                            <label htmlFor={inputId}>{label}</label>
                            <textarea className="form__input-text" id={inputId} required={isRequired} placeholder={inputPlaceholder} />
                        </div>
                    )
                }

                if (inputType === 'url') {
                    return (
                        <div className="form__input" key={index}>
                            <label htmlFor={inputId}>{label}</label>
                            <input
                                type="url"
                                id={inputId}
                                className="form__input-text"
                                required={isRequired}
                                placeholder={inputPlaceholder}
                            />
                        </div>
                    )
                }

                if (inputType === 'file') {
                    return (
                        <div className="form__input" key={index}>
                            <label htmlFor={inputId}>{label}</label>
                            <input
                                type="file"
                                id={inputId}
                                className="form__input-text"
                                required={isRequired}
                                placeholder={inputPlaceholder}
                                onChange={handleFileInputChange}
                            />
                        </div>
                    )
                }

                if (inputType === 'password') {
                    return (
                        <div className="form__input" key={index}>
                            <label htmlFor={inputId}>{label}</label>
                            <PasswordInput inputElement={input} onChangeCallback={handlePasswordInputChange} />
                        </div>
                    )
                }

                return (
                    <div className="form__input" key={index}>
                        <label htmlFor={inputId}>{label}</label>
                        <input
                            type={inputType}
                            id={inputId}
                            className="form__input-text"
                            required={isRequired}
                            placeholder={inputPlaceholder}
                        />
                    </div>
                )
            })}

            {securityPasswordErrors && (
                <PasswordFeedback
                    securityPasswordErrors={securityPasswordErrors}
                    arePasswordsEqual={arePasswordsEqual}
                />
            )}

            <input className="form__submit-button" type="submit" value={submitButtonText} />
        </form>
    )
}

export default Form


