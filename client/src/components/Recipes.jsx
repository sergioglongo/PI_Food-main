import { useSelector } from "react-redux"
import Recipe from './Recipe'
import "./recipes.css";

export default function Recipes(params) {

    const recipes = useSelector(state => state.recipesFiltered)

    return (
        <div>
            <div className="contenedor">
                {/* <div className="card"> */}
                    {
                        recipes?.map(recipe => {
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
                {/* </div> */}
            </div>
        </div>
    )
}