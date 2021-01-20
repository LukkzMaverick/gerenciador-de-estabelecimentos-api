const Empresa = require('../models/Empresa')

async function removerLocalizacaoDeEmpresa(empresaId, localizacaoId){
    const empresa = await Empresa.findByIdAndUpdate(empresaId, 
        { $pull: { localizacao: localizacaoId} }, {new: true} )
    return empresa
}

async function adicionarLocalizacaoDeEmpresa(empresaId, localizacaoId){
    const empresa = await Empresa.findByIdAndUpdate(empresaId, 
        { $addToSet: { localizacao: localizacaoId} }, {new: true} )
    return empresa
}

module.exports = {
    adicionarLocalizacaoDeEmpresa,
    removerLocalizacaoDeEmpresa
}