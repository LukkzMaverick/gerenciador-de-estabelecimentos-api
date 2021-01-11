const mongoose = require("mongoose")
const EstabelecimentoSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    localizacao:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'localizacao',
        required: true
    }
})

module.exports = mongoose.model('estabelecimento', EstabelecimentoSchema)