import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import MenuLateral from './MenuLateral';

const EditarProducto = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
        const charCode = event.keyCode || event.which;
        const char = String.fromCharCode(charCode);

        // Permitir la tecla de retroceso (backspace) y la tecla de suprimir (delete)
        if (charCode === 8 || charCode === 46 || charCode === 9 || char === ' ') {
            return;
        }

        // Verificar si el carácter es un número o un carácter especial
        if (/[0-9\W_]/.test(char)) {
            event.preventDefault();
        }
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

    useEffect(() => {
        fetch(`http://localhost:4000/api/producto/obtenerdataproducto/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error al obtener los datos del producto');
                }
                return res.json();
            })
            .then((dataproducto) => {
                setReferencia(dataproducto.referencia)
                setNombre(dataproducto.nombre)
                setCantidad(dataproducto.cantidad)
                setPrecioBase(dataproducto.precioBase)
                setImagen(dataproducto.imagen)
                setDescripcion(dataproducto.descripcion)
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    //Función para actualizar
    const actualizarProducto = async () => {

        // Verificar que todos los campos sean llenados
        if (
            referencia === '' ||
            nombre === '' ||
            cantidad === '' ||
            precioBase === '' ||
            imagen === '' ||
            descripcion === ''
        ) {
            console.error('Todos los campos son obligatorios');
            return;
        }

        const productoActualizado = {
            referencia,
            nombre,
            cantidad,
            precioBase,
            imagen,
            descripcion
        };

        try {
            const response = await fetch(`http://localhost:4000/api/producto/actualizarProducto/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productoActualizado)
            });

            if (response.ok) {
                const data = await response.json();
                // console.log(data.message); // Producto actualizado correctamente
            } else {
                throw new Error('Error al actualizar el producto');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section className="d-flex">
                <MenuLateral></MenuLateral>

                <main className="d-flex flex-column  border border-primary m-3 rounded">
                    <h3 className="text-center py-0 pt-3 my-0">EDITAR PRODUCTO</h3>
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
                                    <input type="file" className="form-control" placeholder="Imagen" required onChange={(e) => { setImagen(e.target.files[0]) }} />
                                </div>
                            </div>
                            <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0 w-100">
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" placeholder="Nombre" onKeyDown={validarTexto} required value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                                </div>

                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Precio base</label>
                                    <input type="number" className="form-control" placeholder="Precio base" onKeyDown={validarNumericos} required value={precioBase} onChange={(e) => { setPrecioBase(e.target.value) }} />
                                </div>

                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Descripción</label>
                                    <input type="text" className="form-control" placeholder="Descripción" required value={descripcion} onChange={(e) => { setDescripcion(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5">
                            <div className="d-flex justify-content-center w-100">
                                <div className="div_botones ms-sm-0 w-100 d-flex justify-content-center">
                                    <button type="submit" className="btn btn-dark btn-styles" onClick={actualizarProducto}>Guardar</button>
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
    );
};

export default EditarProducto;