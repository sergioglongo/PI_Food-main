const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RecipeRoutes = require('./recipe')
const DietRoutes = require('./diet')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipe', RecipeRoutes)
router.use('/diet', DietRoutes)

module.exports = router;