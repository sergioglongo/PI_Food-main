import {  useState ,useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import {setRecipeCreate, getAllDiets, getAllRecipes} from '../redux/actions'
import {onClickAddLogic,onClickQuitLogic,cleanData,validationsForm} from './RecipeCreateLogic'
import './recipecreate.css'

export default function RecipeCreate() {

    const initialForm = {
        title: "",
        summary: "",
        healtScore: "",
        steps: [],
        diets: [],
        image: ""
    }

    const [form, setForm] = useState(initialForm)
    const [errors,setErrors]= useState({})
    let showOk = false

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllDiets())
    }, [dispatch])
    
    const dietsAll = useSelector(state=> state.dietsAll)

    function handleOnChange(e) {
        const {name,value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }   

    function handleOnBlur(e) {
        handleOnChange(e)
        setErrors(validationsForm(form))
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        setErrors(validationsForm(form))
        if(Object.keys(errors).length === 0)
        {
            setRecipeCreate(form)
            cleanData(dietsAll)
            alert("Se agrego la receta correctamente")
        }
    }
    
    function onClickAdd(e) {//Quitar de select de dietas disponibles y pasarlo a lista de dietas elegidas
        let selDieta = document.getElementById("dietasAll")
        if (selDieta.options.length)
            setForm({
                ...form,
                diets: onClickAddLogic()
            }) 
            setErrors(validationsForm(form))
    }
    
    function onClickQuit(e) {//Quitar de select de dietas elegidas y pasarlo a lista de dietas disponibles
        let selDieta = document.getElementById("diets")
        if (selDieta.options.length)
            setForm({
                ...form,
                diets: onClickQuitLogic()
            })
            setErrors(validationsForm(form))
    }
    
    function onClickAddStep(e) {
        let stepAdd = document.getElementById("stepAdd")
        let steps = document.getElementById("steps")
        let stepValue = stepAdd.value
        let arrayStepsList = []
        var option = document.createElement("option");
        option.text = stepValue
        option.value = stepValue
        steps.appendChild(option)
        for (let index = 0; steps.options[index]; index++)
            arrayStepsList.push({number: index + 1,step:steps.options[index].value})
        setForm({
                ...form,
                steps: arrayStepsList
            })
        stepAdd.value =""   
    }
 
    function onClickQuitStep(e) {//Quitar de select de dietas elegidas y pasarlo a lista de dietas disponibles
        let steps = document.getElementById("steps")
        let stepSelected = document.getElementById("steps").selectedIndex
        let arrayStepsList = []
        steps.removeChild(steps[stepSelected])
        for (let index = 0; steps.options[index]; index++)
            arrayStepsList.push({number: index + 1,step:steps.options[index].value})
        setForm({
                ...form,
                steps: arrayStepsList
            })
    }
 
    return (
        <div className="form-container">
            <form className="form-create" id="formCreate" onSubmit={(e) => { handleOnSubmit(e) }}>
            <h2>Creacion de Receta</h2>
            <span>(* campos obligatorios)</span>
                <div className="inputs-containers">
                    <span>Titulo(*):</span> 
                    <input className="input-normal" name="title" id="title" type="text" onBlur={(e) => {handleOnBlur(e)}} onChange={(e) => {handleOnChange(e)}} required/>
                </div>
                <div>
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>
                <div>
                    <span>Descripcion(*):</span> 
                    <input className="input-area" id="summary" name="summary" type="text" onBlur={(e) => {handleOnBlur(e)}} onChange={(e) => {handleOnChange(e)}} required/>
                    <div>
                    {errors.summary && <span className="error-message">{errors.summary}</span>}
                    </div>
                </div>
                <div>
                    <span>Nivel Saludable(*):</span>
                    <input className="input-normal" id="healtScore" placeholder="80" name="healtScore"  type="text" onBlur={(e) => {handleOnBlur(e)}} onChange={(e) => {handleOnChange(e)}} required/>
                </div>
                <div>
                    {errors.healtScore && <span className="error-message">{errors.healtScore}</span>}
                </div>
                <div>
                    URL de imagen:
                    <input className="input-area" id="image" name="image" type="text" onBlur={(e) => {handleOnBlur(e)}} onChange={(e) => {handleOnChange(e)}} />
                </div>
                <div>
                    <p>Dietas(*):</p>
                    <select id="dietasAll" name="dietasAll" >
                        {
                            dietsAll.map((element, i) => (
                                <option key={element.id} value={element.name}>{element.name}</option>
                            ))
                        }
                    </select>
                    <div>
                        <div className="buttons-container">

                            <button className="button-create" type="button" value="Agregar" onClick={(e) => { onClickAdd(e) }} ><span className="globe">Agregar a Dietas</span>Agregar</button> 
                            
                            <button className="button-create" type="button" value="Quitar" onClick={(e) => { onClickQuit(e) }} ><span className="globe">Quitar de Dietas</span>Quitar</button> 
                        </div>
                        <div className="list-container">
                            <p>Seleccion:</p>
                            <select className="lists" id="diets" name="diets" multiple="multiple" onChange={(e) => {handleOnBlur(e)}}>
                            </select>
                        </div>
                        <div>
                    {errors.diets && <span className="error-message">{errors.diets}</span>}
                    </div>
                        <div>
                            Paso a agregar:
                            <input className="input-area" id="stepAdd" name="stepAdd" type="text" />
                        </div>
                        <div className="buttons-container">
                            <button className="button-create" type="button" value="Agregar" onClick={(e) => onClickAddStep(e)}><span className="globe">Agregar a Pasos</span>Agregar</button>
                            <button className="button-create" type="button" value="Quitar" onClick={(e) => { onClickQuitStep(e) }} ><span className="globe">Quitar de Dietas</span>Quitar</button> 
                        </div>

                        <div>
                            <p>Pasos:</p>
                            <select id="steps" name="steps" multiple="multiple">
                            </select>
                        </div>
                    </div>
                    <div>
                    <button className="button-submit" type="submit" value="Crear" ><span className="globe">{errors.title} {errors.summary} {errors.healtScore} {errors.diets}</span>Crear</button>
                    </div>
                    <div>
                    {showOk && <span>Se agrego correctamente</span>}        
                    </div>
                </div>
            </form>
        </div>
    )
}