import React, { useState } from 'react'
import Encabezado from '../components/Encabezado'
import Pie from '../components/Pie'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/axios'
import MenuLateral from '../components/MenuLateral'


const Registrar = () => {

  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [password, setPassword] = useState('')
  const [estado, setEstado] = useState('')
  const [rol, setRol] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})




  const handleSubmit = async e => {
    e.preventDefault()

    if ([email, nombre, apellido, password, repetirPassword, estado, rol].includes('')) {
      setAlerta({ msg: "hay campos vacios", error: true });
      return;
    }

    if(password !== repetirPassword){
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
      const {data} = await clienteAxios.post(url, { email, nombre, apellido, password, estado, rol})
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
        {/* <div>Registrar</div> */} 
        <div className='control'>
        <Encabezado></Encabezado>

        {/* <section className="d-flex"> */}
       
          {/* <aside className="" id="menu_side">
            <ul className="d-flex flex-column justify-content-start w-100 px-0 my-0 mx-0  ">


                <div className="d-flex justify-content-start align-items-center px-3 py-2">
                    <i className="py-3 ">
                        <img className="rounded-circle"  src="https://e7.pngegg.com/pngimages/164/153/png-clipart-donut-the-simpsons-tapped-out-doughnut-homer-simpson-bart-simpson-krusty-the-clown-donut-food-bagel.png" alt="batman " title="batman" width="40" height="40" />
                    </i>

                    <p className="mb-0 mx-3 text-icon-menu">Nombre</p>
                </div>

                
                <Link className="d-flex justify-content-start py-2 border-bottom border-primary" to="/admin/usuarios">
                    <div className="d-flex  align-items-center ">
                        <i className="icon-menu fa-solid fa-user-tie mx-4 " title="Clientes"></i>
                        <p className="text-icon-menu my-0">Usuario</p>
                    </div>
                </Link>

                <Link className="d-flex justify-content-start py-2 border-bottom border-primary" to="/admin/listaclientes">
                    <div className="d-flex  align-items-center ">
                        <i className="icon-menu fa-solid fa-user mx-4" title="Clientes"></i>
                        <p className="text-icon-menu my-0">Clientes</p>
                    </div>
                </Link>

                <Link className="d-flex justify-content-start py-2 border-bottom border-primary" to="/admin/listaproductos">
                    <div className="d-flex  align-items-center ">
                        <i className="icon-menu fa-solid fa-box-open mx-4" title="Clientes"></i>
                        <p className="text-icon-menu my-0">Productos</p>
                    </div>
                </Link>

                <Link className="d-flex justify-content-start py-2 border-bottom border-primary" to="/admin/listanegociaciones">
                    <div className="d-flex  align-items-center ">
                        <i className="icon-menu fa-solid fa-sack-dollar mx-4" title="Clientes"></i>
                        <p className="text-icon-menu my-0">Negociación</p>
                    </div>
                </Link>

                <Link className="d-flex justify-content-between  py-2 border-bottom border-primary" to="/admin/listaplandepago">
                    <div className="d-flex  align-items-center ">
                        <i className="icon-menu fa-solid fa-money-bill-1-wave mx-4" title="Planes de pago"></i>
                        <p className="text-icon-menu my-0">Planes de pago</p>
                    </div>
                </Link>


            </ul>
          </aside> */}

          <MenuLateral></MenuLateral>


          <main className="d-flex   flex-column border border-primary m-4 rounded">




            <h3 className="py-0  px-4 pt-3 my-0">REGISTRAR USUARIO</h3>

            <div className="controles d-flex align-items-center">
                <i className="icon-menu fa-solid fa-angles-left"> volver </i> 
            </div>  

            {msg && <Alerta alerta={alerta} />}

            <form  className="formulario" onSubmit={handleSubmit} >

                <div className="contenedores d-flex justify-content-center flex-lg-row flex-column  flex-sm-column mx-5 gap-5">
                    <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100 ">
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

                    </div>

                    <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0  w-100 ">


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
                                <option defaultValue>-- Seleccione una opción --</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                                <option value="3">Three</option>
                            </select>                 
                            
                        </div>
                        <div className="mb-3 w-100"> 
                            <label htmlFor="rol" className="form-label fw-bold">Rol</label>
                            <select 
                            className="form-select" 
                            aria-label="Default select example"
                            value={rol}
                            onChange={e => setRol(e.target.value)}
                            >
                                <option defaultValue>-- Seleccione una opción --</option>
                                <option value="admin">Administrador</option>
                                <option value="otro">Inactivo</option>
                                <option value="3">Three</option>
                            </select>                 
                            
                        </div>

                    </div>
                </div>


                <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5 ">
                    <div className="d-flex justify-content-center  w-100">
                        <div className="div_botones ms-sm-0  w-100">
                            <button type="submit" className="btn btn-dark w-100 btn-styles">Enviar</button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center w-100">
                        <div className="div_botones  me-sm-0  w-100">
                            <button type="reset" className="btn btn-dark w-100 btn-styles">Limpiar</button>
                        </div>
                    </div>
                </div>
            </form>

          </main>

          
        {/* </section> */}
       

        <Pie></Pie> 
        </div>
    </>
  )
}

export default Registrar