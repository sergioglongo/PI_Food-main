const initialState = {
    recipesAll: [],
    recipesFiltered: [],
    recipesPags: [],
    currentPage: 1,
    recipeById: {},
    dietsAll: [],
    searchText: "",
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case "GET_ALL_RECIPES":
            return {
                ...state,
                recipesAll: action.payload
            }
        case "SET_RECIPES_FILTERED":
            return {
                ...state,
                recipesFiltered: action.payload
            }
        case "GET_RECIPE_BY_ID":
            return {
                ...state,
                recipeById: action.payload
            }
        case "EMPTY_RECIPE_BY_ID":
            return {
                ...state,
                recipeById: {}
            }
        case "GET_ALL_DIETS":
            return {
                ...state,
                dietsAll: action.payload
            }
        case "SET_INITIAL_DIETS":
            return {
                ...state,
                dietsAll: action.payload
            }
        case "SET_RECIPES_PAGE":
            return {
                ...state,
                recipesPage: action.payload
            }
        case "SET_PAGINATION":
            return{
                ...state,
                recipesPags : action.payload
            }   
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.payload
            }
        case "SET_SEARCHTEXT":
            return {
                ...state,
                searchText: action.payload
            }
        default: return state
    }
}