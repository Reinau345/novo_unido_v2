const nodemailer = require('nodemailer')

const enviarNoficacion = async (datos) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

//   const { email, nombre, apellido, fechaFormateada } = datos;
  const { clio, fechaFormateada, fechaTexto } = datos;

  const info = await transporter.sendMail({
    from: "Novotic - Notificacion envío de Mail",
    to: clio.email,
    subject: "Notificaión de Pago - Novotic",
    html: `<p>Hola: ${clio.nombre} ${clio.apellido}, comprueba tu email</p>
        <p>Se acerca tu fecha de pago <b> ${fechaTexto} </b>

        <p>Si no eres quien ha creado la cuenta, ignora este mensaje</p>
      `,
  });

      console.log("Mensaje enviado: %s", info.messageId)
}

module.exports = enviarNoficacion