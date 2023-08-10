
const nodemailer = require('nodemailer')

const emailRegistro = async (datos) => {
  // const transporter = nodemailer.createTransport({
  //     host: process.env.EMAIL_HOST,
  //     port: process.env.EMAIL_PORT,
  //     auth: {
  //       user: process.env.EMAIL_USER,
  //       pass: process.env.EMAIL_PASS,
  //     },
  //   });

  //   const {email, estado, token} = datos;

  //   const info = await transporter.sendMail({
  //     from: "Novotic - Notificacion envio de Mail",
  //     to: email,
  //     subject: "Comprobar cuenta en novotic",
  //     html: `<p>Hola: ${estado}, comprueba tu email</p>
  //     <p>Tu cuesta esta lista, comprobar en el siguiente enlace:
  //     <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a></p>

  //     <p>Si no eres quien ha creado la cuenta ignora este mensaje</p>
  //     `, 
  //   });

  //   console.log("Mensaje enviado: %s", info.messageId)


  // =================================


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, apellido, estado, token } = datos;

  const info = await transporter.sendMail({
    from: "Novotic - Notificacion envío de Mail",
    to: email,
    subject: "Comprobar cuenta en novotic",
    html: `<p>Hola: ${nombre}, comprueba tu email</p>
        <p>Tu cuesta está lista, comprobar en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a></p>

        <p>Si no eres quien ha creado la cuenta, ignora este mensaje</p>
      `,
  });

  console.log("Mensaje enviado: %s", info.messageId)

  // ==================================

  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //      user: "jfcorrales@misena.edu.co",
  //      pass: "qegcyjcxotdpfcyz"
  //   }
  // });

  // const mailOptions = {
  //   from: "jfcorrales@misena.edu.co",
  //   to: "juanfer.nal@hotmail.com",
  //   subject: "Nodemailer Test",
  //   text: "TExto mensaje",
  //   html: "Test <button>sending</button> Gmail using Node JS"
  // };

  // transporter.sendMail(mailOptions, function(error, info){
  //   if(error){
  //      console.log(error);
  //   }else{
  //      console.log("Email sent: " + info.response);
  //   }
  // });

}



module.exports = emailRegistro