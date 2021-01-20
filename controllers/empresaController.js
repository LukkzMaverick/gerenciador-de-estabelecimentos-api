const MESSAGES = require('../util/objects/messages');
const { validationResult } = require('express-validator');
const Estabelecimento = require('../models/Estabelecimento');
const Localizacao = require('../models/Localizacao');
const Empresa = require('../models/Empresa');

module.exports = {

    async create(req, res){
        try {
            const {nome, tipo} = req.body
            const empresa = new Empresa({nome, tipo})
            if(empresa._id){
                await empresa.save()
                return res.status(201).send(empresa)
            }else{
                return res.status(404).send({ errors: [{ msg: MESSAGES.DATABASE_ERROR }] })
            }
        } catch (error) {
            console.error(error.message)
            return res.status(500).send({ errors: [{ msg: MESSAGES.INTERNAL_SERVER_ERROR }] })
        }
    },
    async index(req, res){
        try {
            const empresas = await Empresa.find({})
            if(empresas.length > 0){
                return res.status(200).send(empresas)
            }else{
                return res.status(404).send({ errors: [{ msg: MESSAGES['404_EMPRESAS'] }] })
            }
        } catch (error) {
            console.error(error.message)
            return res.status(500).send({ errors: [{ msg: MESSAGES.INTERNAL_SERVER_ERROR }] })
        }
    },
    async update(req, res){
        try {
            const {empresaId} = req.params
            const empresa = await Empresa.findByIdAndUpdate(empresaId, req.body, {new: true})
            if(empresa){
                return res.status(200).send(empresa)
            }else{
                return res.status(404).send({ errors: [{ msg: MESSAGES['404_EMPRESA'] }] })
            }
        } catch (error) {
            
        }
    },
    async delete(req, res){
        try {
            const {empresaId} = req.params
            const empresa = await Empresa.findByIdAndDelete(empresaId)
            if(empresa){
                return res.status(200).send(empresa)
            }else{
                return res.status(404).send({ errors: [{ msg: MESSAGES['404_EMPRESA'] }] })
            }
        } catch (error) {
            console.error(error.message)
            return res.status(500).send({ errors: [{ msg: MESSAGES.INTERNAL_SERVER_ERROR }] })
        }
    }


}