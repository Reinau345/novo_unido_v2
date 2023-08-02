const Usuario = require('../models/usuarioModel.js');
const generarId = require('../helpers/generarId.js');
const generarJWT = require('../helpers/generarJWT.js')
const emailRegistro = require('../helpers/emailRegistro.js')
const emailOlvidePassword = require('../helpers/emailOlvidePassword.js')

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json( usuarios )
    } catch (err) {
        console.log(err)
    }
} 

const registrar = async (req, res) =>{

    const {email,estado,nombre,apellido} = req.body

    const existeUsuario = await Usuario.findOne({email})

    if(existeUsuario){
        const error = new Error("Usuario ya registrado..")
        return res.status(400).json({msg: error.message})
    }

    try {
        // guradar nuevo Usuario
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();

        emailRegistro({
            email,
            nombre,
            apellido,
            estado,
            token: usuarioGuardado.token
        })

        res.json(usuarioGuardado)
        // res.json({msg: "Registrano Usuario...."})

    } catch (error) {
        console.log(error)
    }
}

const perfil = (req, res) => {
    const { usuario } = req;
    // console.log(req.usuario)
    res.json(usuario )
}

const confirmar = async (req, res) =>{
    const {token} = req.params
    const usuarioConfirmar = await Usuario.findOne({token})
    
    if(!usuarioConfirmar){
        const error = new Error("Token no válido")
        return res.status(404).json({msg:error.message})
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()

        res.json({msg: "Usuario confirmado correctamente"})
    } catch (error) {
        console.log(error)
    }
}

const autenticar = async (req, res) =>{
    const {email, password} = req.body
 
    const usuario = await Usuario.findOne({email})
 
    if(!usuario){
     const error = new Error("El Usuario no existe");
     return res.status(404).json({msg: error.message});
    }
 
    // comprobar si un usaurio esta comprobado
    if(!usuario.confirmado){
     const error = new Error("tu cuenta no ha sido confirmada");
     return res.status(403).json({msg: error.message});
    }
 
    // revisar el password
    if( await usuario.comprobarPassword(password)){

     res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        estado: usuario.estado, // cambiar por nombre
        email: usuario.email,
        token: generarJWT(usuario.id)
     })

    }else{
     const error = new Error("El password o email es incorrecto");
     return res.status(403).json({msg: error.message});
    }
 }

 const olvidePassword = async (req, res)=>{
    const { email } = req.body;

    const existeUsuario = await Usuario.findOne({email})

    if(!existeUsuario){
        const error = new Error("El Usuario no existe");
        return res.status(400).json({msg: error.message})
    }

    try {
        existeUsuario.token = generarId();
        await existeUsuario.save()

        //enviar email con instrucciones
        emailOlvidePassword({
            email,
            nombre: existeUsuario.nombre,
            apellido: existeUsuario.apellido,
            token: existeUsuario.token

        })

        res.json({msg: "Hemos enviado un email con las instrucciones"})
    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async (req, res)=>{
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({token})

    if(tokenValido){
        // el token es valido el usuario existe
        res.json({msg: "Token valido y el usuario existe"})
    }else{
        const error = new Error("Token no valido")
        return res.status(400).json({msg: error.message})
    }

}

const nuevoPassword = async (req, res)=>{
    const { token }    = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({token})
    
    if(!usuario){
        const error = new Error("Hubo un error")
        return res.status(400).json({msg: error.message})
    }

    try {
        usuario.token = null;
        usuario.password = password;
        await usuario.save();
        res.json({msg: "Password modificado correctamente"})
    } catch (error) {
        console.log(error)
    }
}

const actualizarPerfil = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id)
    if(!usuario){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }

    const { email } = req.body
    if(usuario.email !== req.body.email){
        const existeEmail = await Usuario.findOne({email})
        if(existeEmail){
            const error = new Error('Ese email ya esta en uso')
            return res.status(400).json({msg: error.message})
        }
    }

    try {
        usuario.nombre = req.body.nombre || usuario.nombre;
        usuario.apellido = req.body.apellido || usuario.apellido;
        usuario.email = req.body.email || usuario.email;

        const usuarioActualizado = await usuario.save()
        res.json(usuarioActualizado)
    } catch (error) {
        console.log(error)
    }

}

const actualizarPassword = async (req, res) => {
    // leer datos 
    const { id } = req.usuario;
    const { passwordActual, passwordNuevo } = req.body;
    // comprobar usuario existe
    const usuario = await Usuario.findById(id)
    if(!usuario){
        const error = new Error("Hubo un error")
        return res.status(400).json({msg: error.message});
    }
    // comprobar password
    if(await usuario.comprobarPassword(passwordActual)){
        usuario.password = passwordNuevo
        await usuario.save()
        res.json({msg: 'Password Almacenado Correctamente'})
    }else{
        const error = new Error("El password actual es incorrecto")
        return res.status(400).json({msg: error.message});
    }
    //almacenar el nuevos pwd


}

const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id)

    if(!usuario){
        return res.status(404).json({ msg: "No Encontrado", id})
    }

    if(id.toString() !== usuario._id.toString()){
        return res.json({ msg: "Accion no válida" })
    }

    try {
        await usuario.deleteOne()
    } catch (error) {
        console.log(error)
    }
}

//Actualizar el estado del usuario
const actualizarEstadoUsuario = (req, res) => {
    // Obtiene el ID del usuario desde los parámetros de la URL
    const usuarioId = req.params.id;

    // Obtiene el nuevo estado del usuario desde el cuerpo de la solicitud
    const nuevoEstado = req.body.estado;

    // Actualiza el estado del usuario en la base de datos
    Usuario.findByIdAndUpdate(usuarioId, { estado: nuevoEstado }, { new: true })
        .then(usuarioActualizado => {
            // Envía la respuesta con el usuario actualizado
            res.json(usuarioActualizado);
        })
        .catch(error => {
            // Maneja los errores y envía una respuesta con el código de error correspondiente
            res.status(500).json({ error: 'Error al actualizar el estado del usuario' });
        });
};


module.exports = {
    registrar,
    confirmar,
    autenticar,
    perfil,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword,
    obtenerUsuarios,
    eliminarUsuario,
    actualizarEstadoUsuario
}