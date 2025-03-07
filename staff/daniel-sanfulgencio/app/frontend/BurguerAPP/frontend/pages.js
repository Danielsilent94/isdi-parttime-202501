var body = document.body;
var currentView;


/*PAGES crean las diferentes vistas de la app*/

function createRegisterPage() {
    var registerContainer = createContainer('');
    var registerTitle = createTextContainer('h1', 'Register', '');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true };
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true }
    var objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '*******', inputId: 'confirmation-password', isRequired: true }
    var registerForm = createForm([objectEmail, objectPassword, objectConfirmPassword], 'Register', registerUser) //usamos una función que nos permite registrar el usuario y cambiar de vista


    var toLoginButton = createButton('Go to login', '', function () { navigateToLogin(view) })
    var view = appendChildren(registerContainer, registerTitle, registerForm, toLoginButton)

    return view

}

function createHomePage() {
    var homeContainer = createContainer('')
    var loggedUserId = JSON.parse(sessionStorage.getItem('id')); //comprobar si se ha guardado el id de un usuario loggeado

    var userLogged = data.findUserById(loggedUserId)

    if (!userLogged) { //en caso de que no haya un id de usuario loggeado, en lugar de crear la vista de home, creamos la de register
        alert('inicia sesión o crea una nueva cuenta')
        return createRegisterPage();
    }

    var loggedUserUsername = userLogged.username //nos traemos el nombre de usuario para dar un mensaje de bienvenida personalizado
    var welcomeText = createTextContainer('h1', `Welcome, ${loggedUserUsername}`, '')

    var logoutButton = createButton('Logout', '', function () { sessionStorage.removeItem('id'); navigateToLogin(homeContainer) })


    appendChildren(homeContainer, welcomeText, logoutButton);
    return homeContainer
}

// Función loginUser
function loginUser(formData) {
    var email = formData.email;
    var password = formData.password;
    var rememberMe = formData.remember;

    var user = data.findUserByEmail(email);

    if (!user || user.password !== password) {
        alert('Email o contraseña incorrectos');
        return;
    }

    sessionStorage.setItem('id', JSON.stringify(user.id));

    if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify(user.id));
    } else {
        localStorage.removeItem('rememberedUser');
    }

    navigateToHome(currentView);
}

// Aquí van las demás funciones como createLoginPage, createHomePage, etc.


function createLoginPage() {
    var loginContainer = createContainer('')
    var loginTitle = createTextContainer('h1', 'Login', '');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true }
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true }
    var objectRemember = { label: 'Remember me', inputType: 'checkbox', inputValue: 'remember', inputId: 'remember', isRequired: false }
    var loginForm = createForm([objectEmail, objectPassword, objectRemember], 'Login', loginUser)
    var toRegisterButton = createButton('Go to register', '', function () { navigateToRegister(loginContainer) })

    appendChildren(loginContainer, loginTitle, loginForm, toRegisterButton)
    return loginContainer
}

function createHomePage() {
    var homeContainer = createContainer('');
    var loggedUserId = JSON.parse(sessionStorage.getItem('id')) || JSON.parse(localStorage.getItem('rememberedUser'));

    var userLogged = data.findUserById(loggedUserId);

    if (!userLogged) {
        alert('Inicia sesión o crea una nueva cuenta');
        return createLoginPage(); // En lugar de Register, mejor Login
    }

    var loggedUserUsername = userLogged.username;
    var welcomeText = createTextContainer('h1', `Welcome, ${loggedUserUsername}`, '');

    var logoutButton = createButton('Logout', '', function () { 
        sessionStorage.removeItem('id'); 
        localStorage.removeItem('rememberedUser'); // Borrar usuario recordado
        navigateToLogin(homeContainer); 
    });

    appendChildren(homeContainer, welcomeText, logoutButton);
    return homeContainer;
}

/*Renderizar landing*/
function renderLanding() {
    var landingContainer = createContainer('');
    var landingTitle = createTextContainer('h1', 'BURGUER APP', 'title');
    var joinButton = createButton('JOIN IN!', '', function () { navigateToRegister(landingContainer) })

    currentView = landingContainer

    landingContainer.appendChild(landingTitle);
    landingContainer.appendChild(joinButton);
    body.appendChild(landingContainer);
}

function renderHomePage() {
    var homePage = createHomePage();
    body.appendChild(homePage)
}


/*NAVIGATES: cambian de una vista a otra*/

/*Crea la nueva vista del register y limpia la vista anterior*/
function navigateToRegister(previousView) {
    var registerView = createRegisterPage()
    currentView = registerView

    body.replaceChild(registerView, previousView)
}


/*Crea la vista de home y limpia la vista anterior */
function navigateToHome(previousView) {
    var homeView = createHomePage() //en caso de que no haya usuario loggeado, esta función devuelve createRegisterPage()
    currentView = homeView

    body.replaceChild(homeView, previousView)
}

/*Renderiza la vista del login y limpia la vista anterior*/
function navigateToLogin(previousView) {
    var loginContainer = createLoginPage();

    currentView = loginContainer

    body.replaceChild(loginContainer, previousView)
}