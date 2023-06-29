const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId;

const schemaNegociacion = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    anticipo: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
    },
    tasa: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    interes: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    numCuotas: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    numFactura: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    tipoMaquina: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    cantidad: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    referencia: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    fechaFacturacion: {
        type: Date,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    cliente: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    }
})

const ModeloNegociacion = mongoose.model('Negociación', schemaNegociacion)

module.exports = ModeloNegociacion