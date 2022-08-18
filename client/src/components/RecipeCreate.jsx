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
    const [errors,setErrors]= useState({propiedad:"algo"})
    const [createOk,setCreateOk] = useState(false)

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllDiets())
    }, [dispatch])
    
    const dietsAll = useSelector(state=> state.dietsAll)

    useEffect(() => {
        buttonCreateEnable()
    }, [errors])
    

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

    function buttonCreateEnable() {
        if (Object.keys(errors).length === 0)
            document.getElementById("button-submit").disabled = false
        else
            document.getElementById("button-submit").disabled = true
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        setErrors(validationsForm(form))
        if(Object.keys(errors).length === 0)
        {
            setRecipeCreate(form)
            setCreateOk(true)
            setTimeout(() => {
                setCreateOk(false)
            }, 7000);
            cleanData(dietsAll)
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
            <h5>(* campos obligatorios)</h5>
                <div className="inputs-containers">
                    <span>Titulo(*):</span> 
                    <input className="input-normal" name="title" id="title" type="text" onBlur={(e) => {handleOnBlur(e)}} onChange={(e) => {handleOnChange(e)}} required/>
                </div>
                <div>
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>
                <div >
                    <span>Descripcion(*):</span> 
                    <textarea className="description-area" id="summary" name="summary"  cols="30" rows="3" onBlur={(e) => {handleOnBlur(e)}} onChange={(e) => {handleOnChange(e)}} required/>
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
                    Elegir dietas(*): 
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
                            <p>Dietas seleccionadas:</p>
                            <select className="lists" id="diets" name="diets" multiple="multiple" onChange={(e) => {handleOnBlur(e)}}>
                            </select>
                        </div>
                        <div>
                    {errors.diets && <span className="error-message">{errors.diets}</span>}
                    </div>
                    <br />
                        <div>
                            Paso a agregar:
                            <textarea className="description-area" cols="30" rows="2" id="stepAdd" name="stepAdd" type="text" />
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
                    {createOk &&<div className="messageOk">
                     <span>Se agrego correctamente</span>        
                    </div>}
                    <div>
                    <button id="button-submit" className="button-submit" type="submit" value="Crear" disabled > {Object.keys(errors).length !== 0 && <span className="globe">Revisar errores: {errors.title} {errors.summary} {errors.healtScore} {errors.diets}</span>}Crear</button>
                    </div>
                </div>
            </form>
        </div>
    )
}