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
            <div className="big">
                <article className="recipe">
                    <div className="pizza-box">
                    <div className="title-content">
                    <h1 className="recipe-title">{recipeById.title}</h1>
                    </div>
                        <img src={recipeById.image} width="556" height="370" alt=""></img>
                    </div>
                    <div className="recipe-content">


                        <p className="recipe-metadata">
                        </p>
                        <h3>Descripción</h3>
                        <p className="recipe-desc" dangerouslySetInnerHTML={{ __html: recipeById.summary }}></p>
                        <h3>Pasos</h3>
                        <p className="recipe-steps">
                        {recipeById.steps?.map(step => (
                            <span className="recipe-step" key={indexStep++}>
                                {step.number} - {step.step}
                            </span>
                        ))}
                        </p>
                        <h3>Dietas</h3>
                        <p className="recipe-tags">
                        {recipeById.diets?.map(diet => (
                            <span className="recipe-tag" key={indexDiet++}>
                                {diet}
                            </span>
                        ))}
                        </p>
                    </div>
                </article>
            </div>

       </div>
    )

}