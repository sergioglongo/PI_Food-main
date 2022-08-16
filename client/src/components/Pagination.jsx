import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage,setPagination} from '../redux/actions';
import './pagination.css'

export default function Pagination() {
    const recipePerPage=9
    let recipesFiltered = useSelector(state => state.recipesFiltered)
    let currentPage = useSelector(state => state.currentPage)
    let totalRecipes = recipesFiltered.length
 
    let dispatch = useDispatch()
    

   dispatch(setPagination(recipePerPage,totalRecipes,[...recipesFiltered]))
   
    function currentPageAsign(e) {
        dispatch(setCurrentPage(parseInt(e.target.value)))
    }
    
    let pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(totalRecipes / recipePerPage); i++) {
        pageNumbers.push(i)
    }
    
    function nextPage() {
        if((currentPage)<pageNumbers.length)
            {   
                dispatch(setCurrentPage(currentPage+1))
            }
    }   
    
    function previousPage() {
        if((currentPage)>1)
            {   
                dispatch(setCurrentPage(currentPage-1))
            }
    }

    return (
        <div>
            <div className='buttons-container'>
                <button className="navigation" value="anterior" onClick={() => previousPage()}>
                    <span className="globe">Pagina anterior</span>
                    <span>
                        {"<-"}
                    </span>
                </button>
                <div className='buttons-container'>
                    {pageNumbers.map(number => (
                        <div key={number}>
                            {number !== currentPage ?
                                <button value={number} className="navigation" onClick={(e) => currentPageAsign(e)}>
                                    {number}
                                </button> :
                                <button value={number} className="navigation selected" onClick={(e) => currentPageAsign(e)}>
                                    {number}
                                </button>
                            }
                        </div>))}
                </div>
                <button className="navigation" value="siguiente" onClick={() => nextPage()}>
                    <span className="globe">Pagina siguiente</span>
                    <span>
                        {"->"}
                    </span>
                </button>
            </div>
            <div className='total'>
                Total de recetas: {totalRecipes}
            </div>
        </div>
    );
}
