import { Link, useNavigate } from "react-router";
import Form from "../../components/lib/Form";
import logics from "../../logic";
import "./LoginRegister.css";
import locales from "../../locales";
import { useEffect, useState } from "react";

const Login = ({ setRefreshHeader, locale }) => {
    const [translations, setTranslations] = useState(locales[locale]['login']);
    const [formTranslations, setFormTranslations] = useState(locales[locale]['forms']);

    const objectEmail = {
        label: formTranslations.emailLabel,
        inputType: 'email',
        inputPlaceholder: formTranslations.emailPlaceholder,
        inputId: 'email',
        isRequired: true
    };
    const objectPassword = {
        label: formTranslations.passwordLabel,
        inputType: 'password',
        inputPlaceholder: '·········',
        inputId: 'password',
        isRequired: true
    };
    const objectRemember = {
        label: formTranslations.remember,
        inputType: 'checkbox',
        inputValue: 'remember',
        inputId: 'remember',
        isRequired: false
    };

    const navigate = useNavigate();

    useEffect(() => {
        setTranslations(locales[locale]['login']);
        setFormTranslations(locales[locale]['forms']);
    }, [locale]);

    const onLoginUser = (formData, onSuccess) => {
        try {
            const { email, password } = formData;

            logics.users.loginUser(email, password, (error) => {
                if (error) {
                    alert(translations.errorMsg);
                    console.error(error);
                } else {
                    onSuccess?.(); // ✅ Prevención si onSuccess no está definido
                    setRefreshHeader(Date.now());
                    navigate('/');
                }
            });
        } catch (error) {
            alert(translations.errorMsg);
            console.error(error);
        }
    };

    return (
        <div className="main-container">
            <h1>{translations.title}</h1>
            <Form
                inputsArray={[objectEmail, objectPassword, objectRemember]}
                submitButtonText={translations.submit}
                onSubmitCallback={onLoginUser}
            />
            <div className="login__register">
                <span className="login__register--text">{translations.new}</span>
                <span className="login__register--button">
                    <Link to="/register">{translations.toRegister}</Link>
                </span>
            </div>
        </div>
    );
};

export default Login;

