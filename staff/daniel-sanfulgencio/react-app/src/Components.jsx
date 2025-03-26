const useState = React.useState
const useEffect = React.useEffect

const Header = ({ currentView, handleRegisterClick, handleLandingClick, handleAccountClick, handleHomeClick }) => {
    const [username, setUsername] = useState('')
    const [isUserMenuOpen, setUserMenuOpen] = useState(false)
    const [isUserLogged, setIsUserLogged] = useState(isUserLoggedIn())

    useEffect(() => {
        setIsUserLogged(isUserLoggedIn())
        if (currentView === 'home') {
            const retrivedUsername = getLoggedUserUsername()
            setUsername(retrivedUsername)
        }
    }, [currentView])

    const onLogoutClick = () => {
        logoutUser()
        setUserMenuOpen(false)
        handleLandingClick()
    }

    const onAccountClick = () => {
        handleAccountClick()
        setUserMenuOpen(false)
    }

    return <header className="header">
        {
            currentView === 'landing' && <Btn btnContent={'Join in!'} btnClassnames={'header__join-button'} btnCallback={handleRegisterClick} />
        }
        {
            (currentView === 'register' || currentView === 'login') && <Logo onClick={handleLandingClick} size="sm" />
        }
        {
            isUserLogged && <Logo size="sm" onClick={handleHomeClick} />
        }

        {
            (isUserLogged && username.length > 0) && <p>{`Welcome, ${username}`}</p>
        }
        {
            (isUserLogged && username.length > 0) && <Btn btnContent={username[0].toUpperCase()} btnClassnames={'header__user-button'} btnCallback={() => setUserMenuOpen(!isUserMenuOpen)} />
        }
        {
            isUserMenuOpen && <aside className="header__user-menu">
                <Btn btnContent={'Account'} btnClassnames={'header__user-menu--button'} btnCallback={onAccountClick} />
                <Btn btnContent={'Meh'} btnClassnames={'header__user-menu--button'} btnCallback={() => setUserMenuOpen(false)} />
                <Btn btnContent={'Meh'} btnClassnames={'header__user-menu--button'} btnCallback={() => setUserMenuOpen(false)} />
                <Btn btnContent={'Logout'} btnClassnames={'header__user-menu--button'} btnCallback={onLogoutClick} />
            </aside>
        }

    </header>

}

const Post = ({ postData, onLikePost }) => {
    const handleLikePost = (id) => {
        try {
            toggleLike(id)
            onLikePost(Date.now())
        } catch (error) {
            console.error(error)
        }

    }

    return <div className="post-card">
        <p className="post-card__author">
            {`${postData.author} said on ${postData.createdOn}`}
        </p>
        <h3 className="post-card__title">{postData.title}</h3>
        <p className="post-card__description">{postData.description}</p>
        {
            postData.img && <div className="post-card__img-container">
                <img className="post-card__img" src={postData.img} />
            </div>
        }
        <div className="post-card__like">
            <span onClick={() => handleLikePost(postData.id)} className="post-card__like-btn">
                {
                    postData.isLiked ?
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" /></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg>
                }
            </span>
            <p>{postData.likes.length}</p>
        </div>
    </div>
}

const PostList = ({ refreshPosts, setRefreshPosts }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try {
            const retrivedPosts = getAllPosts()
            setPosts(retrivedPosts)
        } catch (error) {
            console.error(error)
        }
    }, [refreshPosts])

    return <div className="posts">
        {
            posts.map((post, index) => {
                return <Post key={index} postData={post} onLikePost={setRefreshPosts} />
            })
        }
    </div>
}

const CreatePostModal = ({ setRefreshPosts, closeModal }) => {
    const titleInput = { label: 'Your post title', inputType: 'text', inputPlaceholder: 'I am a title :D', inputId: 'title', isRequired: true }
    const descriptionInput = { label: 'Your description', inputType: 'text', inputPlaceholder: 'Blah blah blah blah', inputId: 'description', isRequired: true }
    const imgInput = { label: 'Your image url', inputType: 'url', inputPlaceholder: '.png, .jpg, etc', inputId: 'img', isRequired: false }

    const handlePublishPost = (formData) => {
        try {
            publishPost(formData)
            setRefreshPosts(Date.now())
            closeModal()
        } catch (error) {
            console.error(error)
        }
    }

    return <div className="home__create-post-dialog">
        <Btn btnClassnames={'home__close-form-button'} btnCallback={closeModal} btnContent={'X'} />
        <h2>What do you want to share?</h2>
        <Form inputsArray={[titleInput, descriptionInput, imgInput]} submitButtonText={'Publish'} onSubmitCallback={handlePublishPost} />
    </div>

}