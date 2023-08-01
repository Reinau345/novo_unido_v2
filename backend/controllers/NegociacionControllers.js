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

//Actualizar el estado de la negociación
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

// const actualizarCumplimientoCuotas = async (req, res) => {
//     try {
//       const negociacionId = req.params.id;
//       const cumplimientoCuotas = req.body.cumplimientoCuotas; // Acceso correcto al objeto de cuotas

//       console.log('ID de la negociación:', negociacionId);
//       console.log('Datos de cumplimientoCuotas:', cumplimientoCuotas);

//       // Resto del código para actualizar los datos en la base de datos
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error al actualizar el estado de cumplimiento de las cuotas' });
//     }
//   };

// Controlador para obtener los datos de cumplimiento de cuotas de una negociación específica
const obtenerCumplimientoCuotas = async (req, res) => {
    const { id } = req.params; // Obtén el ID de la negociación de los parámetros de la solicitud

    try {
        // Busca la negociación en la base de datos por su ID
        const negociacion = await Negociacion.findById(id);

        if (!negociacion) {
            // Si la negociación no existe, responde con un código 404 (No encontrado)
            return res.status(404).json({ mensaje: 'Negociación no encontrada' });
        }

        // Si la negociación existe, responde con los datos de cumplimiento de cuotas
        res.status(200).json({ cumplimientoCuotas: negociacion.cumplimientoCuotas });
    } catch (error) {
        // Si ocurre un error en la base de datos u otro problema, responde con un código 500 (Error del servidor)
        console.error('Error al obtener el cumplimiento de cuotas:', error);
        res.status(500).json({ mensaje: 'Error al obtener el cumplimiento de cuotas' });
    }
};

const actualizarCumplimientoCuotas = async (req, res) => {
    const { id } = req.params;
    const { cumplimientoCuotas } = req.body;
  
    try {
      const negociacion = await Negociacion.findById(id);
  
      if (!negociacion) {
        return res.status(404).json({ mensaje: 'Negociación no encontrada' });
      }
  
      negociacion.cumplimientoCuotas = cumplimientoCuotas;
  
      await negociacion.save();
  
      res.status(200).json({ mensaje: 'Datos de cumplimiento de cuotas actualizados correctamente' });
    } catch (error) {
      console.error('Error al actualizar el cumplimiento de cuotas:', error);
      res.status(500).json({ mensaje: 'Error al actualizar el cumplimiento de cuotas' });
    }
  };

module.exports = {
    registrarNegociacion,
    obtenerNegociaciones,
    obtenerDataNegociaciones,
    actualizarNegociacion,
    eliminarNegociacion,
    actualizarEstadoNegociacion,
    actualizarCumplimientoCuotas,
    obtenerCumplimientoCuotas
}