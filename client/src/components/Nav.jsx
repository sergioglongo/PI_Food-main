import { Link } from 'react-router-dom';

export default function Nav() {


  return (
    <nav className="navbar">
      <div>
      <Link to={`/`}>
        Inicio
      </Link> 
      </div>      <div>
      <Link to={`/FoodHome/Recipes`}>
        Listado de Recetas
      </Link> 
      </div>
      <div>
      <Link to={`/FoodHome/RecipeCreate`}>
        Crear Receta
      </Link>
        </div>    
    </nav>

  )
}