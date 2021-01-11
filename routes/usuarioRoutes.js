const {Router} = require('express')
const usuarioController = require('../controllers/usuarioController')
const { validatorLogin,validatorRegister } = require('../util/arrays/validators/authValidators')

const router = Router()

router.post('/login',validatorLogin, usuarioController.login)
router.post('/register',validatorRegister, usuarioController.register)

module.exports = router