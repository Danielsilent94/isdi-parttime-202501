import { useEffect, useState } from "react"
import UserCard from "../../components/UserCard"
import PostList from "../../components/PostList"
import logics from "../../logic"
import { useParams } from "react-router"
import { ExistenceError } from "../../utils/errors"
import NotFound from "../NotFound"

const UserProfile = () => {
    const [posts, setPosts] = useState()
    const [userId, setUserId] = useState()
    const [refreshPosts, setRefreshPosts] = useState(Date.now())
    const { username } = useParams()

    useEffect(() => {
        try {
            const retrivedId = logics.users.getUserIdByUsername(username)
            setUserId(retrivedId)
            const retrivedPosts = logics.posts.getPostsByAuthor(retrivedId)
            setPosts(retrivedPosts)
        } catch (error) {
            if (error instanceof ExistenceError) {
                setUserId('not-found')
            } else {
                alert('ups, something is not working!')
                console.error(error)
            }
        }
    }, [refreshPosts])

    return <>
        {
            userId === 'not-found' ? <NotFound />
                :
                <div className="main-container">
                    {
                        userId && <UserCard userId={userId} />
                    }
                    {
                        posts && <PostList posts={posts} setRefreshPosts={setRefreshPosts} handleNavigateToUserProfile={setRefreshPosts} />
                    }
                </div>
        }
    </>
}

export default UserProfile