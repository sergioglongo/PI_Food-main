import {  useState ,useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import {setRecipeCreate, getAllDiets} from '../redux/actions'
import RecipeCreateShow from "./RecipeCreateShow";

export default function RecipeCreate() {

  const [recipeNew,setRecipeNew] = useState({title:"",
                                            summary:"",
                                            healtScore:"",
                                            steps:[],
                                            diets:[],
                                            image:""
                                            })

    
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
        cleanData()
    }
    
    function onClickAdd(e) {//Quitar de select de dietas disponibles y pasarlo a lista de dietas elegidas
        let selDieta = document.getElementById("dietasAll")
        let itemSel = document.getElementById("dietasAll").selectedIndex
        let valueItem = selDieta[itemSel]
        let arrayDietsList =[]
        selDieta.removeChild(selDieta[itemSel])
        let selDietaAdd = document.getElementById("dietasSel")
        selDietaAdd.appendChild(valueItem)
        for (let index = 0; selDietaAdd.options[index]; index++)
        arrayDietsList.push(selDietaAdd.options[index].value)
        setRecipeNew({
            ...recipeNew,
            diets: arrayDietsList
        })       
    }
    
    function onClickQuit(e) {//Quitar de select de dietas elegidas y pasarlo a lista de dietas disponibles
        let selDieta = document.getElementById("dietasSel")
        let itemSel = document.getElementById("dietasSel").selectedIndex
        let valueItem = selDieta[itemSel]
        let arrayDietsList =[]
        console.log(valueItem)
        selDieta.removeChild(selDieta[itemSel])
        let selDietaAdd = document.getElementById("dietasAll")
        selDietaAdd.appendChild(valueItem)
        for (let index = 0; selDieta.options[index]; index++)
        arrayDietsList.push(selDieta.options[index].value)
        setRecipeNew({
            ...recipeNew,
            diets: arrayDietsList
        })                               
    }
    
    function cleanData() {
        let dietasSel = document.getElementById("dietasSel")
        let dietasAll = document.getElementById("dietasAll")
        document.getElementById("formCreate").reset() //blanquea campos
        while (dietasSel.options[0])// blanquea combo seleccionadas
            dietasSel.removeChild(dietasSel[0])
        while (dietasAll.options[0])// blanquea combo de dietas
            dietasAll.removeChild(dietasAll[0])// carga nuevamente dietas
            let option = ""
            dietsAll.map((element, i) => {
                option = document.createElement('option')
                option.value = element.name
                option.text = element.name
                option.key = element.id
            dietasAll.appendChild(option)
            return option
        })

    }
    return(
        <div>
            <RecipeCreateShow
                dietsAll={dietsAll}
                onChange={onChange}
                onSubmit={onSubmit}
                onClickAdd={onClickAdd}
                onClickQuit={onClickQuit}
            />
        </div>
    )
}