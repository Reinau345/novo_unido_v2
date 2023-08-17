
const nodemailer = require('nodemailer')

const emailOlvidePassword = async (datos) => {

    const transporter = nodemailer.createTransport({
           service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const {email, nombre, apellido, token} = datos;

      const info = await transporter.sendMail({
        from: "Novotic - Notificacion envio de Mail",
        to: email,
        subject: "Restablecer contraseña - novotic",
        text: "Reestablece tu password",
        html: `<p>Hola: ${nombre}, Has solicitado reestablecer tu contraseña</p>
        <p>Sigue el siguiente enlace para generar una nueva contraseña:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Contraseña</a></p>

        <p>Si no eres quien ha creado la cuenta ignora este mensaje</p>
      `, 
      });

      console.log("Mensaje enviado: %s", info.messageId)

}



module.exports = emailOlvidePassword