import './PostCard.css'

const PostCard = ({ post, onClick }) => {
    return (
        <div className="post-card" onClick={() => onClick?.(post.id)}>
            <div className="post-card__header">
                <img className="post-card__avatar" src={post.author.avatar || '/default-avatar.png'} alt="avatar" />
                <span className="post-card__username">{post.author.username}</span>
            </div>
            <h3 className="post-card__title">{post.title}</h3>
            <p className="post-card__description">{post.description}</p>
            {post.img && <img className="post-card__image" src={post.img} alt="post" />}
            <div className="post-card__footer">
                <span className={`post-card__like ${post.isLiked ? 'liked' : ''}`}>
                    ❤️ {post.likes.length}
                </span>
                <span className="post-card__date">{post.createdOn}</span>
            </div>
        </div>
    )
}

export default PostCard;
