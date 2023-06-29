import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'

// import axios from 'axios'

import clienteAxios from '../config/axios'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()



        if ([email, password].includes('')) {
            setAlerta({ 
                msg: "hay campos vacios", 
                error: true 
            });
            return;
          }

          setAlerta({})

              // crear el producto
                     
            try {
                // const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`
                const url = `/usuarios/login`
                const {data} = await clienteAxios.post(url, { email, password})
                localStorage.setItem('token', data.token)
                // console.log(data)
                setAuth(data)
                navigate('/admin')

                setAlerta({
                    msg: "Creado Correctamente",
                    error: false
                })
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
    }

    const { msg } = alerta

  return (
    <>
    {/* <div>Login</div> */}

        <div className="contenedor">


            <div className="contenedor-formulario">
                <div>
                    <img className="logoLogin" src="https://www.novomatic.com/sites/default/files/2017-05/Logo_N-Shortbrand.png" alt="logo" />
                </div>
            <p className="tituloLogin">Iniciar Sesión</p>

            {msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit} className='formularioLogin' id="formularioLogin" >
                    <input  
                        className='formulario-Input-Text' 
                        type="text" id="correo" 
                        placeholder="Correo" 
                        required 
                        autoComplete = "username"
                        value={email}  
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        className='formulario-Input-password' 
                        type="password" 
                        id="password" 
                        placeholder="Password" 
                        required 
                        autoComplete = "current-password"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Link to="olvide-password">¿Has olvidado tu contraseña o password?</Link>

                    <div className="contendorBotones">
                        {/* <input type="submit" value="Ingresar" />
                        <input type="reset" value="Cancelar" /> */}
                        <input type='submit' value="Iniciar Sesión"/>
                    </div>
                    
                </form>

            </div>
        </div>
    
    </>
  )
}

export default Login
