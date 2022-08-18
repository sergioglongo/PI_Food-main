const { Router } = require('express');
const axios = require('axios')
const {v4: uuidv4} = require('uuid')
const {Recipe} = require('../db');
const {Diet} = require('../db');
const router = Router();
const { Op } = require("sequelize");
require('dotenv').config();
const { apikey ,dataLimit } = process.env;



// ruta que si recibe query responde con datos filtrados y si no devuelve todas las recipes
router.get("/", async(req,res,next) => {
    let findTitle = req.query.title
    let recipesFormatedDb = []
    let recipesDb = ""
    let recipesFiltered = []
    try{
        let recipeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&number=${dataLimit}&addRecipeInformation=true`)        
        if(findTitle){//si recibe query busca por nombre
            recipesDb = await Recipe.findAll({where:{title: { [Op.iLike]: `%${findTitle}%`}}})
            recipesFiltered =(recipeApi.data.results?.filter(recipe => recipe.title.toLowerCase().includes(findTitle.toLowerCase())))
        }
        else{// sino trae todas
            recipesDb = await Recipe.findAll({
                include:{
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes:[],
                    }
                }
            })
            recipesFiltered = recipeApi.data.results
        }

        if(recipesDb.length){
            recipesFormatedDb=recipesDb?.map(recipe => ({
                id: recipe.dataValues.id,
                title: recipe.dataValues.title,
                image: recipe.dataValues.image?recipe.dataValues.image:"https://thumbs.dreamstime.com/b/plato-vac%C3%ADo-de-la-visi%C3%B3n-superior-en-fondo-tabla-98527181.jpg",
                healtScore: recipe.dataValues.healtScore,
                diets: recipe.diets.map(diet => diet.name),
            }))
        }
        let recipesFormatedApi =(recipesFiltered?.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            healtScore: recipe.healthScore,
            diets: recipe.diets,
        })))
        let recipesFormatedAll = []
        if(recipesFormatedApi)
            recipesFormatedAll = [...recipesFormatedDb.concat(recipesFormatedApi)]
        else
        recipesFormatedAll = [...recipesFormatedDb]

        res.status(200).json(recipesFormatedAll)
    }
    catch(error){
            res.status(401).send(error)
    }
})

//Obtiene una receta a traves de id enviado en url con datos extendidos
//utilizada para vista de detalle de receta
router.get('/:id', async(req,res,next) => {
    const recipeId = req.params.id
    let recipeFormated = ""
    let regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    let result = regExp.test(recipeId)
    try{
    if(result)
    {
        let recipeDb = await Recipe.findByPk(recipeId,{
            include:{
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes:[],
                }
            }
        })
        if(recipeDb){
        recipeFormated ={
            id: recipeDb.dataValues.id,
            title: recipeDb.dataValues.title,
            summary: recipeDb.dataValues.summary,
            healtScore: recipeDb.dataValues.healtScore,
            steps: recipeDb.dataValues.steps,
            image: recipeDb.dataValues.image,
            diets: recipeDb.diets.map(diet => diet.name)
        }
        res.status(200).send(recipeFormated)
        }
        else{
            res.status(404).send(`Recipe con id:${recipeId} no encontrado`)
        }
    }
    else{
        let recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apikey}`)
        if(recipeApi.data){
        recipeFormated ={
            id: recipeApi.data.id,
            title: recipeApi.data.title,
            summary: recipeApi.data.summary,
            healtScore: recipeApi.data.healthScore,
            steps: (recipeApi.data.analyzedInstructions[0] && recipeApi.data.analyzedInstructions[0].steps && recipeApi.data.analyzedInstructions[0].steps?.map(element => {return {number:element.number,step:element.step}}))?(recipeApi.data.analyzedInstructions[0] && recipeApi.data.analyzedInstructions[0].steps && recipeApi.data.analyzedInstructions[0].steps?.map(element => {return {number:element.number,step:element.step}})):[],
            image: recipeApi.data.image,
            diets: recipeApi.data.diets
            }
            res.status(200).json(recipeFormated)
        }

    }
    }catch(error){
        if(error.message === "Request failed with status code 404")
            res.status(404).send(`Recipe con id:${recipeId} no encontrado`)
        else
            res.status(401).send(error)
    }
    
})

//creacion de Recipe en database
router.post('/nuevo', async (req,res,next) => {
    const recipe = req.body //me llega un objeto pasado transformado por json
    if(recipe.title && recipe.summary){
        try{
            const recipeRecived = {
                title: recipe.title,
                summary: recipe.summary,
                healtScore: recipe.healtScore?recipe.healtScore:0,
                steps: recipe.steps?recipe.steps:[],
                image: recipe.image?recipe.image:"https://www.lutherplace.org/wp-content/uploads//2013/12/HE_empty-plate-thinkstock_s4x3_lg.jpg"
            }
            const recipeCreated = await Recipe.create(recipeRecived)
            let dietDb = await Diet.findAll({ where: {name: recipe.diets}})
            recipeCreated.addDiet(dietDb)
            console.log("Creada la receta en back");
            res.status(201).send(recipeCreated.id)
        }
        catch(error){
            res.status(401).send("No se pudo crear la receta, error:", error)
        }
        
    }else{
        res.status(402).send("Datos incompletos")
    }
})



module.exports = router;