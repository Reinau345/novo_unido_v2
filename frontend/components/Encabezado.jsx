import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


import ListarClientes from './ListarClientes'

const Encabezado = () => {
    const { cerrarSesion } = useAuth()
    const { auth } = useAuth()
    
    const [estadoLateral, setEstadoLateral] = useState(false)

    useEffect(() => {
        const handleResize = () => {
          console.log('La pantalla ha cambiado de tamaño');

          const main = document.querySelector('main')
          const width = main.offsetWidth
        //   main.style.backgroundColor = 'purple'
        //   console.log("cambiado main con mouse",width)

          
        };

        const cambiadoDivMain = () =>{
            const main = document.querySelector('main')
            const width = main.offsetWidth
            console.log("cambiado main con click", width)
        }


        
      
        window.addEventListener('resize', handleResize);
        window.addEventListener('resize', cambiadoDivMain)



   


      
        // Limpia el listener cuando el componente se desmonta
        return () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('resize', cambiadoDivMain)
        };
      }, []);

    const modalMenuLateral = (e) =>{
        e.preventDefault()


        const btn_open = document.querySelector('#btn_open')
        const side_menu = document.querySelector('#menu_side')
        const body = document.querySelector('#body')
        const main = document.querySelector('main')
        const footer = document.querySelector('.main__footer')

        const aside = document.querySelector('aside')
        const cerrarModal = document.querySelector('.cerrarModal')


        // menuModal = document.querySelector('.menuModal')
    
        const screenWidth = screen.width

        function open_close_menu_desktop(){
            body.classList.toggle('body_move')
            // if(body.classList.contains('body_move')){
            //     body.classList.remove('body_move')
            //     console.log("si contiene body_move")
            //     setEstadoLateral(false)
                
            // }else{
            //     body.classList.add('body_move')
            //     console.log("NOo contiene body_move")
            //     setEstadoLateral(true)
            // }

            side_menu.classList.toggle('menu__side_move')
            main.classList.toggle('mover_menu')
            footer.classList.toggle('mover_footer')

            console.log(side_menu, "EStado es:", estadoLateral)
        }

        function open_close_menu_movil(){
            // side_menu.classList.toggle('menuModal')

            aside.style.left = '250px'
            cerrarModal.addEventListener('click', ()=>{
                aside.style.left = '-250px'
                cerrarModal.style.display = 'none'
            })

        }

        console.log(screenWidth)

        if(screenWidth > 700){
            open_close_menu_desktop()
            // body.classList.toggle('body_move')
        }

        if(screenWidth <= 700){
            open_close_menu_movil()
            cerrarModal.style.display = 'block'
        }


    }



    return (

        <header className="py-0">
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid mx-sm-1 mx-1 mx-lg-5">

                    <Link className="navbar-brand" onClick={modalMenuLateral} >
                        <div className="icon__menu">
                            <i className="fas fa-bars btn_open"  id="btn_open"></i>
                        </div>
                            {/* <img id="imgLogo" src={"https://www.novomatic.com/themes/novomatic/images/novomatic_n.svg"} alt="Bootstrap" width="35" height="35" /> */}
                    </Link>
                    {/* <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className=" d-lg-flex justify-content-lg-end" id="navbarNav">
                        <ul className="navbar-nav d-flex justify-content-center align-items-center gap-1 gap-lg-4 my-0">
                            <li className="nav-item hover-header py-0 ">

                                <Link className="text-decoration-none text-white " to="/">
                                    <div className="dropdown">
                                          {/* <img id="imgLogo" src={"https://www.novomatic.com/themes/novomatic/images/novomatic_n.svg"} alt="Bootstrap" width="35" height="35" /> */}
                                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {/* Dropdown button */}
                                            <p className='user-name'>{auth.nombre} {auth.apellido}</p>
                                            {/* {auth.nombre} {auth.apellido} */}
                                              {/* <img id="imgLogo" src={"https://www.novomatic.com/themes/novomatic/images/novomatic_n.svg"} alt="Bootstrap" width="35" height="35" /> */}
                                              <img className="rounded-circle perfil-imagen"  src="https://images.yodibujo.es/_uploads/_tiny_galerie/20130414/homer-simpson-padre_ytb.jpg" alt="batman " title="batman" width="45" height="45" />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <Link to="/admin/perfil">
                                                <button className="dropdown-item" type="button">
                                                    <i className="icono-margin fa-solid fa-address-card"></i>
                                                    Perfil
                                                </button>
                                            </Link>
                                            <Link to="/admin/cambiar-password">
                                                <button className="dropdown-item" type="button">
                                                    <i className="icono-margin fa-solid fa-key"></i>
                                                    Modificar Password
                                                </button>
                                            </Link>
                                            
                                        </ul>
                                          {/* <img id="imgLogo" src={"https://www.novomatic.com/themes/novomatic/images/novomatic_n.svg"} alt="Bootstrap" width="35" height="35" /> */}
                                    </div>
                                </Link>
                            </li>




                        </ul>

                    </div>




                    
                </div>
            </nav>


        </header>

    )
}

export default Encabezado