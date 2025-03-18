var body = document.body;
var currentView;


/*PAGES crean las diferentes vistas de la app*/

function createRegisterPage() {
    var registerContainer = createContainer('register');
    //var logo = createLogo('2rem')
    //logo.addEventListener('click', function () { navigateToLanding(registerContainer) })
    //var header = createHeader(logo);
    var registerTitle = createTextContainer('h1', 'Register', '');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true };
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }
    var objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '·········', inputId: 'confirmation-password', isRequired: true }
    var registerForm = createForm([objectEmail, objectPassword, objectConfirmPassword], 'Register', registerUser) //usamos una función que nos permite registrar el usuario y cambiar de vista

    var toLoginText = createTextContainer('span', 'Already have an account?', 'register__login--text')
    var toLoginButton = createButton('Go to login', 'register__login--button', function () { navigateToLogin(view) })
    var toLoginContainer = createContainer('register__login')

    appendChildren(toLoginContainer, toLoginText, toLoginButton)

    var view = appendChildren(registerContainer, /*header,*/ registerTitle, registerForm, toLoginContainer)

    return view

}

//MOVER A OTRO SITIO ESTA FUNCION:
function onUserMenuClick(homeContainer) {
    var menu = document.getElementById('user-menu')
    if (menu) {
        closeUserMenu()
    } else {
        openUserMenu(homeContainer)
    }
}


function openUserMenu(homeContainer) {
    var menu = document.createElement('aside')
    menu.className = 'header__user-menu'
    menu.id = 'user-menu'

    var button1 = createButton('option1', 'header__user-menu--button', function () { closeUserMenu() })
    var button2 = createButton('option2', 'header__user-menu--button', function () { closeUserMenu() })
    var button3 = createButton('option3', 'header__user-menu--button', function () { closeUserMenu() })

    var logoutButton = createButton('Logout', 'header__user-menu--button', function () {
        if (sessionStorage.id) {
            sessionStorage.removeItem('id')
        }
        if (localStorage.id) {
            localStorage.removeItem('id')
        }
        closeUserMenu()
        navigateToLogin(homeContainer)

    })

    appendChildren(menu, button1, button2, button3, logoutButton)
    homeContainer.appendChild(menu)
}

function closeUserMenu() {
    var menu = document.getElementById('user-menu')

    menu.remove()
}

function createHomePage() {
    var homeContainer = createContainer('home')

    var loggedUserId;
    if (localStorage.id) {
        loggedUserId = JSON.parse(localStorage.getItem('id'));
    } else {
        loggedUserId = JSON.parse(sessionStorage.getItem('id')); //comprobar si se ha guardado el id de un usuario loggeado
    }

    var userLogged = data.findUserById(loggedUserId)

    if (!userLogged) { //en caso de que no haya un id de usuario loggeado, en lugar de crear la vista de home, creamos la de register
        alert('inicia sesión o create una cuenta primero, listillo tocacódigos')
        return createRegisterPage();
    }

    //var logo = createLogo('2rem')
    var loggedUserUsername = userLogged.username //nos traemos el nombre de usuario para dar un mensaje de bienvenida personalizado
    var welcomeText = createTextContainer('p', `Welcome, ${loggedUserUsername}`, 'header_welcome')

    var userButton = createButton(userLogged.username[0].toUpperCase(), 'header__user-button', function () { onUserMenuClick(homeContainer) })

    var header = createHeader(/*logo,*/welcomeText, userButton);

    var titleInput = { label: 'Your post title', inputType: 'text', inputPlaceholder: 'I am a title :D', inputId: 'title', isRequired: true }
    var descriptionInput = { label: 'Your description', inputType: 'text', inputPlaceholder: 'Blah blah blah blah', inputId: 'description', isRequired: true }
    var imgInput = { label: 'Your image url', inputType: 'url', inputPlaceholder: '.png, .jpg, etc', inputId: 'img', isRequired: false }

    var createPostForm = createForm([titleInput, descriptionInput, imgInput], 'Post', data.createPost)

    var posts = data.retrievePosts();

    var postsContainer = createContainer('posts')

    for (var i = 0; i < posts.length; i++) {
        var postContainer = createContainer('');
        var authorAndDate = createTextContainer('p', `${posts[i].author} said on ${posts[i].createdOn}`, '')
        var postTitle = createTextContainer('h3', posts[i].title, '')
        var postDescription = createTextContainer('p', posts[i].description, '')
        appendChildren(postContainer, authorAndDate, postTitle, postDescription)
        var postImg;
        if (posts[i].img !== '') {
            postImg = document.createElement('img')
            postImg.src = posts[i].img
            postContainer.appendChild(postImg)
        }
        postsContainer.appendChild(postContainer)
    }




    appendChildren(homeContainer, header, createPostForm, postsContainer);
    return homeContainer
}


function storeMsg(loggedUserUsername, title, msg) {
    if (!title || !msg) {
        alert('All fields are required. The message has not been stored')
        return
    }

    var userMsg = `User: ${loggedUserUsername}\nTitle: ${title}\nMessage: ${msg}`
    var storedMessages = JSON.parse(localStorage.getItem('messages')) || []
    storedMessages.push(userMsg)
    localStorage.setItem('messages', JSON.stringify(storedMessages))
    alert('Message stored successfully.')

}



function createLoginPage() {
    var loginContainer = createContainer('login')
    //var logo = createLogo('2rem')
    //logo.addEventListener('click', function () { navigateToLanding(loginContainer) })
    var loginTitle = createTextContainer('h1', 'Login', '');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true }
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }
    var objectRemember = { label: 'Remember me', inputType: 'checkbox', inputValue: 'remember', inputId: 'remember', isRequired: false }
    var loginForm = createForm([objectEmail, objectPassword, objectRemember], 'Login', loginUser)
    var toRegisterText = createTextContainer('span', 'Are you new here?', 'login__register--text')
    var toRegisterButton = createButton('Register now!', 'login__register--button', function () { navigateToRegister(loginContainer) })
    var toRegisterContainer = createContainer('login__register')

    appendChildren(toRegisterContainer, toRegisterText, toRegisterButton)

    //var header = createHeader(logo)

    appendChildren(loginContainer, /*header,*/ loginTitle, loginForm, toRegisterContainer)
    return loginContainer
}

function createLandingPage() {
    var landingContainer = createContainer('landing');
    var contentContainer = createContainer('landing__content')
    var landingTitle = createTextContainer('h1', 'BURGUER BITE', 'landing__title');
    var landingSubtitle = createTextContainer('h2', 'A social app for Burguer lovers', 'landing__subtitle');
    var joinButton = createButton('Join in!', 'header__join-button', function () { navigateToRegister(landingContainer) })


    var header = createHeader(joinButton)
    //var logo = createLogo('20rem');

    currentView = landingContainer

    appendChildren(contentContainer, landingTitle, /*logo,*/ landingSubtitle)

    appendChildren(landingContainer, header, contentContainer)
    return landingContainer
}

/*Renderizar landing*/
function renderLanding() {
    var landingContainer = createLandingPage()

    //document.getElementById('app').appendChild(landingContainer);

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

function navigateToLanding(previousView) {
    var landingContainer = createLandingPage();

    currentView = landingContainer

    body.replaceChild(landingContainer, previousView)
}