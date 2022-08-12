import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from "react";
import {getRecipeById,emptyRecipeById} from '../redux/actions'

export default function CardDetail(params) {
    
    const dispatch = useDispatch()
    let {recipeId} = useParams()
    let indexDiet=1
    let indexStep=1
    
    useEffect(() => {
        dispatch(getRecipeById(recipeId))
        return (
            dispatch(emptyRecipeById())
        )
   },[dispatch])
   
   const recipeById = useSelector(state=> state.recipeById)
  
   return(
    <div>
        <h2>{recipeById.title}</h2>
        <img src={recipeById.image} alt="No disponible" />
        {/* <h5>{recipeById.summary}</h5> */}
        <h3 >Descripcion:</h3><p dangerouslySetInnerHTML={{ __html: recipeById.summary }}></p>
        <h3>Pasos</h3>
        <ul>
            {recipeById.steps?.map(step =>(
                <li key={indexStep++}>
                    {step.number} - 
                    {step.step}
                </li>
            ))}
        </ul>
        <h3>Dietas</h3>
        <ul>
            {recipeById.diets?.map(diet =>(
                <li key={indexDiet++}>
                    {diet}
                </li>
            ))}
        </ul>
    </div>
)

}