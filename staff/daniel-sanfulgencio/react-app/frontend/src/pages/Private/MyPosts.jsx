import { useEffect, useState } from "react"
import logics from "../../logic"
import getLoggedUserId from "../../logic/helpers/getLoggedUserId"
import PostList from "../../components/PostList"

const MyPosts = () => {
    const [posts, setPosts] = useState()
    const [refreshPosts, setRefreshPosts] = useState(Date.now())


    useEffect(() => {
        try {
            const retrivedPosts = logics.posts.getPostsByAuthor(getLoggedUserId())
            setPosts(retrivedPosts)

        } catch (error) {
            alert(error)
        }


    }, [refreshPosts])

    return <div className="main-container">
        <PostList posts={posts} setRefreshPosts={setRefreshPosts} isMyPostsPage={true} />
    </div>
}

export default MyPosts