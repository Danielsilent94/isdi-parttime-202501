/**EL ARCHIVO LIB CONTIENE LAS FUNCIONES QUE PERMITEN CREAR ELEMENTOS PARA EL DOM**/


/*Función para añadir multiples hijos a el elemento padre que es el primero que pasamos hecha por nosotros para ver más fors*/
function appendChildren() {
    var parent = arguments[0] //el primer elemento es el contendor
    for (var i = 1; i < arguments.length; i++) {
        parent.appendChild(arguments[i])   //añadimos el resto de elementos
    }
    return parent
}

/*Crear un elemento html que contiene texto*/
function createTextContainer(tag, text, style) {
    var element = document.createElement(tag);
    element.textContent = text;
    element.className = style;
    return element
}

/*Crear un botón y le pasa en el parametro "callback" que es la función que se ejecuta al hacer click*/
function createButton(text, style, callback) {
    var button = document.createElement('button');
    button.className = style;
    button.textContent = text;
    button.addEventListener('click', callback) //Se activa la función que hemos pasado como parametro al hacer click
    return button
}

/*Crear un contenedor (un div con estilos definidos)*/
function createContainer(style) {
    var container = document.createElement('div');
    container.className = style;
    return container
}


function createForm(inputsArray, submitButtonText, callback) {
    var formContainer = document.createElement('form');
    formContainer.className = 'form';

    for (var i = 0; i < inputsArray.length; i++) {
        var input = inputsArray[i]; // input = { label, inputType, inputPlaceholder, inputId, isRequired }
        var label = document.createElement('label');
        label.htmlFor = input.inputId;
        label.textContent = input.label;

        var inputElement = document.createElement('input');
        inputElement.type = input.inputType;
        inputElement.id = input.inputId;
        inputElement.name = input.inputId; // Importante para formularios
        inputElement.required = input.isRequired || false;

        if (input.inputType === 'checkbox') {
            inputElement.value = input.inputValue || 'on';
            inputElement.checked = false; // Asegurar que no está marcado por defecto
            
            // Agrupar el checkbox con el label en un contenedor para mejor organización
            var checkboxContainer = document.createElement('div');
            checkboxContainer.className = 'checkbox-container'; // Puedes estilizarlo con CSS
            appendChildren(checkboxContainer, inputElement, label);
            formContainer.appendChild(checkboxContainer);
        } else {
            inputElement.placeholder = input.inputPlaceholder || '';
            appendChildren(formContainer, label, inputElement);
        }
    }

    var submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = submitButtonText;

    formContainer.appendChild(submitButton);

    formContainer.addEventListener('submit', function (event) {
        event.preventDefault();

        var form = event.target;
        var formData = {};

        for (var i = 0; i < inputsArray.length; i++) {
            var fieldName = inputsArray[i].inputId;
            var value = inputsArray[i].inputType === 'checkbox' 
                        ? form[fieldName].checked 
                        : form[fieldName].value;

            formData[fieldName] = value;
        }

        callback(formData);
    });

    return formContainer;
}


//A continuación, crearemos función para el logo.