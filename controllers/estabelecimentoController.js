const MESSAGES = require('../util/objects/messages');
const { validationResult } = require('express-validator');
const Estabelecimento = require('../models/Estabelecimento');
const Localizacao = require('../models/Localizacao');
const capitalizeFirstLetter = require('../util/functions/capitalizeFirstLetter');

module.exports = {
    async create(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            let { nome, localizacao } = req.body
            const user = req.user.id
            const localizacaoBefore = await Localizacao.
                findOne({$and: [
                    { usuario: user },
                    { nome: { $regex: new RegExp('^' + localizacao + '$', "i") } }
                ]})
            let localizacaoInserted
            if (!localizacaoBefore) {
                localizacaoInserted = new Localizacao(
                    { nome: capitalizeFirstLetter(localizacao), usuario: user })
                await localizacaoInserted.save()
            }

            const estabelecimento = new Estabelecimento(
                {
                    nome, usuario: user, localizacao: localizacaoBefore ?
                        localizacaoBefore._id : localizacaoInserted._id
                })

            if (estabelecimento._id) {
                await estabelecimento.save().then(t => t.populate
                    ({ path: 'localizacao', select: 'nome' }).execPopulate())
                res.status(201).send(estabelecimento)
            } else {
                return res.status(500).send({ errors: [{ msg: MESSAGES.DATABASE_ERROR }] })
            }
        } catch (error) {
            console.error(error.message)
            return res.status(500).send({ errors: [{ msg: MESSAGES.INTERNAL_SERVER_ERROR }] })
        }
    },

    async update(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const id = req.params.estabelecimentoId
            const userId = req.user.id
            let { nome, localizacaoId, nomeLocalizacao } = req.body

            let localizacao
            let estabelecimento
            if (localizacaoId && nomeLocalizacao) {
                const nomeLocalizacaoAlreadyExists = await Localizacao.
                    findOne({$and: [
                        { usuario: userId },
                        { nome: { $regex: new RegExp('^' + nomeLocalizacao + '$', "i") } }
                    ]})
                if (!nomeLocalizacaoAlreadyExists) {
                    const localizacaoBefore = await Localizacao.
                    findOne({$and: [
                        { usuario: userId },
                        { nome: { $regex: new RegExp('^' + nomeLocalizacao + '$', "i") } }
                    ]})
                    if(!localizacaoBefore){
                        localizacao = await new Localizacao
                        ({usuario: userId, nome: nomeLocalizacao})
                        await localizacao.save()
                        if(localizacao._id){
                            let localizacaoIdAntiga = localizacaoId
                            localizacaoId = localizacao._id
                            let estabelecimentos = await Estabelecimento.find(
                                { localizacao: localizacaoIdAntiga })
                            if(estabelecimentos.length <= 1){
                                await Localizacao.findByIdAndDelete(localizacaoIdAntiga)
                            }
                        }
                    }
                }
            }
            const update = { nome, localizacaoId }
            if (nome) {
                estabelecimento = await Estabelecimento.findByIdAndUpdate
                    (id, update, { new: true })
                estabelecimento.localizacao = localizacaoId
                await estabelecimento.save().then(t => t.populate
                    ({ path: 'localizacao', select: 'nome' }).execPopulate())
            }
            if (estabelecimento) {
                return res.status(200).send(estabelecimento)
            } else if (localizacao) {
                if(!estabelecimento){
                    estabelecimento = await Estabelecimento.findById(id)
                    .populate({ path: 'localizacao', select: 'nome' })
                }
                if (estabelecimento) {
                    return res.status(200).send(estabelecimento)
                }
            }
            return res.status(404).send({
                errors: [
                    { msg: MESSAGES['404_ESTABELECIMENTO'], param: '_id' }]
            })

        } catch (error) {
            console.error(error.message)
            return res.status(500).send({ errors: [{ msg: MESSAGES.INTERNAL_SERVER_ERROR }] })
        }
    },
    async getByLocalizacaoAndLoggedUser(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            console.log(req.params)
            let { localizacaoId } = req.params
            const userId = req.user.id

            let estabelecimentos = await Estabelecimento.find({
                $and: [
                    { usuario: userId },
                    { localizacao: localizacaoId }
                ]
            }).populate({ path: 'localizacao', select: 'nome' })
            console.log(estabelecimentos)

            if (estabelecimentos.length > 0) {
                return res.status(200).send(estabelecimentos)
            } else {
                return res.status(404).send({
                    errors: [
                        { msg: MESSAGES.ESTABELECIMENTO_EMPTY_LIST }]
                })
            }
        } catch (error) {
            console.error(error.message)
            return res.status(500).send({ errors: [{ msg: MESSAGES.INTERNAL_SERVER_ERROR }] })
        }
    },
    async getByLoggedUser(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const userId = req.user.id

            let estabelecimentos = await Estabelecimento.find({ usuario: userId })
            .populate({ path: 'localizacao', select: 'nome' })

            if (estabelecimentos.length > 0) {
                return res.status(200).send(estabelecimentos)
            } else {
                return res.status(404).send({
                    errors: [
                        { msg: MESSAGES.ESTABELECIMENTO_EMPTY_LIST }]
                })
            }
        } catch (error) {
            console.error(error.message)
            return res.status(500).send({ errors: [{ msg: MESSAGES.INTERNAL_SERVER_ERROR }] })
        }
    },
    async getOneByLoggedUser(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const userId = req.user.id
            const estabelecimentoId = req.params.estabelecimentoId
            let estabelecimento = await Estabelecimento.findOne({$and: [
                { usuario: userId },
                { _id: estabelecimentoId }
            ]}).populate({ path: 'localizacao', select: 'nome' })
            
            if (estabelecimento) {
                return res.status(200).send(estabelecimento)
            } else {
                return res.status(404).send({
                    errors: [
                        { msg: MESSAGES['404_ESTABELECIMENTO'] }]
                })
            }
        } catch (error) {
            console.error(error.message)
            return res.status(500).send({ errors: [{ msg: MESSAGES.INTERNAL_SERVER_ERROR }] })
        }
    },
    async delete(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const id = req.params.estabelecimentoId
            const estabelecimentoDeletado = await Estabelecimento.findByIdAndDelete(id)
            let estabelecimentos = true
            if(estabelecimentoDeletado){
                estabelecimentos = await Estabelecimento.find(
                    { localizacao: estabelecimentoDeletado.localizacao })
            }
            
            if(estabelecimentos.length === 0){
                await Localizacao.findByIdAndDelete(estabelecimentoDeletado.localizacao)
            }

            if (estabelecimentoDeletado) {
                return res.status(200).send(estabelecimentoDeletado)
            } else {
                return res.status(404)
                    .send({ msg: MESSAGES['404_ESTABELECIMENTO'], param: '_id' })
            }
        } catch (error) {
            console.error(error.message)
            return res.status(500).send({ errors: [{ msg: MESSAGES.INTERNAL_SERVER_ERROR }] })
        }
    },
    async getLocalizacoesByUser(req, res){
        try {
            const user = req.user.id
            let localizacoes = await Localizacao.find({usuario : user})
            if(localizacoes){
                return res.status(200).json({localizacoes})
            }else{
                return res.status(404).send({msg: MESSAGES['404_LOCALIZACOES']})
            }
            
        } catch (error) {
            console.error(error.message)
            return res.status(500).send({ errors: [{ msg: MESSAGES.INTERNAL_SERVER_ERROR }] })
        }
    }
}

