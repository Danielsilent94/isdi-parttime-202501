import { useState, useEffect } from "react"
import Btn from "./lib/Btn"
import Logo from "./lib/Logo"
import logics from "../logic"
import './Header.css'
import getLoggedUserId from "../logic/helpers/getLoggedUserId"
import UserAvatar from "./UserAvatar"
import { useLocation, useNavigate } from "react-router"
import locales from "../locales"

const Header = ({ refreshHeader, logout, isUserLogged, locale }) => {
    const location = useLocation();
    const [username, setUsername] = useState('')
    const [isUserMenuOpen, setUserMenuOpen] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [path, setPath] = useState('')
    const [justifyItems, setJustifyItems] = useState('')
    const navigate = useNavigate()

    const [translations, setTranslations] = useState(locales[locale]['header'])

    useEffect(() => {
        setTranslations(locales[locale]['header'])
    }, [locale])

    const onLogoutClick = () => {
        setUserMenuOpen(false)
        logout()
    }

    useEffect(() => {
        const pathname = location.pathname
        setPath(pathname)

        if (logics.users.isUserLoggedIn()) {
            setJustifyItems('between')
            logics.users.getUserUsername((error, retrivedUsername) => {
                if (error) {
                    alert('error!')
                    console.error(error)
                }
                else {
                    setUsername(retrivedUsername)
                    logics.users.getUserAvatar((error, retrivedAvatar) => {
                        if (error) {
                            alert('error!')
                            console.error(error)
                        } else {
                            setAvatar(retrivedAvatar)
                        }
                    })
                }
            })


        } else {
            if (pathname === '/login' || pathname === '/register') {
                setJustifyItems('start')
            } else if (pathname === "/") {
                setJustifyItems('end')
            } else {
                setJustifyItems('not-found')
            }
        }
    }, [refreshHeader, location])


    const handleLogoClick = () => {
        navigate("/")
    }

    const onMenuRouteClick = (path) => {
        if (path) navigate(path)
        setUserMenuOpen(false)
    }

    return <header className={`header ${justifyItems}`}>
        {
            ((path === '/register' || path === '/login' || justifyItems === 'not-found') || isUserLogged) && <Logo onClick={handleLogoClick} size="sm" />
        }
        {
            (isUserLogged && username.length > 0) && <p>{`${translations.welcome}, ${username}`}</p>
        }
        {
            !isUserLogged && (path === '/' || justifyItems === 'not-found') && <Btn btnClassnames={"header__join-button"} btnContent={translations.joinBtn} btnCallback={() => navigate('/register')} />
        }
        {
            (((username || avatar) && isUserLogged) &&
                <UserAvatar
                    size={'sm'}
                    avatar={avatar}
                    letter={username[0]}
                    buttonCallback={() => setUserMenuOpen(!isUserMenuOpen)}
                />)
        }
        {
            isUserMenuOpen && <aside className="header__user-menu">
                <Btn btnContent={translations.account} btnClassnames={'header__user-menu--button'} btnCallback={() => onMenuRouteClick('/my-profile')} />
                <Btn btnContent={translations.settings} btnClassnames={'header__user-menu--button'} btnCallback={() => onMenuRouteClick('/settings')} />
                <Btn btnContent={translations.myPosts} btnClassnames={'header__user-menu--button'} btnCallback={() => onMenuRouteClick('/my-posts')} />
                <Btn btnContent={translations.logout} btnClassnames={'header__user-menu--button'} btnCallback={onLogoutClick} />
            </aside>
        }


    </header>
}

export default Header