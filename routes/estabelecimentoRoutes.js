const {Router} = require('express')
const estabelecimentoController = require('../controllers/estabelecimentoController')
const auth = require('../middleware/auth')

const router = Router()

router.post('/', auth, estabelecimentoController.create)
router.get('/',auth, estabelecimentoController.getByLoggedUser)
router.get('/:localizacaoId',auth, estabelecimentoController.getByLocalizacaoAndLoggedUser)
router.get('/localizacoes/byLoggedUser',auth, estabelecimentoController.getLocalizacoesByUser)
router.get('/getOne/:estabelecimentoId',auth, estabelecimentoController.getOneByLoggedUser)
router.put('/:estabelecimentoId', auth, estabelecimentoController.update)
router.delete('/:estabelecimentoId',auth,estabelecimentoController.delete)

module.exports = router