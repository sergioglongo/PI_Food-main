import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getRecipeById, emptyRecipeById } from '../redux/actions'
import Recipe from './Recipe'
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
            <div className="header">
                <div className='picture-container'>
                    <img src={recipeById.image} alt="no disponible" />
                </div>
                <div className='info-container'>
                    <h3 className='recipe-title'>{recipeById.title}</h3>
                    <div className='star-container'>
                        <span >{recipeById.healtScore}</span>
                        <img src='https://www.seekpng.com/png/full/38-387704_star-vector-png-transparent-image-star-vector-png.png' alt="" />
                    </div>
                    <div className='recipe-info'>
                        <div className="description-title">Tipos de dietas</div>
                        <ul className='diets-list'>
                            {recipeById.diets?.map(diet => (
                                <li key={indexDiet++}>
                                    {diet}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            <div className="recipe-content">
                <h3 className="description-title">Descripción</h3>
                <div className="description">
                    <p className="recipe-desc" dangerouslySetInnerHTML={{ __html: recipeById.summary }}></p>
                    <br />
                </div>
                <h3 className="description-title">Pasos</h3>
                <p className="recipe-steps">
                    {recipeById.steps?.map(step => (
                        <span className="recipe-step" key={indexStep++}>
                            {step.number} - {step.step}
                            <br />
                        </span>
                    ))}
 
                </p>
            </div>
        </div>
    )

}