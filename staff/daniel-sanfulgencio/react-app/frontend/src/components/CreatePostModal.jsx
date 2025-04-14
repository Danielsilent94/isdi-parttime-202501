import { useEffect, useState } from "react"
import logics from "../logic"
import Btn from "./lib/Btn"
import Form from "./lib/Form"

const CreatePostModal = ({ setRefreshPosts, closeModal }) => {
    const [tempImg, setTempImg] = useState()
    const [isLocalImage, setIsLocalImage] = useState()
    const titleInput = { label: 'Your post title', inputType: 'text', inputPlaceholder: 'I am a title :D', inputId: 'title', isRequired: true }
    const descriptionInput = { label: 'Your description', inputType: 'text', inputPlaceholder: 'Blah blah blah blah', inputId: 'description', isRequired: true }
    const imgFileInput = { label: 'Load an image', inputType: 'file', inputPlaceholder: '', inputId: 'img-64', isRequired: false }
    const imgInput = { label: 'Or use a public image url', inputType: 'url', inputPlaceholder: '.png, .jpg, etc', inputId: 'img-url', isRequired: false }

    const handlePublishPost = (formData) => {
        try {
            if (isLocalImage) {
                const img = formData['img-64']
                const image = new FileReader();
                image.onload = () => {
                    const base64 = image.result;
                    setTempImg(base64)
                };
                image.readAsDataURL(img)
            }
            if (!isLocalImage && formData['img-url']) {
                setTempImg(formData['img-url'])
            }

            logics.posts.publishPost(formData['title'], formData['description'], tempImg)
            setIsLocalImage(null)
            setTempImg(null)
            closeModal()
            setRefreshPosts(Date.now())
        } catch (error) {
            alert('ups, something is not working!')
            console.error(error)
        }
    }

    const handleImageChange = (newImage, is64Image) => {
        setIsLocalImage(is64Image)
        setTempImg(newImage)
    }

    const deleteImage = () => {
        setIsLocalImage(null)
        setTempImg(null)
    }


    return <div className="home__create-post-dialog">
        <Btn btnClassnames={'home__close-form-button'} btnCallback={closeModal} btnContent={'X'} />
        <h2>What do you want to share?</h2>
        {tempImg && <Btn btnClassnames={'home__create-post--delete-image'} btnCallback={deleteImage} btnContent={<i className="bi bi-trash-fill"></i>} />}
        {tempImg && <img className="home__create-post--image-preview" src={tempImg} />}


        <Form inputsArray={[titleInput, descriptionInput, imgFileInput, imgInput]} submitButtonText={'Publish'} onSubmitCallback={handlePublishPost} onChangeCallback={handleImageChange} />
    </div>
}

export default CreatePostModal