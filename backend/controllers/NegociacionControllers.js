const Negociacion = require('../models/NegociacionModels');

const registrarNegociacion = async (req, res) => {

    const { numFactura } = req.body
    const existeFactura = await Negociacion.findOne({ numFactura })

    if (existeFactura) {
        const error = new Error("Factura ya registrada..")
        return res.status(400).json({ msg: error.message })
    }

    try {
        const nuevaNegociacion = new Negociacion(req.body);

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

const actualizarEstadoNegociacion = (req, res) => {
    // Obtiene el ID de la negociación desde los parámetros de la URL
    const negociacionId = req.params.id;

    // Obtiene el nuevo estado de la negociación desde el cuerpo de la solicitud
    const nuevoEstado = req.body.estado;

    // Actualiza el estado de la negociación en la base de datos
    Negociacion.findByIdAndUpdate(negociacionId, { estado: nuevoEstado }, { new: true })
        .then(negociacionActualizada => {
            // Envía la respuesta con la negociación actualizada
            res.json(negociacionActualizada);
        })
        .catch(error => {
            // Maneja los errores y envía una respuesta con el código de error correspondiente
            res.status(500).json({ error: 'Error al actualizar el estado de la negociación' });
        });
};

const actualizarCuota = async (req, res) => {
    const { idNegociacion, numCuota } = req.params;
    const { pagada } = req.body;

    try {
        // Encuentra la negociación por el ID
        const negociacion = await Negociacion.findById(idNegociacion);

        // Verifica que la negociación y el número de cuota existan
        if (!negociacion || numCuota < 1 || numCuota > negociacion.numCuotas) {
            return res.status(404).json({ error: 'Negociación o número de cuota no encontrado' });
        }

        // Actualiza el estado de la cuota en el array cumplimientoCuotas
        negociacion.cumplimientoCuotas[numCuota - 1] = pagada;

        // Guarda los cambios en la base de datos
        await negociacion.save();

        return res.json({ message: 'Cuota actualizada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al actualizar la cuota' });
    }
};

module.exports = {
    registrarNegociacion,
    obtenerNegociaciones,
    obtenerDataNegociaciones,
    actualizarNegociacion,
    eliminarNegociacion,
    actualizarEstadoNegociacion,
    actualizarCuota,

}