const { Router } = require('express');
const {Diet} = require('../db')
const {Recipe} = require('../db')
const router = Router();
const axios = require('axios')
require('dotenv').config();
const { apikey ,dataLimit } = process.env;

//Obtener todas las dietas
router.get('/', async (req,res,next) => {
    try{
        await Diet.findAll()
        .then(async diets => {
            if(diets)
                res.send(diets)
            else{
                res.send("Ninguna dieta encontrada",next())
            }
        })           
    }catch(error){
        send.status(404).send(error)
    }
})

router.get('/diets/:recipeId', async (req, res, next) => {
    const { recipeId } = req.params
    let regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    let result = regExp.test(recipeId)

    try {
        if (result) {
            let dietsRecipeDb = await Recipe.findByPk(recipeId, {
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            })//obtengo la receta
                .then(recipe => {
                    return {
                        diets: recipe.diets.map(diet => diet.name)
                    }//doy formato a las dietas para que coicidan con API
                })//fin de obtencion de dietas de db por idRecipe
            res.status(200).send(dietsRecipeDb)
        }
        else {
            let recipeByIdApi = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apikey}`)
            if (recipeByIdApi.data) {
                let dietsRecipeApi = {
                    diets: recipeByIdApi.data.diets
                }
                res.status(200).send(dietsRecipeApi)
            }
        }
    }
    catch (error) {
        res.status(401).send(error)
    }

})

router.post('/precarga', async (req,res,next) => {
    const diets = ["gluten free","ketogenic","vegetarian","lacto-vegetarian","ovo-vegetarian","vegan","pescetarian","paleo","primal","low FODMAP","whole 30"] //me llega un objeto pasado transformado por json
    let dietsApi =[]
    let dietsObj =[]
    try{
        let recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&addRecipeInformation=true&number=${dataLimit}`)        
        recipesApi.data.results?.map(recipe => 
            recipe.diets.map(diet => {
                    if(!dietsApi.includes(diet))
                        dietsApi.push(diet)
                }))
        dietsApi.map(diet=> {
            if(!diets.includes(diet))
                diets.push(diet)
        })
        diets.sort()
        diets.map(diet => dietsObj.push({name:diet}))
        await Diet.bulkCreate(dietsObj).then(res.status(200).send(dietsObj))
    }catch(error){
        res.status(403).send(next())
     }
})


module.exports = router;