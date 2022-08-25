const { Router } = require('express');

const { Alumno } = require('../db');
const { Curso } = require('../db');

const router = Router();



router.get("/curso", async (req, res, next) => {
    let alumnoDb = await Alumno.findAll({
        include:{
            model: Curso,
            attributes: ['nombreCurso'],
            // through: {
            //     attributes:[],
            // }
        }
    })
    res.status(200).json(alumnoDb)
})



module.exports = router;