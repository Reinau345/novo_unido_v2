import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import Alerta from '../../components/Alerta'

const EditarPerfil = () => {
    const navigate = useNavigate();

    const { auth, actualizarPerfil } = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    const handleCancelar = () => {
        navigate('/admin'); // Regresa a la ubicación anterior
    };

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault()

        const { nombre, apellido, email } = perfil;

        if ([nombre, apellido, email].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)
        window.location.href = '/admin/listar-usuarios';

    }

    const { msg } = alerta

    return (
        <>
            {/* <div>EditarPerfil componente</div> */}

            <main className="d-flex   flex-column border border-primary m-3 rounded" id="main">

                <h3 className="py-0  px-4 pt-3 my-0">PERFIL</h3>
                <br />
                {msg && <Alerta alerta={alerta}></Alerta>}

                <form className="formulario"
                    onSubmit={handleSubmit}
                >

                    <div className="contenedores d-flex justify-content-center flex-lg-row flex-column  flex-sm-column mx-5 gap-5">
                        <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100 ">
                            <div className="mb-3 w-100">
                                <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    aria-describedby="emailHelp"
                                    name='nombre'
                                    placeholder="Nombre"
                                    required
                                    value={perfil.nombre || ''}
                                    onChange={e => setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                            </div>

                            <div className="mb-3 w-100">
                                <label htmlFor="email" className="form-label fw-bold">Correo</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    name='email'
                                    placeholder="Correo"
                                    required
                                    value={perfil.email || ''}
                                    onChange={e => setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                            </div>

                        </div>

                        <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0  w-100 ">
                        <div className="mb-3 w-100">
                                <label htmlFor="apellido" className="form-label fw-bold">Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apellido"
                                    aria-describedby="emailHelp"
                                    name='apellido'
                                    placeholder="Apellido"
                                    required
                                    value={perfil.apellido || ''}
                                    onChange={e => setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })}

                                />
                            </div>
                        </div>
                    </div>


                    <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5">
                        <div className="d-flex justify-content-center w-100">
                            <div className="div_botones ms-sm-0 w-100 d-flex justify-content-center">
                                <button type="submit" className="btn btn-dark btn-styles btn-botones">Guardar</button>
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

export default EditarPerfil