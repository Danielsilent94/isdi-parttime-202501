import data from "../../data";
import validator from "../../utils/validators"
import getLoggedUserId from "../helpers/getLoggedUserId";

const publishPost = (postData) => {
    validator.text(postData['title'], 40, 1, 'Post-Title')
    validator.text(postData['description'], 210, 1, 'Post-Description')
    if (postData['img']) validator.imgUrl(postData['img'])

    const userId = getLoggedUserId()

    validator.id(userId)

    postData.author = userId;
    data.posts.createPost(postData)
}

export default publishPost