import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Encabezado = () => {
    const { cerrarSesion } = useAuth()
    return (

        <header className="py-0 ">
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid mx-sm-1 mx-1 mx-lg-5">

                    <Link className="navbar-brand" to="index.html">
                        <h2 style={{color:'white'}}>NOVOMATIC</h2>
                    </Link>
                    <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-lg-flex justify-content-lg-end" id="navbarNav">
                        <ul className="navbar-nav d-flex justify-content-center align-items-center gap-1 gap-lg-4 my-2">
                            <li className="nav-item hover-header py-2 ">
                                <Link className="text-decoration-none text-white " to="/" onClick={cerrarSesion}>
                                    <i className="demo-ico fa-solid fa-person-walking-dashed-line-arrow-right"></i>
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