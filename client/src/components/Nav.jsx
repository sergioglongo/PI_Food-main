import { Link , NavLink} from 'react-router-dom';
import './nav.css'

export default function Nav() {


  return (
    <nav className="topnav">
      <div>
      <NavLink exact id='link' to={`/`}>
        Inicio
      </NavLink> 
      </div>      <div>
      <NavLink exact id='link' to={`/FoodHome/Recipes`} activeClassName='active'>
        Listado de Recetas
      </NavLink> 
      </div>
      <div>
      <NavLink exact id='link' to={`/FoodHome/RecipeCreate`}>
        Crear Receta
      </NavLink>
        </div>    
    </nav>

  )
}