import { registerUser } from '../logics.mjs'
import { createButton, createContainer, createForm, createTextContainer } from '../lib.mjs'
import navigate from '../navigate.mjs';
import header from '../components/header.mjs';

const register = {
    mount: (body) => {
        console.info('register mounted')
        const registerContainer = createContainer('register');
        registerContainer.id = 'register';

        header.mount(registerContainer, 'register')
        const registerTitle = createTextContainer('h1', 'Register', '');
        const objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true };
        const objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }
        const objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '·········', inputId: 'confirmation-password', isRequired: true }
        const registerForm = createForm([objectEmail, objectPassword, objectConfirmPassword], 'Register', registerUser) //usamos una función que nos permite registrar el usuario y cambiar de vista

        const toLoginText = createTextContainer('span', 'Already have an account?', 'register__login--text')
        const toLoginButton = createButton('Go to login', 'register__login--button', () => navigate('register', 'login'))
        const toLoginContainer = createContainer('register__login')

        toLoginContainer.append(toLoginText, toLoginButton)

        registerContainer.append(registerTitle, registerForm, toLoginContainer)

        body.appendChild(registerContainer)
    },
    dismount: () => {
        console.info('register dismounted')
        const register = document.getElementById('register');
        register.remove()
    },
    update: (body) => {
        register.dismount();
        register.mount(body);
    }
}


export default register