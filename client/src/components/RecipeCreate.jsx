import {  useState ,useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import {setRecipeCreate, getAllDiets} from '../redux/actions'
import RecipeCreateShow from "./RecipeCreateShow";
import {onClickAddLogic,onClickQuitLogic,cleanData} from './RecipeCreateLogic'

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