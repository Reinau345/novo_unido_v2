
const nodemailer = require('nodemailer')

const emailRegistro = async (datos) => {

    const transporter = nodemailer.createTransport({
           service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const {email, nombre, apellido, estado, token} = datos;

      const info = await transporter.sendMail({
        from: "Novotic - Notificacion envio de Mail",
        to: email,
        subject: "Comprobar cuenta en novotic",
        html: `<p>Hola: ${nombre}, comprueba tu email</p>
        <p>Tu cuesta esta lista, comprobar en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a></p>

        <p>Si no eres quien ha creado la cuenta ignora este mensaje</p>
      `, 
      });

      console.log("Mensaje enviado: %s", info.messageId)
}


module.exports = emailRegistro