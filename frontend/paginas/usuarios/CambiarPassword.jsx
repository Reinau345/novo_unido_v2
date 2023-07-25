import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'
import Alerta from '../../components/Alerta'


const CambiarPassword = () => {

  const { guardarPassword } = useAuth()

  const navigate = useNavigate()

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    passwordActual: '',
    passwordNuevo: ''
  })

  const handleCancelar = () => {
    navigate('/admin/usuarios'); // Regresa a la ubicación anterior
  };

  const handleSubmit = async e => {
    e.preventDefault()

    if (Object.values(password).some(campo => campo === '')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if (password.passwordNuevo.length < 6) {
      setAlerta({
        msg: 'El Password debe tener minimo 6 caracteres',
        error: true
      })
      return
    }

    const respuesta = await guardarPassword(password)
    setAlerta(respuesta)
  }



  const { msg } = alerta

  return (
    <>
      {/* <div>CambiarPassword</div> */}

      <main className="d-flex   flex-column border border-primary m-4 rounded">

        <h3 className="py-0  px-4 pt-3 my-0">EDITAR PASSWORD</h3>
        <br />
        {msg && <Alerta alerta={alerta}></Alerta>}

        <form className="formulario"
          onSubmit={handleSubmit}
        >

          <div className="contenedores d-flex justify-content-center flex-lg-row flex-column  flex-sm-column mx-5 gap-5">
            <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100 ">
              <div className="mb-3 w-100">
                <label htmlFor="passwordActual" className="form-label fw-bold">Password Actual</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordActual"
                  aria-describedby="emailHelp"
                  name='passwordActual'
                  placeholder="Password Actual"
                  required
                  onChange={e => setPassword({
                    ...password,
                    [e.target.name]: e.target.value
                  })}
                />
              </div>
            </div>

            <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0  w-100 ">
              <div className="mb-3 w-100">
                <label htmlFor="passwordNuevo" className="form-label fw-bold">Password Nuevo</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordNuevo"
                  aria-describedby="emailHelp"
                  name='passwordNuevo'
                  placeholder="Password Nuevo"
                  required
                  onChange={e => setPassword({
                    ...password,
                    [e.target.name]: e.target.value
                  })}

                />
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
    </>
  )
}

export default CambiarPassword