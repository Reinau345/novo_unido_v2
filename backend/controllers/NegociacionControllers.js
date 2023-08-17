const schedule = require('node-schedule');
const Negociacion = require('../models/NegociacionModels');
const Cliente = require('../models/ClienteModels');
const obtenerCliente = require('../helpers/obteneCliente')
const enviarNoficacion = require('../helpers/enviarNoficacion')


const registrarNegociacion = async (req, res) => {

    const { numFactura } = req.body
    const existeFactura = await Negociacion.findOne({ numFactura })

    if (existeFactura) {
        const error = new Error("Factura ya registrada..")
        return res.status(400).json({ msg: error.message })
    }

    try {
        const nuevaNegociacion = new Negociacion(req.body);

        nuevaNegociacion.cliente = req.body.cliente.nombre || nuevaNegociacion.cliente.nombre 
        nuevaNegociacion.clienteData = req.body.cliente._id || nuevaNegociacion.cliente._id 

        nuevaNegociacion.numFactura = req.body.numFactura || nuevaNegociacion.numFactura 
        nuevaNegociacion.tipoMaquina = req.body.tipoMaquina || nuevaNegociacion.tipoMaquina 
        nuevaNegociacion.precioBase = req.body.precioBase || nuevaNegociacion.precioBase 
        nuevaNegociacion.precioVenta = req.body.precioVenta || nuevaNegociacion.precioVenta 
        nuevaNegociacion.numCuotas = req.body.numCuotas || nuevaNegociacion.numCuotas 
        nuevaNegociacion.tasa = req.body.tasa || nuevaNegociacion.tasa 
        nuevaNegociacion.anticipo = req.body.anticipo || nuevaNegociacion.anticipo 
        nuevaNegociacion.interes = req.body.interes || nuevaNegociacion.interes 
        nuevaNegociacion.fechaGracia = req.body.fechaGracia || nuevaNegociacion.fechaGracia 
        nuevaNegociacion.total = req.body.total || nuevaNegociacion.total 
        nuevaNegociacion.estado = req.body.estado || nuevaNegociacion.estado 
        nuevaNegociacion.fechaFacturacion = req.body.fechaFacturacion || nuevaNegociacion.fechaFacturacion 



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

const enviarNotificacion = async () => {
    try {
        const results = await Negociacion.find();

        const date = new Date()
        const dia = date.getDay()
        const mes = date.getMonth() + 1
        const ano = date.getFullYear()
        const actualLatina = `${dia}/${mes}/${ano}`
        const isoDataMongo = date.toISOString()


        results.forEach(async result => {
            console.log("Cliente:", result.cliente);

            result.detalleCuotas.forEach(async detalle => {
                // const date = new Date(detalle.fecha)
                const formateada = date.toLocaleDateString('es-Es')
                //fecha mongo
                const fechaMongo = detalle.fecha
                //feccha actual
                const fechaActual = date.toISOString()

                const fMongo  = new Date(fechaMongo)
                const fActual = new Date(fechaActual)
                // diferencia
                const diferenciaMilisegundos = Math.abs(fActual - fMongo)
                const diferenciaDias = Math.ceil(diferenciaMilisegundos / (24 * 60 * 60 * 1000)) 

                // console.log(" ")
                // console.log("FechaMongo:",fMongo)
                // console.log("FechaHoy:  ",fActual)

                console.log(detalle.fecha, " = ", formateada, " Diferencia en dias: ", diferenciaDias)
                // console.log("Detalle F:", detalle.fecha)

                if(diferenciaDias === 6){


                    try {
                        console.log( " YA TIENE 5 DIAS")
                        // console.log("Cliente:", result)
                        const clio = await obtenerCliente(result.clienteData)
                        // console.log(clio)
                        // console.log("====")

                        const fecha = new Date( fechaMongo )
                        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
                        const dia = fecha.getDate()
                        const mes = fecha.getMonth()
                        const ano = fecha.getFullYear()
                        const fechaFormateada = `${dia}/${mes}/${ano}`
                        const fechaTexto = fecha.toLocaleDateString('es-ES', options)

                        enviarNoficacion( { clio, fechaFormateada, fechaTexto })

                    } catch (error) {
                        console.log(error)
                    }
                }
            })
        });
        // Realiza las operaciones necesarias con los resultados aquí
    } catch (error) {
        console.error(error);
        // Maneja el error de manera adecuada
    }
};
// / Programa la función para que se ejecute todos los días a la misma hora (ejemplo: a las 10:00 AM)
// const notificacionJob = schedule.scheduleJob('minutos hora * * *', enviarNotificacion);
const notificacionJob = schedule.scheduleJob('52 18 * * *', enviarNotificacion);

module.exports = {
    registrarNegociacion,
    obtenerNegociaciones,
    obtenerDataNegociaciones,
    actualizarNegociacion,
    eliminarNegociacion,
    actualizarEstadoNegociacion,
    actualizarCuota,

}