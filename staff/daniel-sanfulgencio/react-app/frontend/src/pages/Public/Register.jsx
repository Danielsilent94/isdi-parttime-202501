import { Link, useNavigate } from "react-router";
import Form from "../../components/lib/Form";
import logics from "../../logic";
import { useEffect, useState } from "react";
import { errors } from "common";
import checkPasswordSecurity from "../../logic/helpers/checkPasswordSecurity";
import locales from "../../locales";

const Register = ({ setRefreshHeader, locale }) => {
    const [translations, setTranslations] = useState(locales[locale]['register']);
    const [formTranslations, setFormTranslations] = useState(locales[locale]['forms']);

    const objectEmail = { label: formTranslations.emailLabel, inputType: 'email', inputPlaceholder: formTranslations.emailPlaceholder, inputId: 'email', isRequired: true };
    const objectPassword = { label: formTranslations.passwordLabel, inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true };
    const objectConfirmPassword = { label: formTranslations.confirmPasswordLabel, inputType: 'password', inputPlaceholder: '·········', inputId: 'confirmation-password', isRequired: true };
    const navigate = useNavigate();
    const [securityErrors, setSecurityErrors] = useState(null);

    useEffect(() => {
        setTranslations(locales[locale]['register']);
        setFormTranslations(locales[locale]['forms']);
    }, [locale]);

    const onRegisterUser = (formData, onSuccess) => {
        try {
            const { email, password } = formData;

            logics.users.registerUser(email, password, (error) => {
                if (error) {
                    alert(formTranslations.errorMsg);
                    console.error(error);
                } else {
                    onSuccess?.(); // <-- Verifica si existe antes de llamarlo
                    logics.users.loginUser({email, password}, (error) => {
                        if (error) {
                            alert(formTranslations.errorMsg);
                            console.error(error);
                        } else {
                            setRefreshHeader(Date.now());
                            navigate('/');
                        }
                    });
                }
            });
        } catch (error) {
            if (error instanceof errors.FormatError) {
                setSecurityErrors((error.message).split(','));
            } else {
                alert(formTranslations.errorMsg);
                console.error(error.message);
            }
        }
    };

    const onPasswordInputChange = (password) => {
        setSecurityErrors(checkPasswordSecurity(password));
    };

    return (
        <div className="main-container">
            <h1>{translations.title}</h1>
            <Form
                onPasswordChangeCallback={onPasswordInputChange}
                securityPasswordErrors={securityErrors}
                inputsArray={[objectEmail, objectPassword, objectConfirmPassword]}
                submitButtonText={translations.submit}
                onSubmitCallback={onRegisterUser}
            />
            <div className="register__login">
                <span className="register__login--text">{translations.notNew}</span>
                <span className="register__login--button"><Link to="/login">{translations.toLogin}</Link></span>
            </div>
        </div>
    );
};

export default Register;

