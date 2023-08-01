import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import MenuLateral from './MenuLateral'

const CrearProducto = () => {
    const navigate = useNavigate();
    //Hooks
    const [referencia, setReferencia] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [precioBase, setPrecioBase] = useState('')
    const [imagen, setImagen] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const { auth } = useAuth()

    const handleCancelar = () => {
        navigate(-1); // Regresa a la ubicación anterior
    };

    function validarTexto(event) {
        const inputText = event.target.value;

        // Remover caracteres especiales y números, permitiendo solo letras y la letra "ñ" (tanto en mayúscula como en minúscula)
        const sanitizedText = inputText.replace(/[^a-zA-ZñÑ\s]/g, '');

        // Actualizar el valor del input con el texto sanitizado
        event.target.value = sanitizedText;
    }

    function validarNumericos(event) {
        const charCode = event.keyCode || event.which;
        const char = String.fromCharCode(charCode);

        // Permitir la tecla de retroceso (backspace) y la tecla de suprimir (delete)
        if (charCode === 8 || charCode === 46 || charCode === 9) {
            return;
        }

        // Verificar si el carácter no es un número del 0 al 9 ni el punto decimal
        if (/[\D/.-]/.test(char)) {
            event.preventDefault();
        }

        // Verificar que no haya más de un punto decimal
        if (char === '.' && event.target.value.includes('.')) {
            event.preventDefault();
        }
    }

    const agregarProducto = async (e) => {
            e.preventDefault()
        // Verificar que todos los campos sean llenados
        if (
            referencia === '' ||
            nombre === '' ||
            cantidad === '' ||
            precioBase === '' ||
            imagen === '' ||
            descripcion === ''
        ) {
            swal({
                title: "Campos vacíos",
                text: "Todos los campos son obligatorios",
                icon: "warning",
                button: "Aceptar"
            })
            return
        }

        const nuevoProducto = {
            referencia,
            nombre,
            cantidad,
            precioBase,
            imagen,
            descripcion
        };

        try {
            const response = await fetch('http://localhost:4000/api/producto/agregarProducto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoProducto)
            });
            
            const data = await response.json();

            if (response.ok) {
                swal({
                    title: "Producto Creado Correctamente",
                    icon: "success",
                    buttons: {
                        accept: {
                            text: "Aceptar",
                            value: true,
                            visible: true,
                            className: "btn-primary",
                            closeModal: true
                        }
                    }
                }).then((value) => {
                    if (value) {
                        window.location.href = "/admin/listaproductos";
                    }
                });
            } else {

                if(data.msg){
                    throw new Error(data.msg);
                }else{
                    throw new Error(data.error);
                }
            }
        } catch (error) {
            console.error(error);
            swal({
                title: `${error.message}`,
                text: "",
                icon: "warning",
                button: "Aceptar"
            })
        }
    };
    return (
        <>
            <section className="d-flex">
                <MenuLateral></MenuLateral>


                <main className="d-flex flex-column  border border-primary m-3 rounded">
                    <h3 className="text-center py-0 pt-3 my-0">CREAR PRODUCTO</h3>
                    <br />
                    <form className="formulario" action="">
                        <div className="contenedores d-flex justify-content-center flex-lg-row flex-column flex-sm-column mx-5 gap-5">
                            <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100">
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Referencia</label>
                                    <input type="text" className="form-control" placeholder="Referencia" required value={referencia} onChange={(e) => { setReferencia(e.target.value) }} />
                                </div>

                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Cantidad</label>
                                    <input type="text" className="form-control" placeholder="Cantidad" onKeyDown={validarNumericos} required value={cantidad} onChange={(e) => { setCantidad(e.target.value) }} />
                                </div>

                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Imagen</label>
                                    <input type="file" className="form-control" placeholder="Imagen" required value={imagen} onChange={(e) => { setImagen(e.target.value) }} />
                                </div>
                            </div>
                            <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0 w-100">
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" placeholder="Nombre" required onInput={validarTexto} value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                                </div>

                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Precio base</label>
                                    <input type="text" className="form-control" placeholder="Precio base" onKeyDown={validarNumericos} required value={precioBase} onChange={(e) => { setPrecioBase(e.target.value) }} />
                                </div>

                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Descripción</label>
                                    <textarea className="form-control" placeholder="Descripción" required value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }} />
                                </div>
                            </div>

                        </div>
                        <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5">
                            <div className="d-flex justify-content-center w-100">
                                <div className="div_botones ms-sm-0 w-100 d-flex justify-content-center">
                                    <button type="submit" className="btn btn-dark btn-styles" onClick={agregarProducto}>Guardar</button>
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
            </section>
        </>
    )
}

export default CrearProducto