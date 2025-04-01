import { useEffect, useRef, useState } from "react"
import PostList from "../components/PostList"
import Btn from "../components/lib/Btn"
import CreatePostModal from "../components/CreatePostModal"
import './Home.css'
import logics from "../logic"

const Home = ({ handleNavigateToUserProfile }) => {
    const [refreshPosts, setRefreshPosts] = useState(Date.now())
    const [showNewPostForm, setShowNewPostForm] = useState(false)
    const [posts, setPosts] = useState([])
    const dialogRef = useRef(null)
    const pageRef = useRef(null)
    const formRef = useRef(null)



    useEffect(() => {
        setPosts([])
        try {
            const retrivedPosts = logics.posts.getAllPosts()
            console.log(retrivedPosts)
            setPosts(retrivedPosts)
        } catch (error) {
            alert('ups, something is not working!')
            console.error(error)
        }
    }, [refreshPosts])

    const handleOutsideModalClick = (event) => {
        if (!formRef.current.contains(event.target)) {
            setShowNewPostForm(false)
        }
    }

    useEffect(() => {
        if (pageRef.current && showNewPostForm) pageRef.current.addEventListener("click", (event) => handleOutsideModalClick(event))

        if ((dialogRef.current && dialogRef.current.open) && !showNewPostForm) {
            dialogRef.current.close()
        } else if (!(dialogRef.current && dialogRef.current.open) && showNewPostForm) {
            dialogRef.current.showModal()
        }

        return () => {
            if (pageRef.current) pageRef.current.removeEventListener("click", handleOutsideModalClick);
        };
    }, [showNewPostForm])

    return <div className="main-container" ref={pageRef}>
        <PostList posts={posts} refreshPosts={refreshPosts} setRefreshPosts={setRefreshPosts} handleNavigateToUserProfile={handleNavigateToUserProfile} />
        <Btn btnClassnames={'home__new-post-button'} btnContent={'+'} btnCallback={() => setShowNewPostForm(!showNewPostForm)} />
        <dialog ref={dialogRef}>
            <div ref={formRef}>
                <CreatePostModal setRefreshPosts={setRefreshPosts} closeModal={() => setShowNewPostForm(false)} />
            </div>
        </dialog>
    </div>
}

export default Home