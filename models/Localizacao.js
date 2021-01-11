const mongoose = require("mongoose")
const LocalizacaoSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    }
})

module.exports = mongoose.model('localizacao', LocalizacaoSchema)