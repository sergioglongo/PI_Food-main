const { Router } = require('express');

const { Alumno } = require('../db');
const { Curso } = require('../db');

const router = Router();



router.get("/all", async (req, res, next) => {
    let cursoDb = await Curso.findAll()
    res.status(200).json(cursoDb)
})



module.exports = router;