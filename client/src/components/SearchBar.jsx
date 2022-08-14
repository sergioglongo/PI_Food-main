import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRecipesFiltered, getAllRecipes, setSearchtext, getAllDiets, setCurrentPage } from '../redux/actions'


export default function SearchBar() {
    const dispatch = useDispatch()

    let searchText = useSelector(state => state.searchText)
    const initialState = {
        dietas: "ALL",
        ordenarPor: "SIN",
        AscDes: "1",
        origen: "ALL",
    }

    let dietsAll = useSelector(state => state.dietsAll)
    let [selectsState, setSelectsState] = useState(initialState)
    let recipesAll = useSelector(state => state.recipesAll)

    useEffect(() => {
        if (recipesAll.length === 0) {
            dispatch(getAllRecipes())
        }
        if (dietsAll.length === 0)
            dispatch(getAllDiets())
    }, [dispatch])

    // recipesAll = useSelector(state => state.recipesAll)

    function onChange(e) {
        dispatch(setSearchtext(e.target.value))
    }

    const handledOnClick = (event) => {
        setSelectsState({
            ...selectsState,
            [event.target.name]: event.target.value
        })
    }

     useEffect(() => {
        dispatch(setRecipesFiltered(processRecipes()))
        dispatch(setCurrentPage(1))
    }, [selectsState,searchText,recipesAll])


    function inputsClear() {
            document.getElementById("selDietas").value = "ALL"
            document.getElementById("ordenarPor").value = "SIN"
            document.getElementById("AscDes").value = "1"
            document.getElementById("selOrigen").value = "ALL"
            setSelectsState(initialState)
            document.getElementById("buscar").value = ""
            dispatch(setSearchtext(""))
    }

    function processRecipes() {
        let recipedProccesed = recipesAll?.filter(recipe => {
            if (searchText)
            {   
                return recipe.title.toLowerCase().includes(searchText.toLowerCase())
            }
            else
            return recipe
        })

        recipedProccesed = recipedProccesed.filter(recipe => {
            let regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i //formato uuid
            switch (selectsState['origen']) {
                case "DB": if (regExp.test(recipe.id)) { // si cumple con la expresion regular es de la DB
                    if (filterDiet(recipe)) return recipe // Evalua si incluye la dieta seleccionada
                }
                break
                case "API": if (!regExp.test(recipe.id)) { //si no cumple con la expresion regular es de la API
                    if (filterDiet(recipe)) return recipe // Evalua si incluye la dieta seleccionada
                }
                break
                default: if (filterDiet(recipe)) return recipe // Evalua si incluye la dieta seleccionada
            } // fin del switch origen
        })// fin del recipesAll.filter

        switch (selectsState['ordenarPor']) {
            case 'TIT': return ordenar("title", recipedProccesed)
            case 'SCO': return ordenar("healtScore", recipedProccesed)
            default: return recipedProccesed
        }//fin del switch ordenarPor
    }//fin processRecipe

    function filterDiet(recipe) {
        if (selectsState['dietas'] === 'ALL')
            return recipe
        if (recipe.diets.includes(selectsState['dietas']))
            return recipe
    }

    function ordenar(por, recipedProccesed) {

        if (selectsState['AscDes'] === '1')
            return recipedProccesed.sort((recipe1, recipe2) => {
                if (recipe1[por] < recipe2[por])
                    return -1
                else if (recipe1[por] > recipe2[por]) {
                    return 1
                }
                else
                    return 0
            })
        else
            return recipedProccesed.sort((recipe1, recipe2) => {
                if (recipe1[por] > recipe2[por])
                    return -1
                else if (recipe1[por] < recipe2[por])
                    return 1
                else
                    return 0
            })


    }
    return (
        <div>
            <h3>Buqueda</h3>
            <input type="text" id="buscar" placeholder="Buscar" onChange={(e) => { onChange(e) }} />
            <div>
                Dietas:
                <select name="dietas" id="selDietas" onChange={(e) => handledOnClick(e)}>
                    <option key="0" value="ALL">Todas</option>
                    {
                        dietsAll.map((element, i) => (
                            <option key={element.id} value={element.name}>{element.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                Ordenar por:
                <select name="ordenarPor" id="ordenarPor" onChange={(e) => handledOnClick(e)}>
                    <option key="0" value="SIN">Sin ordenar</option>
                    <option key="1" value="TIT">Titulo Receta</option>
                    <option key="2" value="SCO">Nivel saludable</option>
                </select>
            </div>            <div>
                Orden:
                <select name="AscDes" id="AscDes" onChange={(e) => handledOnClick(e)}  >
                    <option key="1" value="1">Ascendente</option>
                    <option key="0" value="0">Descendente</option>
                </select>
            </div>
            <div>
                Origen:
                <select name="origen" id="selOrigen" onChange={(e) => handledOnClick(e)}>
                    <option key="0" value="ALL">Ambos</option>
                    <option key="1" value="API">API</option>
                    <option key="2" value="DB">Base Datos</option>
                </select>
                <button name="reset" value="resetear" onClick={() => {
                    inputsClear()
                }}>Resetear</button>
            </div>
        </div>

    )
}