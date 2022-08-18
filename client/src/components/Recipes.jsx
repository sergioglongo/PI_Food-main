import { useSelector } from "react-redux"
import Recipe from './Recipe'
import "./recipes.css";
import { useLocation, useHistory } from "react-router-dom";
import Loading from './Loading'

export default function Recipes() {

    const recipesFiltered = useSelector(state => state.recipesFiltered)
    const recipesPags = useSelector(state => state.recipesPags)
    const currentPage = useSelector(state => state.currentPage)
  
    let history = useHistory()
    if(recipesPags[0]?.map(e => e.id)[0] === 0)
        history.push('/FoodHome/error404')
 
    return (
        <div>
            
            {!recipesPags.length ? (
        <Loading />
      ) : (
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
      )}
        </div>
    )

}