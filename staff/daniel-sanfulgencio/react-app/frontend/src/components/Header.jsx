import { useState, useEffect } from "react"
import Btn from "./lib/Btn"
import Logo from "./lib/Logo"
import logics from "../logic"
import './Header.css'
import getLoggedUserId from "../logic/helpers/getLoggedUserId"
import UserAvatar from "./UserAvatar"

const Header = ({ currentView, handleRegisterClick, handleLandingClick, handleAccountClick, handleHomeClick, refreshHeader }) => {
    const [username, setUsername] = useState('')
    const [isUserMenuOpen, setUserMenuOpen] = useState(false)
    const [isUserLogged, setIsUserLogged] = useState(logics.users.isUserLoggedIn())

    useEffect(() => {
        setIsUserLogged(logics.users.isUserLoggedIn())
        if (currentView === 'home' || currentView === 'account') {
            const retrivedUsername = logics.users.getUserUsernameById(getLoggedUserId())
            setUsername(retrivedUsername)
        }
    }, [currentView, refreshHeader])

    const onLogoutClick = () => {
        logics.users.logoutUser()
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
            (isUserLogged &&
                <UserAvatar
                    size={'sm'}
                    userId={getLoggedUserId()}
                    buttonCallback={() => setUserMenuOpen(!isUserMenuOpen)}
                />)
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

export default Header
