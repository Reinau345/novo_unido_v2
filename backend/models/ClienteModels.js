const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId;

const schemaCliente = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto:true,
    },
    cedula: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    nombre: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    direccion: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    telefono: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    nombreCodeudor: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    telefonoCodeudor: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
    grupo: {
        type: String,
        required: [true, 'Este campo es obligatorio'],
        trim: true
    },
})

const ModeloCliente = mongoose.model('Cliente', schemaCliente)

module.exports = ModeloCliente
