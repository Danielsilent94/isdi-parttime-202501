import { Route, Routes } from "react-router"
import Home from "./Private/Home"
import MyProfile from "./Private/MyProfile"
import UserProfile from "./Private/UserProfile"
import NotFound from "./NotFound"
import MyPosts from "./Private/MyPosts"
import Settings from "./Private/Settings"

const Private = ({ setRefreshHeader, locale }) => {
    return <Routes>
        <Route path="/" element={<Home locale={locale} />} />
        <Route path="/my-profile" element={<MyProfile updateHeader={setRefreshHeader} locale={locale} />} />
        <Route path="/settings" element={<Settings locale={locale} />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/*" element={<NotFound />} />
    </Routes>
}

export default Private