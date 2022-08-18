

export const getAllRecipes = () => async dispatch => {
  try{
  return await fetch(`http://localhost:3001/recipe/`)
    .then(r => r.json())
    .then(data => dispatch({ type: "GET_ALL_RECIPES", payload: data }))
    .catch(error=> console.log('Error de fetch API'))
  }
  catch(error){
    console.log('Error de try API');
    throw 'Error de API'
  }
}

export function getRecipeById(data) {
  return async function (dispatch) {
    await fetch(`http://localhost:3001/recipe/${data}`)
      .then(r => r.json())
      .then(result => dispatch({ type: "GET_RECIPE_BY_ID", payload: result }))
  }
}

export function setRecipesFiltered(data) {
  return (
    {
      type: "SET_RECIPES_FILTERED",
      payload: data
    }
  )
}

export async function setRecipeCreate(data) {
  return await fetch('http://localhost:3001/recipe/nuevo', {
    method: 'POST',
    body: JSON.stringify(data), 
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
//  .then(res => JSON.parse(res))
    .catch(error => console.error('Error:', error))

}

export const getAllDiets = () => async dispatch => {
  return await fetch(`http://localhost:3001/diet/`)
    .then(r => r.json())
    .then(data => dispatch({ type: "GET_ALL_DIETS", payload: data }))
}

export async function setDietsInitial() {
  let diets = await fetch(`http://localhost:3001/diet/`).then(r => r.json())
  if (diets.length === 0) {
    console.log("Dietas creadas incialmente");
    return async function (dispatch) {
      await fetch('http://localhost:3001/diet/precarga', { method: 'POST' })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
      }
  } else{
    console.log("Dietas ya estan generadas, no se deben agregar nuevamente");
  }
}

export function emptyRecipeById() {
  return   ( {
    type: "EMPTY_RECIPE_BY_ID",
  }
  )
}

export function setRecipesPage(data) {
  return (
    {
      type: "SET_RECIPES_PAGE",
      payload: data
    }
  )
}

export function setCurrentPage(data) {
  return (
    {
      type: "SET_CURRENT_PAGE",
      payload: data
    }
  )
}

export function setSearchtext(data) {
  return (
    {
      type: "SET_SEARCHTEXT",
      payload: data
    }
  )
}

export function setPagination(recipePerPage,totalRecipes,recipesFiltered) {
  let recipesPaginates = []
  for(let page = 1;recipesFiltered[0]; page){
    const indexLastRecipe = page * recipePerPage
    const indexFirstRecipe = indexLastRecipe - recipePerPage
    recipesPaginates.push( recipesFiltered.splice(indexFirstRecipe,indexLastRecipe))
  }
   return (
    {
      type: "SET_PAGINATION",
      payload: recipesPaginates
    }
  )
}