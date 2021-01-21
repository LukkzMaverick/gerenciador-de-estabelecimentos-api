const {Router} = require('express')
const empresaController = require('../controllers/empresaController')
const auth = require('../middleware/auth')

const router = Router()

router.post('/', auth, empresaController.create)
router.get('/', auth, empresaController.index)
router.patch('/:empresaId', auth, empresaController.update)
router.delete('/:empresaId', auth, empresaController.delete)

module.exports = router