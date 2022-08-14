import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage,setPagination} from '../redux/actions';

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
            <nav>
                <div>
                    Total de recetas: {totalRecipes}
                </div>
                <div>
                    <button value="anterior" onClick={() => previousPage()}>anterior</button>
                </div>
                <div>
                    {pageNumbers.map(number => (
                        <button value={number} key={number} onClick={(e) => currentPageAsign(e)}>{number}</button>
                    ))}
                </div>
                <div>
                    <button value="siguiente" onClick={() => nextPage()}>siguiente</button>
                </div>
            </nav>
        </div>
    );
}
