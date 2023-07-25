import React, { useState } from 'react'
import Encabezado from '../components/Encabezado'
import Pie from '../components/Pie'
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/axios'
import MenuLateral from '../components/MenuLateral'


const Registrar = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [password, setPassword] = useState('')
  const [estado, setEstado] = useState('')
  const [rol, setRol] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  const handleCancelar = () => {
    navigate(-1); // Regresa a la ubicación anterior
  };

  const handleSubmit = async e => {
    e.preventDefault()

    if ([email, nombre, apellido, password, repetirPassword, estado, rol].includes('')) {
      setAlerta({ msg: "hay campos vacios", error: true });
      return;
    }

    if (password !== repetirPassword) {
      console.log("Los password no son iguales")
      return
    }

    // if(password.length < 8){
    //   console.log('El password es muy corto')
    //   return
    // }


    setAlerta({})

    // crear el producto
    try {
      //   const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`
      const url = `/usuarios`
      const { data } = await clienteAxios.post(url, { email, nombre, apellido, password, estado, rol })
      console.log(data)
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
      <div className='control'>
        <Encabezado></Encabezado>

        <MenuLateral></MenuLateral>

        <main className="d-flex   flex-column border border-primary m-4 rounded">

          <h3 className="py-0 text-center px-4 pt-3 my-0">CREAR USUARIO</h3>
          <br />
          {msg && <Alerta alerta={alerta} />}

          <form className="formulario" onSubmit={handleSubmit} >

            <div className="contenedores d-flex justify-content-center flex-lg-row flex-column  flex-sm-column mx-5 gap-5">
              <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100 ">
                <div className="mb-3 w-100">
                  <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    aria-describedby="emailHelp"
                    placeholder="Nombre"
                    required
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                  />
                </div>

                <div className="mb-3 w-100">
                  <label htmlFor="email" className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3 w-100">
                  <label htmlFor="descripcion" className="form-label fw-bold">Repetir Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="descripcion"
                    aria-describedby="emailHelp"
                    placeholder="Repetir Password"
                    required
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3 w-100">
                  <label htmlFor="estado" className="form-label fw-bold" >Estado</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={estado}
                    onChange={e => setEstado(e.target.value)}
                  >
                    <option defaultValue>Seleccionar</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0  w-100 ">
                <div className="mb-3 w-100">
                  <label htmlFor="apellido" className="form-label fw-bold">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    aria-describedby="emailHelp"
                    placeholder="Apellido"
                    required
                    value={apellido}
                    onChange={e => setApellido(e.target.value)}
                  />
                </div>

                <div className="mb-3 w-100">
                  <label htmlFor="password" className="form-label fw-bold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    aria-describedby="emailHelp"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3 w-100">
                  <label htmlFor="rol" className="form-label fw-bold">Rol</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={rol}
                    onChange={e => setRol(e.target.value)}
                  >
                    <option defaultValue>Seleccionar</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5">
              <div className="d-flex justify-content-center w-100">
                <div className="div_botones ms-sm-0 w-100 d-flex justify-content-center">
                  <button type="submit" className="btn btn-dark btn-styles">Guardar</button>
                </div>
              </div>

              <div className="d-flex justify-content-center w-100">
                <div className="div_botones me-sm-0 w-100 d-flex justify-content-center">
                  <button type="button" className="btn btn-dark btn-styles" onClick={handleCancelar}>Cancelar</button>
                </div>
              </div>
            </div>
          </form>

        </main>

        <Pie></Pie>
      </div>
    </>
  )
}

export default Registrar