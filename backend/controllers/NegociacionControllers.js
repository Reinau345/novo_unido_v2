const Negociacion = require('../models/NegociacionModels');

const registrarNegociacion = async (req, res) => {
    try {
        const nuevaNegociacion = new Negociacion(req.body);
        console.log(req.body);
        console.log(nuevaNegociacion);
        await nuevaNegociacion.save();
        res.json({ message: 'Negociación agregada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar la negociación' });
    }
};

const obtenerNegociaciones = async (req, res) => {
    Negociacion.find({})
        .then((results) => {
            res.json(results);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener las negociaciones' });
        });
};

const obtenerDataNegociaciones = async (req, res) => {
    const id = req.params.id;
    Negociacion.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los datos de la negociación' });
        });
};

const actualizarNegociacion = async (req, res) => {
    const id = req.params.id;
    const propiedadesActualizadas = req.body;
    try {
        await Negociacion.findByIdAndUpdate(id, propiedadesActualizadas);
        res.json({ message: 'Negociación actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la negociación' });
    }
};

const eliminarNegociacion = async (req, res) => {
    const id = req.params.id;
    try {
        await Negociacion.findOneAndDelete({ _id: id });
        res.json({ message: 'Negociación eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la negociación' });
    }
};

module.exports = {
    registrarNegociacion,
    obtenerNegociaciones,
    obtenerDataNegociaciones,
    actualizarNegociacion,
    eliminarNegociacion
}