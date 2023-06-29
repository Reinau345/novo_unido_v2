import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const OlvidePassword = () => {
    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if(email == '' || email.length < 6){
          setAlerta({
            msg: 'El Email es obligatorio',
            error: true
          })
          return
        }
    
        try {
          // const {data} = await clienteAxios.post('/usuarios/olvide-password', {email})
          const url = `/usuarios/olvide-password`
          const {data} = await clienteAxios.post(url, {email})
          // console.log(data)
          setAlerta({
            msg: data.msg
          })
        } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error:true
          })
        }
      }
    
      const { msg } = alerta

  return (
    <>
        {/* <div>OlvidePassword</div> */}

        <div className="contenedor">

        <div className="contenedor-formulario">
            <div>
                <img className="logoLogin" src="https://www.novomatic.com/sites/default/files/2017-05/Logo_N-Shortbrand.png" alt="logo" />
            </div>
           <p className="tituloLogin">Restablecer su contraseña</p>

           {msg && <Alerta
            alerta={alerta}
            />}

            <form onSubmit={handleSubmit}  className='formularioLogin' action="index.html" id="formulario">
                <input  
                    className='formulario-Input-Text' 
                    type="text" id="correo" 
                    placeholder="Correo" 
                    required 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />


                <div className="contendorBotones">
                    <input type='submit' value="Enviar"/>
                </div>
            </form>

        </div>
        </div>
    </>
  )
}

export default OlvidePassword