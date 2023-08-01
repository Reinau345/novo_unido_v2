const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId;

const schemaNegociacion = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    cliente: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    numFactura: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    tipoMaquina: {
        type: [String],
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    cantidad: {
        type: [Number],
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    precioBase: {
        type: [Number],
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    precioVenta: {
        type: [Number],
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    numCuotas: {
        type: Number,
        trim: true
    },
    tasa: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    anticipo: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true,
    },
    interes: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    fechaGracia: {
        type: Date,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    total: {
        type: Number,
        trim: true
    },
    estado: {
        type: String,
        default: 'Activo',
        trim: true
    },
    cumplimientoPagos: {
        type: [Boolean],
        default: false,
    },
    
})

const ModeloNegociacion = mongoose.model('Negociacion', schemaNegociacion)

module.exports = ModeloNegociacion