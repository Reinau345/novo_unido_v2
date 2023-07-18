import React, {useEffect, useLayoutEffect, useRef, useState}from 'react'
import { Link } from 'react-router-dom'

import MenuLateral from './MenuLateral'




const UsuariosBotonesComponente = () => {


    // const [colorFondo, setColorFondo] = useState('');

    // const funcionClick = (e) => {
    //   e.preventDefault();
    //   const nuevoColorFondo = 'pink';
    //   setColorFondo(nuevoColorFondo);
    // };
  
    // useEffect(() => {
    //   const aside = document.querySelector('aside');
    //   aside.style.backgroundColor = colorFondo;
    // }, [colorFondo]);

    // ==============================================================

     const funcionClick = (e) =>{
        e.preventDefault()

        const side_menu = document.querySelector('#menu_side')
        const btn_open = document.querySelector('#btn_open')
        const body = document.querySelector('#body')
        const main = document.querySelector('main')
        const footer = document.querySelector('.main__footer')
    
        // evento mostrar ocultar menu
        // alert("hola Juan")
        open_close_menu()

        function open_close_menu(){
            // side_menu.classList.toggle('devoler-aside')
            body.classList.toggle('body_move')
            side_menu.classList.toggle('menu__side_move')
            main.classList.toggle('mover_menu')
            footer.classList.toggle('mover_footer')
        }



     }

     const funcionModalAbrir = (e) =>{
        e.preventDefault()
        // alert("modal")

        const btnAbrirModal = document.querySelector('#btn-abrir-modal')
        const btnCerrarModal = document.querySelector('#btn-cerrar-modal')
        const modal1 = document.querySelector('#modal1')




        const side_menu = document.querySelector('#menu_side')
        body.classList.add('body_move')

        modal1.showModal();

        modal1.classList.add('mostrarModal')
        modal1.classList.remove('quitarModal')


        // btnAbrirModal.addEventListener("click", ()=>{
        //     modal1.show();
        // })
     }

    //  const funcionModalCerrar = (e) =>{
    //     e.preventDefault()
        
    //     const modal1 = document.querySelector('#modal1')

    //     const side_menu = document.querySelector('#menu_side')
    //     body.classList.remove('body_move')

    //     modal1.classList.add('quitarModal')
    //     modal1.classList.remove('mostrarModal')
    //     modal1.close()

    //  }


    // ==============================================================
    
    





  return (
    <>
        {/* <div>UsuariosBotonesComponente</div> */}


        <main className="d-flex   flex-column border border-primary m-4 rounded ">

            {/* <div className='contenedor-main'> */}
            
            {/* <button type="button" className="btn btn-primary" id='btn-abrir-modal' onClick={funcionModalAbrir}>Abrir modal</button> */}

            {/* <dialog  id='modal1'>
                    <div className='contenedor-modal' >
                        <button type="button" className="btn-close"></button>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                            Quidem iste ipsum quo, obcaecati aspernatur tempore vitae 
                            consequatur minima itaque, nisi veniam, ex ab qui pariatur 
                        </p>

                        <div>
                            <button type="button" className="btn btn-primary" id='btn-cerrar-modal' onClick={funcionModalCerrar}>Cerrar modal</button>
                        </div>
                    </div>

            </dialog> */}










            

            {/* <div className="icon__menu">
                    <i className="fas fa-bars btn_open" onClick={funcionClick} id="btn_open"></i>
            </div> */}

            <h1 className="text-center mx-5 py-0 pt-4 my-0">USUARIO</h1>

            <div className="controles d-flex align-items-center my-5 ">
                <Link to={"/admin/usuarios"}>
                    <i className="icon-menu fa-solid fa-angles-left  link-dark"> volver </i> 
                </Link>
            </div>  

            <form  className="formulario">

                <div className="contenedores d-flex justify-content-center flex-lg-row flex-column  flex-sm-column mx-5 gap-5">
                    <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100 ">
                        
                        <div className="d-flex justify-content-center  mb-4 w-100">
                            <div className="div_botones ms-sm-0  w-100">
                                <Link to="/admin/perfil">
                                    <button type="submit" className="btn btn-dark w-100 btn-styles btn-botones">Modificar Perfil</button>
                                </Link>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center   w-100">
                            <div className="div_botones ms-sm-0  w-100">
                                <Link to="/admin/cambiar-password">
                                    <button type="submit" className="btn btn-dark w-100 btn-styles btn-botones">Cambiar Password</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0  w-100 ">
                        <div className="d-flex justify-content-center mb-4 w-100">
                            <div className="div_botones ms-sm-0  w-100">
                                <Link to="/admin/registrar">
                                    <button type="submit" className="btn btn-dark w-100 btn-styles btn-botones">Crear Nuevo Usuario</button>
                                </Link>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mb-4 w-100">
                            <div className="div_botones ms-sm-0  w-100">
                                <button type="submit" className="btn btn-dark w-100 btn-styles btn-botones">Listar usuarios</button>
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
            {/* </div> */}

        </main>
    </>
  )
}

export default UsuariosBotonesComponente