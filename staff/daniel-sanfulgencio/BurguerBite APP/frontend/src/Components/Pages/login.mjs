import { loginUser } from '../logics.mjs'
import { createButton, createContainer, createForm, createTextContainer } from '../lib.mjs'
import navigate from '../navigate.mjs'
import header from '../components/header.mjs'

const login = {
    mount: (body) => {
        console.info('login mounted')
        const loginContainer = createContainer('login')
        loginContainer.id = 'login'

        header.mount(loginContainer, 'login')

        const loginTitle = createTextContainer('h1', 'Login', '');
        const objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true }
        const objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }
        const objectRemember = { label: 'Remember me', inputType: 'checkbox', inputValue: 'remember', inputId: 'remember', isRequired: false }
        const loginForm = createForm([objectEmail, objectPassword, objectRemember], 'Login', loginUser)
        const toRegisterText = createTextContainer('span', 'Are you new here?', 'login__register--text')
        const toRegisterButton = createButton('Register now!', 'login__register--button', () => navigate('login', 'register'))
        const toRegisterContainer = createContainer('login__register')

        toRegisterContainer.append(toRegisterText, toRegisterButton)

        loginContainer.append(loginTitle, loginForm, toRegisterContainer)
        body.appendChild(loginContainer)
    },
    dismount: () => {
        console.info('login dismounted')
        const login = document.getElementById('login');
        login.remove()
    },
    update: (body) => {
        login.dismount();
        login.mount(body);
    }
}

export default login