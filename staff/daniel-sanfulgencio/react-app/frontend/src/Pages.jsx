const useState = React.useState
const useRef = React.useRef

const Landing = () => {
    return <div className="landing__content">
        <h1 className="landing__title">PET APP</h1>
        <Logo size={"lg"} />
        <h2 className="landing__subtitle">A social app for pets</h2>
    </div>
}

const Register = ({ handleNavigateToHome, handleLoginClick }) => {
    const objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true };
    const objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }
    const objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '·········', inputId: 'confirmation-password', isRequired: true }

    const onRegisterUser = (formData) => {
        try {
            registerUser(formData)
            handleNavigateToHome()
        } catch (error) {
            console.error(error)
        }

    }

    return <div className="register">
        <h1>Register</h1>
        <Form inputsArray={[objectEmail, objectPassword, objectConfirmPassword]} submitButtonText={'Register'} onSubmitCallback={onRegisterUser} />
        <div className="register__login">
            <span className="register__login--text">Already have an account?</span>
            <Btn btnClassnames={"register__login--button"} btnContent={'Go to login!'} btnCallback={handleLoginClick} />
        </div>
    </div>

}

const Login = ({ handleNavigateToHome, handleRegisterClick }) => {
    const objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true }
    const objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '·········', inputId: 'password', isRequired: true }
    const objectRemember = { label: 'Remember me', inputType: 'checkbox', inputValue: 'remember', inputId: 'remember', isRequired: false }

    const onLoginUser = (formData) => {
        try {
            loginUser(formData)
            handleNavigateToHome()
        } catch (error) {
            console.error(error)
        }
    }

    return <div className="login">
        <h1>Login</h1>
        <Form inputsArray={[objectEmail, objectPassword, objectRemember]} submitButtonText={'Register'} onSubmitCallback={onLoginUser} />
        <div className="login__register">
            <span className="login__register--text">Are you new here?</span>
            <Btn btnClassnames={"login__register--button"} btnContent={'Register now!'} btnCallback={handleRegisterClick} />
        </div>
    </div>
}

const Home = () => {
    const [refreshPosts, setRefreshPosts] = useState(Date.now())
    const [showNewPostForm, setShowNewPostForm] = useState(false)
    const dialogRef = useRef(null)
    const pageRef = useRef(null)
    const formRef = useRef(null)

    const handleOutsideModalClick = (event) => {
        console.log('CLICK')
        if (!formRef.current.contains(event.target)) {
            setShowNewPostForm(false)
        }
    }

    useEffect(() => {
        if (pageRef.current) pageRef.current.addEventListener("click", (event) => handleOutsideModalClick(event))

        if ((dialogRef.current && dialogRef.current.open) && !showNewPostForm) {
            dialogRef.current.close()
        } else if (!(dialogRef.current && dialogRef.current.open) && showNewPostForm) {
            dialogRef.current.showModal()
        }

        return () => {
            if (pageRef.current) pageRef.current.removeEventListener("click", handleOutsideModalClick);
        };
    }, [showNewPostForm])

    return <div className="home" ref={pageRef}>
        <PostList refreshPosts={refreshPosts} setRefreshPosts={setRefreshPosts} />
        <Btn btnClassnames={'home__new-post-button'} btnContent={'+'} btnCallback={() => setShowNewPostForm(!showNewPostForm)} />
        <dialog ref={dialogRef}>
            <div ref={formRef}>
                <CreatePostModal setRefreshPosts={setRefreshPosts} closeModal={() => setShowNewPostForm(false)} />
            </div>
        </dialog>
    </div>
}

const MyProfile = () => {
    return <div className="account">
        {/*TODO añadir forms para actualizar username, bio y avatar */}
    </div>
}