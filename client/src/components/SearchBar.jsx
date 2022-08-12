import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRecipesFiltered ,  getAllRecipes,setSearchtext} from '../redux/actions'


export default function SearchBar() {
 
    const [search,setSearch] = useState("")
    let searchText = useSelector(state => state.searchText)
 
    const dispatch = useDispatch()
    
    let recipesAll = useSelector(state => state.recipesAll)
    useEffect(()=>{
        console.log(recipesAll);    
        if(recipesAll.length === 0){
            dispatch(getAllRecipes())
        }
    },[dispatch])

    recipesAll = useSelector(state => state.recipesAll)
    
    function onChange(e) {
        dispatch(setSearchtext(e.target.value))
    }
    
    const recipesFiltered = recipesAll.filter(item => {
        if(searchText)
        return item.title.toLowerCase().includes(searchText.toLowerCase())
        else
        return item
    })
    
    dispatch(setRecipesFiltered(recipesFiltered))
    
 
    return (
        <div>
        <h3>Buqueda</h3>
        <input type="text"  id="buscar" placeholder="Buscar" onChange={(e)=>{onChange(e)}}/>
    </div>

    )
}