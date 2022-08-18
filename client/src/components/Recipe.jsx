import { Link } from 'react-router-dom';
import "./recipe.css";

export default function Recipe(props) {
    let index = 0;
    return (
        <div className='card'>
            <div className='pictureContainer'>
                <img className='picture' src={props.image} alt="no disponible" />
                <div className='starContainer'>
                    <span className='score'>{props.healtScore}</span>
                    <img className='star' src='https://www.seekpng.com/png/full/38-387704_star-vector-png-transparent-image-star-vector-png.png' alt="" />
                </div>
            </div>
            <div className='info-container'>
                <h3 className='title'>{props.title}</h3>
                <div className='info'>
                    <div>Tipos de dietas</div> 
                    <ul className='list'>
                        {props.diets?.map(diet => (

                            <li key={index++}>
                                {diet}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
                <Link to={`/FoodHome/RecipeDetail/${props.id}`}>
                    <button type="button" className='button'>
                        Detalles
                    </button>
                </Link>
        </div>
    )
}