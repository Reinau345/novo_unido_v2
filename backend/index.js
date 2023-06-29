const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors')
const app = express()

app.use(cors())
//Importar la conexión
const conexionbd = require('./config/db')
const PORT = process.env.PORT || 4000
dotenv.config()

//Importación del archivo de rutas
const rutaCliente = require('./routes/ClienteRoutes')
const rutaPlandepago = require('./routes/PlandepagoRoutes')
const rutaProducto = require('./routes/ProductoRoutes')
const rutaNegociacion = require('./routes/NegociacionRoutes')
const usuarioRouter = require('./routes/usuarioRouter.js')

//Importación del body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/cliente', rutaCliente)
app.use('/api/plandepago', rutaPlandepago)
app.use('/api/producto', rutaProducto)
app.use('/api/negociacion', rutaNegociacion)
app.use('/api/usuarios', usuarioRouter)

const dominiosPermitidos = ['localhost:5173']

const cosrOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      //origin permitido
      callback(null, true);
    } else {
      callback(new Error('No permitido por Cors'));
    }
  }
}

app.use(cors(cosrOptions))

app.get('/', (req, res) => {
    res.end('Bienvenido al servidor')
})

app.listen(4000, function(){
    console.log('El servidor está corriendo correctamente',PORT)
})