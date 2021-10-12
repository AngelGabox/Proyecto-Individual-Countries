const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getActivities, addActivity } = require('../controllers/activityController')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/',  getActivities)
router.post('/add',  addActivity)

module.exports = router;