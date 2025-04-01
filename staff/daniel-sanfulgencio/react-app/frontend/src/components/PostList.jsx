import { useState, useEffect } from "react"
import logics from "../logic"
import Post from "./Post"
import "./PostList.css"

const PostList = ({ posts, setRefreshPosts, handleNavigateToUserProfile }) => {

    return <div className="posts">
        {
            (posts && posts.length > 0) && posts.map((post, index) => {
                return <Post key={index} postData={post} onLikePost={setRefreshPosts} handleNavigateToUserProfile={handleNavigateToUserProfile} />
            })
        }
        {
            !posts || posts.length === 0 && <p>no posts</p>
        }
    </div>
}

export default PostList