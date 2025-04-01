import { useEffect, useState } from "react"
import UserCard from "../components/UserCard"
import PostList from "../components/PostList"
import logics from "../logic"

const UserProfile = ({ userId }) => {
    const [posts, setPosts] = useState([])
    const [refreshPosts, setRefreshPosts] = useState(Date.now())


    useEffect(() => {
        setPosts([])
        try {
            const retrivedPosts = logics.posts.getPostsByAuthor(userId)
            console.log(retrivedPosts)
            setPosts(retrivedPosts)
        } catch (error) {
            alert('ups, something is not working!')
            console.error(error)
        }
    }, [refreshPosts])

    return <div className="main-container">
        <UserCard userId={userId} />
        <PostList posts={posts} setRefreshPosts={setRefreshPosts} handleNavigateToUserProfile={setRefreshPosts} />
    </div>

}

export default UserProfile