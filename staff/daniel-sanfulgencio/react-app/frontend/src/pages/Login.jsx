import Btn from "../components/lib/Btn"
import Form from "../components/lib/Form"
import logics from "../logic"
import "./LoginRegister.css"

const Login = ({ handleNavigateToHome, handleRegisterClick }) => {
    const objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true }
    const objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }
    const objectRemember = { label: 'Remember me', inputType: 'checkbox', inputValue: 'remember', inputId: 'remember', isRequired: false }

    const onLoginUser = (formData) => {
        try {
            logics.users.loginUser(formData)
            handleNavigateToHome()
        } catch (error) {
            alert('something went wrong, check your credentials')
            console.error(error)
        }
    }

    return <div className="main-container">
        <h1>Login</h1>
        <Form inputsArray={[objectEmail, objectPassword, objectRemember]} submitButtonText={'Login'} onSubmitCallback={onLoginUser} />
        <div className="login__register">
            <span className="login__register--text">Are you new here?</span>
            <Btn btnClassnames={"login__register--button"} btnContent={'Register now!'} btnCallback={handleRegisterClick} />
        </div>
    </div>
}

export default Login