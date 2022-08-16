import { Link } from 'react-router-dom';
import { setDietsInitial } from '../redux/actions'
import './welcome.css'

export default function Welcome() {

    return (
        <div className='welcome-container' >
            <div className='elements-container'>
                <h1 className='welcome-title'>Welcome To PI Food for Henry</h1>
                <Link to="/FoodHome/Recipes">
                    <button className='button-welcome' onClick={() => {
                        setDietsInitial()
                    }
                    }>Iniciar</button>
                </Link>
            </div>
        </div>
    )
}