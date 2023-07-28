const Cliente = require('../models/ClienteModels');

const registrarCliente = async (req, res) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        console.log(req.body);
        console.log(nuevoCliente);

        //validar cedular
        

        await nuevoCliente.save();
        res.json({ message: 'Cliente agregado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el cliente' });
    }
};

const obtenerClientes = async (req, res) => {
    Cliente.find({})
        .then((results) => {
            res.json(results);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los clientes' });
        });
};

const obtenerDataClientes = async (req, res) => {
    const id = req.params.id;
    Cliente.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los datos del cliente' });
        });
};

const actualizarCliente = async (req, res) => {
    const id = req.params.id;
    const propiedadesActualizadas = req.body;
    try {
        await Cliente.findByIdAndUpdate(id, propiedadesActualizadas);
        res.json({ message: 'Cliente actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

const eliminarCliente = async (req, res) => {
    const id = req.params.id;
    try {
        await Cliente.findOneAndDelete({ _id: id });
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};

module.exports = {
    registrarCliente,
    obtenerClientes,
    obtenerDataClientes,
    actualizarCliente,
    eliminarCliente
};