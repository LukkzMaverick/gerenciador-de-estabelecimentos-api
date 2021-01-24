const {Router} = require('express')
const estabelecimentoController = require('../controllers/estabelecimentoController')
const auth = require('../middleware/auth')
const {validatorCadastrarEstabelecimento} = require('../util/arrays/validators/estabelecimentoValidators')
const router = Router()

router.post('/:empresaId',validatorCadastrarEstabelecimento, auth, estabelecimentoController.create)
router.get('/:empresaId',auth, estabelecimentoController.getByEmpresa)
router.get('/byLocalizacaoAndEmpresa/:localizacaoId/:empresaId',auth, estabelecimentoController.getByLocalizacaoAndEmpresa)
router.get('/getOne/:estabelecimentoId',auth, estabelecimentoController.getOne)
router.get('/', auth, estabelecimentoController.getAll)
router.get('/byLocalizacao/:localizacaoId', auth, estabelecimentoController.getByLocalizacao)
router.get('/by/logged/user', auth, estabelecimentoController.getByLoggedUser)
router.put('/update/:estabelecimentoId/:empresaId', auth, estabelecimentoController.update)
router.delete('/:estabelecimentoId',auth,estabelecimentoController.delete)

module.exports = router