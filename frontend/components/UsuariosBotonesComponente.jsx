import React from 'react'
import { Link } from 'react-router-dom'

const UsuariosBotonesComponente = () => {
  return (
    <>
        {/* <div>UsuariosBotonesComponente</div> */}


        <main className="d-flex   flex-column">

            <h1 className="text-center  py-0 pt-5 my-0">USUARIO</h1>

            <div className="controles d-flex align-items-center">
                <Link to={"/admin/usuarios"}>
                    <i className="icon-menu fa-solid fa-angles-left link-dark"> volver </i> 
                </Link>
            </div>  

            <form  className="formulario">

                <div className="contenedores d-flex justify-content-center flex-lg-row flex-column  flex-sm-column mx-5 gap-5">
                    <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100 ">
                        
                        <div className="d-flex justify-content-center  mb-4 w-100">
                            <div className="div_botones ms-sm-0  w-100">
                                <Link to="/admin/perfil">
                                    <button type="submit" className="btn btn-dark w-100 btn-styles">Modificar Perfil</button>
                                </Link>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center   w-100">
                            <div className="div_botones ms-sm-0  w-100">
                                <Link to="/admin/cambiar-password">
                                    <button type="submit" className="btn btn-dark w-100 btn-styles">Cambiar Password</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0  w-100 ">
                        <div className="d-flex justify-content-center mb-4 w-100">
                            <div className="div_botones ms-sm-0  w-100">
                                <Link to="/admin/registrar">
                                    <button type="submit" className="btn btn-dark w-100 btn-styles">Crear Nuevo Usuario</button>
                                </Link>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mb-4 w-100">
                            <div className="div_botones ms-sm-0  w-100">
                                <button type="submit" className="btn btn-dark w-100 btn-styles">Listar usuarios</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5 ">
                    {/* <div className="d-flex justify-content-center  w-100">
                        <div className="div_botones ms-sm-0  w-100">
                            <button type="submit" className="btn btn-dark w-100 btn-styles">Enviar</button>
                        </div>
                    </div> */}

                    {/* <div className="d-flex justify-content-center w-100">
                        <div className="div_botones  me-sm-0  w-100">
                            <button type="reset" className="btn btn-dark w-100 btn-styles">Limpiar</button>
                        </div>
                    </div> */}
                </div>
            </form>

        </main>
    </>
  )
}

export default UsuariosBotonesComponente