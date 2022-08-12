import { Link } from 'react-router-dom';
import {getAllDiets, setDietsInitial} from '../redux/actions'


export default function Welcome() {
    
     return(
        <div>
            <h1>Welcome To PI Food for Henry</h1>
            <Link to = "/FoodHome/Recipes">
                <button onClick={()=> {
                    setDietsInitial() 
                    }
                    }>Iniciar</button>
            </Link>

        </div>
    )
}