import { Link, useNavigate } from "react-router";
import Form from "../../components/lib/Form";
import logics from "../../logic";

const Register = ({ setRefreshHeader }) => {
    const objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true };
    const objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }
    const objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '·········', inputId: 'confirmation-password', isRequired: true }
    const navigate = useNavigate()

    const onRegisterUser = (formData) => {
        try {
            logics.users.registerUser(formData)
            setRefreshHeader(Date.now())
            navigate('/')
        } catch (error) {
            alert('check your form data, something went wrong')
            console.error(error)
        }

    }

    return <div className="main-container">
        <h1>Register</h1>
        <Form inputsArray={[objectEmail, objectPassword, objectConfirmPassword]} submitButtonText={'Register'} onSubmitCallback={onRegisterUser} />
        <div className="register__login">
            <span className="register__login--text">Already have an account?</span>
            <span className="register__login--button"><Link to="/login">Go to login!</Link></span>
        </div>
    </div>

}

export default Register