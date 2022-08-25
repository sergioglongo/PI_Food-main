const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RecipeRoutes = require('./recipe')
const DietRoutes = require('./diet')
const AlumnoRoutes = require('./alumno')
const CursoRoutes = require('./curso')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipe', RecipeRoutes)
router.use('/diet', DietRoutes)
router.use('/alumno' , AlumnoRoutes)
router.use('/curso' , CursoRoutes)

module.exports = router;