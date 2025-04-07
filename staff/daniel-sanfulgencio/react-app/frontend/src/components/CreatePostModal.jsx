import logics from "../logic"
import Btn from "./lib/Btn"
import Form from "./lib/Form"

const CreatePostModal = ({ setRefreshPosts, closeModal }) => {
    const titleInput = { label: 'Your post title', inputType: 'text', inputPlaceholder: 'Write a title here!', inputId: 'title', isRequired: true }
    const descriptionInput = { label: 'Your description', inputType: 'text', inputPlaceholder: 'Your description here!', inputId: 'description', isRequired: true }
    const imgInput = { label: 'Your image url', inputType: 'url', inputPlaceholder: '.png, .jpg, etc', inputId: 'img', isRequired: false }

    const handlePublishPost = (formData) => {
        try {
            logics.posts.publishPost(formData)
            closeModal()
            setRefreshPosts(Date.now())
        } catch (error) {
            alert('ups, something is not working!')
            console.error(error)
        }
    }

    return <div className="home__create-post-dialog">
        <Btn btnClassnames={'home__close-form-button'} btnCallback={closeModal} btnContent={'X'} />
        <h2>What do you want to share?</h2>
        <Form inputsArray={[titleInput, descriptionInput, imgInput]} submitButtonText={'Publish'} onSubmitCallback={handlePublishPost} />
    </div>
}

export default CreatePostModal