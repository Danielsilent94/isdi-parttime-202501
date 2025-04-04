import { useState, useEffect } from "react"
import logics from "./logic/index"
import Header from "./components/Header"
import { Routes, Route, useLocation, useNavigate } from "react-router"
import isUserLoggedIn from "./logic/users/isUserLoggedIn"
import Private from "./pages/Private"
import Public from "./pages/Public"


const App = () => {
    const [refreshHeader, setRefreshHeader] = useState(Date.now())
    const [isUserLogged, setIsUserLogged] = useState(logics.users.isUserLoggedIn())
    const location = useLocation()
    const navigate = useNavigate()

    const onLogoutClick = () => {
        logics.users.logoutUser()
        setIsUserLogged(logics.users.isUserLoggedIn())
        setRefreshHeader(Date.now())
        navigate("/")
    }

    useEffect(() => {
        setIsUserLogged(logics.users.isUserLoggedIn())
    }, [location.pathname])

    return <>
        <Header
            isUserLogged={isUserLogged}
            refreshHeader={refreshHeader}
            logout={onLogoutClick}
        />
        {isUserLoggedIn() ? <Private setRefreshHeader={setRefreshHeader} /> : <Public setRefreshHeader={setRefreshHeader} />}
    </>
}

export default App