const Negociacion = require('../models/NegociacionModels');

const registrarNegociacion = async (req, res) => {

    const { numFactura } = req.body
    const existeFactura = await Negociacion.findOne({numFactura})

    if(existeFactura){
        const error = new Error("Factura ya registrada..")
        return res.status(400).json({msg: error.message})
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

const obtenerCuotasPagadas = async (req, res) => {
    try {
      const negociacionId = req.params.id;
      const negociacion = await Negociacion.findById(negociacionId);
  
      if (!negociacion) {
        return res.status(404).json({ error: 'Negociación no encontrada' });
      }
  
      const cuotasPagadas = negociacion.cuotas.filter(cuota => cuota.cumplimientoPagos);
      res.json(cuotasPagadas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las cuotas pagadas' });
    }
  };

module.exports = {
    registrarNegociacion,
    obtenerNegociaciones,
    obtenerDataNegociaciones,
    actualizarNegociacion,
    eliminarNegociacion,
    actualizarEstadoNegociacion,
    obtenerCuotasPagadas,
    
}