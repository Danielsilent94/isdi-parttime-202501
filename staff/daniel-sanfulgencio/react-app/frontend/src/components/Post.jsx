import { useNavigate } from "react-router"
import logics from "../logic"
import './Post.css'
import UserAvatar from "./UserAvatar"
import Btn from "./lib/Btn"
import getLoggedUserId from "../logic/helpers/getLoggedUserId"

const Post = ({ postData, setRefreshPosts, isMyPostsPage }) => {
    const navigate = useNavigate()

    const handleLikePost = (id) => {
        try {
            logics.posts.toggleLike(id)
            setRefreshPosts(Date.now())
        } catch (error) {
            alert('ups, something is not working!')
            console.error(error)
        }
    }

    const handleDeletePost = (id) => {
        try {
            const isUserSure = confirm('you sure you want to delete?')
            if (isUserSure) {
                logics.posts.deletePost(getLoggedUserId(), id)
                setRefreshPosts(Date.now())
            }
        } catch (error) {
            alert('ups, something is not working!')
            console.error(error)
        }
    }

    return <div className="post-card">
        {
            isMyPostsPage && <Btn
                btnClassnames={'post-card__delete-button'}
                btnCallback={() => handleDeletePost(postData.id)}
                btnContent={<i className="bi bi-trash-fill"></i>}
            />
        }
        <div className="post-card__creation-info">
            <span className="post-card__author">
                {postData.author && <UserAvatar
                    size='md'
                    avatar={postData.author.avatar}
                    letter={postData.author.username[0]}
                    buttonCallback={() => navigate(`/profile/${postData.author.username}`)}
                />
                }
                {postData.author.username}
            </span>
            {postData.createdOn}
        </div>
        <h3 className="post-card__title">{postData.title}</h3>
        <p className="post-card__description">{postData.description}</p>
        {
            postData.img && <div className="post-card__img-container">
                <img className="post-card__img" src={postData.img} />
            </div>
        }
        <div className="post-card__like">
            <span onClick={() => handleLikePost(postData.id)} className="post-card__like-btn">
                {
                    postData.isLiked ?
                        <i className="bi bi-heart-fill"></i>
                        :
                        <i className="bi bi-heart"></i>
                }
            </span>
            <p>{postData.likes.length}</p>
        </div>
    </div>
}

export default Post