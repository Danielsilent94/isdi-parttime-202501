import { useEffect, useState } from "react"
import logics from "../logic"
import Btn from "./lib/Btn"
import Form from "./lib/Form"
import locales from "../locales"

const CreatePostModal = ({ setRefreshPosts, closeModal, locale }) => {
    const [tempImg, setTempImg] = useState()
    const [isLocalImage, setIsLocalImage] = useState()
    const [translations, setTranslations] = useState(locales[locale]['forms'])


    const titleInput = { label: translations.postTitleLabel, inputType: 'text', inputPlaceholder: translations.postTitlePlaceholder, inputId: 'title', isRequired: true }
    const descriptionInput = { label: translations.postDscrLabel, inputType: 'text', inputPlaceholder: translations.postDscrPlaceholder, inputId: 'description', isRequired: true }
    const imgFileInput = { label: translations.postFileLabel, inputType: 'file', inputPlaceholder: '', inputId: 'img-64', isRequired: false }
    const imgInput = { label: translations.postUrlLabel, inputType: 'url', inputPlaceholder: '.png, .jpg, etc', inputId: 'img-url', isRequired: false }


    useEffect(() => {
        setTranslations(locales[locale]['forms'])
    }, [locale])

    const handlePublishPost = (formData, onSuccess) => {
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

            logics.posts.publishPost(formData['title'], formData['description'], tempImg, (error) => {
                if (error) alert(error)
                else {
                    onSuccess()
                    setIsLocalImage(null)
                    setTempImg(null)
                    closeModal()
                    setRefreshPosts(Date.now())
                }
            })
        } catch (error) {
            alert(translations.errorMsg)
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
        <h2>{translations.newPostTitle}</h2>
        {tempImg && <Btn btnClassnames={'home__create-post--delete-image'} btnCallback={deleteImage} btnContent={<i className="bi bi-trash-fill"></i>} />}
        {tempImg && <img className="home__create-post--image-preview" src={tempImg} />}


        <Form inputsArray={[titleInput, descriptionInput, imgFileInput, imgInput]} submitButtonText={translations.postSubmitTxt} onSubmitCallback={handlePublishPost} onFileChangeCallback={handleImageChange} />
    </div>
}

export default CreatePostModal