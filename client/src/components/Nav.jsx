import { Link } from 'react-router-dom';
import './nav.css'

export default function Nav() {


  return (
    <nav className="topnav">
      <div>
      <Link id='link' to={`/`}>
        Inicio
      </Link> 
      </div>      <div>
      <Link id='link' to={`/FoodHome/Recipes`}>
        Listado de Recetas
      </Link> 
      </div>
      <div>
      <Link id='link' to={`/FoodHome/RecipeCreate`}>
        Crear Receta
      </Link>
        </div>    
    </nav>

  )
}