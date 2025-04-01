import './Form.css'

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
                value = form[inputsArray[i].inputId].value
            }

            formData[fieldName] = value; //formData = {'email': 'patata@mail.com'}
        }

        try {
            onSubmitCallback(formData)
            form.reset()
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
                } else if (inputElement.inputType === 'text-area') {
                    return <div className="form__input" key={index}>
                        <label htmlFor={inputElement.inputId}>{inputElement.label}</label>
                        <textarea className="form__input-text" id={inputElement.inputId} required={inputElement.isRequired} placeholder={inputElement.inputPlaceholder} />
                    </div>

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

export default Form