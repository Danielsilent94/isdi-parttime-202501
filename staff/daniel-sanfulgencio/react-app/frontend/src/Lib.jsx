const Btn = ({ btnContent, btnClassnames, btnCallback }) => {

    return <button onClick={btnCallback} className={btnClassnames}>{btnContent}</button>
}

const Form = ({ inputsArray, onSubmitCallback, submitButtonText }) => { //inputsArray = [{label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email'}, {label: 'Password....}]
    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target; // --> elemento form html al que le hemos dado submit
        const formData = {}; // {email: esto, password: esto-otro}

        //iterar todos los inputs que he generado en el formulario, de esos inputs quiero acceder al valor que ha escrito el usuario
        for (let i = 0; i < inputsArray.length; i++) {
            const fieldName = inputsArray[i].inputId;
            let value;
            if (inputsArray[i].inputType === 'checkbox') {
                value = form[inputsArray[i].inputId].checked
            } else {
                vlue = form[inputsArray[i].inputId].value
            }

            formData[fieldName] = value; //formData = {'email': 'patata@mail.com'}
        }

        try {
            onSubmitCallback(formData)
        } catch (error) {
            console.error(error)
            if (error.name === 'FormatError' || error.name === 'RangeError' || error.name === 'TypeError') {
                alert('incorrect inputs, check your form data again')
            }
        }
    }

    return <form className="form" onSubmit={handleSubmit}>
        {
            inputsArray.map((inputElement, index) => {
                if (inputElement.inputType === 'checkbox') {
                    return <fieldset key={index}>
                        <input className="form__input-checkbox" type={inputElement.inputType} id={inputElement.inputId} required={inputElement.isRequired} value={inputElement.value} />
                        <label htmlFor={inputElement.inputId}>{inputElement.label}</label>
                    </fieldset>
                } else {
                    return <div className="form__input" key={index}>
                        <label htmlFor={inputElement.inputId}>{inputElement.label}</label>
                        <input className="form__input-text" id={inputElement.inputId} required={inputElement.isRequired} type={inputElement.inputType} placeholder={inputElement.inputPlaceholder} />
                    </div>
                }
            })
        }
        <input className="form__submit-button" type="submit" value={submitButtonText} />
    </form>
}

const Logo = ({ size, onClick }) => {

    return <svg onClick={onClick} className={`logo ${size}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M173.24-481.67q-39.24 0-66.24-27.09-27-27.09-27-66.33 0-39.24 27.09-66.24 27.1-27 66.34-27t66.24 27.09q27 27.09 27 66.33 0 39.24-27.1 66.24-27.09 27-66.33 27Zm183.33-166.66q-39.24 0-66.24-27.1-27-27.09-27-66.33 0-39.24 27.1-66.24 27.09-27 66.33-27Q396-835 423-807.91q27 27.1 27 66.34t-27.09 66.24q-27.1 27-66.34 27Zm246.67 0q-39.24 0-66.24-27.1-27-27.09-27-66.33Q510-781 537.09-808q27.1-27 66.34-27t66.24 27.09q27 27.1 27 66.34t-27.1 66.24q-27.09 27-66.33 27Zm183.33 166.66q-39.24 0-66.24-27.09-27-27.09-27-66.33 0-39.24 27.1-66.24 27.09-27 66.33-27 39.24 0 66.24 27.09 27 27.09 27 66.33 0 39.24-27.09 66.24-27.1 27-66.34 27ZM266-75q-43 0-71.17-32.52-28.16-32.51-28.16-76.81 0-45.34 28.83-80 28.83-34.67 59.83-67.34 24.34-25 44-53.5 19.67-28.5 40.67-56.5 26.67-38 60.33-69 33.67-31 79.67-31T560-511q34 30.67 60.67 69.34 20.66 27.99 40.16 56.33 19.5 28.33 43.84 53.66 31 32.67 59.83 67.34 28.83 34.66 28.83 80 0 44.3-28.16 76.81Q737-75 694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z" /></svg>
}