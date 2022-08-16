import {  useState ,useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import {setRecipeCreate, getAllDiets} from '../redux/actions'
import {onClickAddLogic,onClickQuitLogic,cleanData} from './RecipeCreateLogic'
import './recipecreate.css'

export default function RecipeCreate() {



    const [recipeNew, setRecipeNew] = useState({
        title: "",
        summary: "",
        healtScore: "",
        steps: [],
        diets: [],
        image: ""
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    
    const [response, setResponse] = useState(null)
   
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllDiets())
    }, [dispatch])
    
    const dietsAll = useSelector(state=> state.dietsAll)

    function onChange(event) {
        setRecipeNew({
            ...recipeNew,
            [event.target.name]: event.target.value
        })
    }   

    function onSubmit(event) {
        event.preventDefault()
        setRecipeCreate(recipeNew)
        cleanData(dietsAll)
    }
    
 
    function onClickAdd(e) {//Quitar de select de dietas disponibles y pasarlo a lista de dietas elegidas
        let selDieta = document.getElementById("dietasAll")
        if (selDieta.options.length)
            setRecipeNew({
                ...recipeNew,
                diets: onClickAddLogic()
            })       
    }
    
    function onClickQuit(e) {//Quitar de select de dietas elegidas y pasarlo a lista de dietas disponibles
        let selDieta = document.getElementById("dietasSel")
        if (selDieta.options.length)
            setRecipeNew({
                ...recipeNew,
                diets: onClickQuitLogic()
            })
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
        setRecipeNew({
                ...recipeNew,
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
        setRecipeNew({
                ...recipeNew,
                steps: arrayStepsList
            })
    }
    
    function textValidation(target) {
        let input = document.getElementById(target.name)
        if (input.validity.valueMissing)
            setErrors({ ...errors, [target.name]: "El campo no puede ser vacio" })
        else
            if (input.validity.patternMismatch)
                setErrors({ ...errors, [target.name]: "Solo letras" })
        setRecipeNew({
            ...recipeNew,
            [target.name]: target.value
        })
    }

    function numberValidation(target) {
        let input = document.getElementById(target.name)
        if (input.validity.valueMissing)
            setErrors({ ...errors, [target.name]: "El campo no puede ser vacio" })
        else
            if (input.validity.patternMismatch)
                setErrors({ ...errors, [target.name]: "Solo numeros entre 1 y 100" })
        setRecipeNew({
            ...recipeNew,
            [target.name]: target.value
        })
    }

    return (
        <div className="form-container">
            <h2>Creacion de Receta</h2>
            <span>(* campos obligatorios)</span>
            <form id="formCreate" onSubmit={(e) => { onSubmit(e) }}>
                <div className="inputs-containers">
                    <span>Titulo(*):</span> 
                    <input className="input-validate" name="title" id="title" type="text" onChange={(e) => textValidation(e.target)} pattern="[a-zñA-ZÁÉÍÓÚáéíóúñÑ ]+(\s*[a-zñA-ZÁÉÍÓÚáéíóúñÑ ]*)*[a-zñA-ZÁÉÍÓÚáéíóúñÑ ]+$" required />
                    <span className="error-message">{errors.title}</span>
                </div>
                <div>
                    <span>Descripcion(*):</span> 
                    <input className="input-validate" id="summary" name="summary" type="text" onChange={(e) => textValidation(e.target)} required/>
                    <span className="error-message">{errors.summary}</span>
                </div>
                <div>
                    <span>Nivel Saludable(*):</span>
                    <input className="input-validate" id="healtScore" placeholder="80" name="healtScore"  type="text" onChange={(e) => numberValidation(e.target)} pattern="^[1-9]?[0-9]{1}$|^100$" required />
                    <span className="error-message">{errors.healtScore}</span>
                </div>
                <div>
                    URL de imagen:
                    <input id="image" name="image" type="text" onBlur={(e) => onChange(e)} />
                </div>
                <div>
                    <p>Dietas(*):</p>
                    <select id="dietasAll" name="dietasAll"  >
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
                        <div>
                            <p>Seleccion:</p>
                            <select id="dietasSel" name="diets" multiple="multiple">
                            </select>
                        </div>
                        <div>
                            Paso a agregar:
                            <input id="stepAdd" name="stepAdd" type="text" />
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

                    <input className="button" type="submit" value="Crear" />
                </div>
            </form>
        </div>
    )
}