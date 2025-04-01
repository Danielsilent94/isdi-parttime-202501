import { useState, useEffect } from "react"
import pages from "./pages/index"
import logics from "./logic/index"
import Header from "./components/Header"

const { Landing, Home, Login, Register, MyProfile, UserProfile } = pages

const App = () => {
    const [view, setView] = useState(logics.users.isUserLoggedIn() ? 'home' : 'landing') //register, login, home
    const [refreshHeader, setRefreshHeader] = useState(Date.now())
    const [selectedUserId, setSelectedUserId] = useState()

    const navigateToLogin = () => setView('login')
    const navigateToRegister = () => setView('register')
    const navigateToHome = () => setView('home')
    const navigateToLanding = () => setView('landing')
    const navigateToMyProfile = () => setView('account')
    const navigateToUserProfile = (userId) => {
        setSelectedUserId(userId)
        setView('user-profile')
    }


    useEffect(() => {
    }, [view])


    return <div className={view}>
        <Header
            currentView={view}
            refreshHeader={refreshHeader}
            handleRegisterClick={navigateToRegister}
            handleLandingClick={navigateToLanding}
            handleAccountClick={navigateToMyProfile}
            handleHomeClick={navigateToHome}
        />
        {view === 'landing' && <Landing />}
        {view === 'register' && <Register handleNavigateToHome={navigateToHome} handleLoginClick={navigateToLogin} />}
        {view === 'login' && <Login handleNavigateToHome={navigateToHome} handleRegisterClick={navigateToRegister} />}
        {view === 'home' && <Home handleNavigateToUserProfile={navigateToUserProfile} />}
        {view === 'account' && <MyProfile updateHeader={setRefreshHeader} />}
        {view === 'user-profile' && <UserProfile userId={selectedUserId} />}
    </div>
}

export default App