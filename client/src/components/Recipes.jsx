import { useEffect } from "react";
import { useSelector } from "react-redux"
import Recipe from './Recipe'
import "./recipes.css";

export default function Recipes() {

    const recipesFiltered = useSelector(state => state.recipesFiltered)
    const recipesPags = useSelector(state => state.recipesPags)
    const currentPage = useSelector(state => state.currentPage)
  
    return (
        <div>
            <div className="contenedor">
                    {
                        recipesPags[currentPage-1]?.map(recipe => {
                            return <Recipe
                                key={recipe.id}
                                id={recipe.id}
                                title={recipe.title}
                                diets={recipe.diets}
                                healtScore={recipe.healtScore}
                                image={recipe.image}
                            />
                        })
                    }
            </div>
        </div>
    )
}