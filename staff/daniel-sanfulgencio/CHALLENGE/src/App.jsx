const useState = React.useState //Nos traemos el hook useState de react
const useEffect = React.useEffect //Nos traemos el hook useEffect de react
const App = () => {
    const [showForm, setShowForm] = useState(true)
    /*PASO 6: añade aquí el estado de words, usando useState*/
    const [words, setWords] = useState([])
    /*PASO 7: añade un estado llamado timeStamp cuyo valor por defecto sea Date.now()*/
    const [timeStamp, setTimeStamp] = useState(Date.now())
    /*PASO 6: añade aquí tu useEffect*/
    useEffect(() => {
        const retrievedWords = data.words.getAll();
        setWords(retrievedWords);
    }, [timeStamp]) 
    /*PASO 7: añade el timeStamp al array de dependencias del useEffect*/

    const handleSendNewWord = (newWordFormData) => {
        console.log (newWordFormData);
        if (!newWordFormData.word.trim()) return; // Evitar agregar palabras vacías
        data.words.addNew(newWordFormData.word); // PASO 4: Guardar palabra
        setShowForm(false); // PASO 4: Cambiar a la lista después de agregar
        setTimeStamp(Date.now()); // PASO 7: Forzar actualización
    };
    
    const handleDeleteWord = (wordIndex) => {
        data.words.deleteByIndex(wordIndex); // PASO 8: Eliminar palabra
        setTimeStamp(Date.now()); // PASO 8: Forzar actualización
    };
    const handleNavClick = () => {
        setShowForm(!showForm);
        setTimeStamp(Date.now());
    };
    return (
        <div className="main-container">
            <Btn
                className={'navigation-button'}
                btnCallback={handleNavClick} // PASO 2: Alternar entre vistas
                btnContent={showForm ? 'Ir a lista de palabras' : 'Añadir más palabras'}
            />

            {showForm ? (
                <Form
                    inputs={[{ type: "text", placeholder: "Nueva palabra", id: "word", className: "input" }]}
                    onsSubmitCallback={handleSendNewWord}
                    submitText="Guardar"
                />
            ) : (
                <List items={words} onItemClick={handleDeleteWord} />
            )}
        </div>
    );
};