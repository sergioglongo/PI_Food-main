import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getRecipeById, emptyRecipeById } from '../redux/actions'
import './recipedetail.css'

export default function RecipeDetail(params) {

    const dispatch = useDispatch()
    let indexDiet = 1
    let indexStep = 1
    let { recipeId } = useParams()

    useEffect(() => {
        dispatch(getRecipeById(recipeId))
        return (
            dispatch(emptyRecipeById())
        )
    }, [dispatch, recipeId])

    const recipeById = useSelector(state => state.recipeById)

    return (
        <div className="recipe-container">
            <div className="recipe">
                <div className="recipe-image">
                    <img src={recipeById.image} alt="No disponible" />
                </div>
                <div className="recipe-content">
                    <h2 className="recipe-title">{recipeById.title}</h2>
                    <p className="summary" dangerouslySetInnerHTML={{ __html: recipeById.summary }}></p>
                <div className="steps">
                    <h3>Pasos</h3>
                    <ul>
                        {recipeById.steps?.map(step => (
                            <li key={indexStep++}>
                                {step.number} -
                                {step.step}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="diets">
                    <h3 className="diets-title">Dietas</h3>
                    <ul>
                        {recipeById.diets?.map(diet => (
                            <li key={indexDiet++}>
                                {diet}
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
        </div>
    )

}