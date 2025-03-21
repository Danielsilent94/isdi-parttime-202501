import { likeFill, likeEmpty } from "../icons.mjs";
import { createButton, createContainer, createTextContainer } from "../lib.mjs";
import { getAllPosts, toggleLike } from "../logics.mjs";

const postList = {
    mount: (parentNode, onLikePost) => {
        const posts = getAllPosts();
        const postsContainer = createContainer('posts')

        for (let i = 0; i < posts.length; i++) {
            const postContainer = createContainer('post-card');
            const authorAndDate = createTextContainer('p', `${posts[i].author} said on ${posts[i].createdOn}`, 'post-card__author')
            const postTitle = createTextContainer('h3', posts[i].title, 'post-card__title')
            const postDescription = createTextContainer('p', posts[i].description, 'post-card__description')
            const postLikes = createTextContainer('p', `${posts[i].likes.length}`)
            const buttonLike = createButton('', 'like-button', () => onLikePost(posts[i].id));
                if (posts[i].likes.length > 0) {
            buttonLike.innerHTML = likeFill;  // Aquí ponemos el icono cuando el like ya está activado
                } else {
            buttonLike.innerHTML = likeEmpty;  // Usa otro icono para el "like" vacío
                }

            postContainer.append(authorAndDate, postTitle, postDescription, postLikes, buttonLike)

            let postImg;
            if (posts[i].img !== '') {
                const imgContainer = createContainer('post-card__img-container')
                postImg = document.createElement('img')
                postImg.className = 'post-card__img'
                postImg.src = posts[i].img
                imgContainer.appendChild(postImg)
                postContainer.appendChild(imgContainer)

            }
            postsContainer.appendChild(postContainer)
        }

        parentNode.appendChild(postsContainer)
    }
}

export default postList