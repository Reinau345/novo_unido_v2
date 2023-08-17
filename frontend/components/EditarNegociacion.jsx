import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import MenuLateral from './MenuLateral';

const EditarNegociacion = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    //Hooks
    const [dataclientes, setDataClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState('');
    const [numFactura, setNumFactura] = useState('');
    const [dataproductos, setDataProductos] = useState([]);
    const [selectedProductos, setSelectedProductos] = useState([]);
    const [cantidad, setCantidad] = useState('');
    const [precioVenta, setPrecioVenta] = useState([]);
    const [numCuotas, setNumCuotas] = useState('');
    const [tasa, setTasa] = useState('');
    const [anticipo, setAnticipo] = useState('');
    const [interes, setInteres] = useState('');
    const [fechaGracia, setFechaGracia] = useState('');
    const [total, setTotal] = useState('');
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [precioBase, setPrecioBase] = useState('');

    const { auth } = useAuth()
    const [datanegociaciones, setdatanegociacion] = useState([]);

    const handleCancelar = () => {
        navigate(-1); // Regresa a la ubicación anterior
    };

    useEffect(() => {
        const url = `negociacion/obtenerNegociaciones`;
        // fetch('http://localhost:4000/api/negociacion/obtenerNegociaciones')
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${url}`)
            .then(res => res.json())
            .then(data => {
                setdatanegociacion(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    useEffect(() => {
        const url = `negociacion/obtenerdatanegociacion/${id}`
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${url}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error al obtener los datos de la negociación');
                }
                return res.json();
            })
            .then((datanegociacion) => {
                setSelectedCliente(datanegociacion.cliente);
                setNumFactura(datanegociacion.numFactura)
                setSelectedProductos(datanegociacion.tipoMaquina);
                setCantidad(datanegociacion.cantidad);
                setPrecioBase(datanegociacion.precioBase)
                setPrecioVenta(datanegociacion.precioVenta);
                setNumCuotas(datanegociacion.numCuotas);
                setTasa(datanegociacion.tasa);
                setAnticipo(datanegociacion.anticipo);
                setInteres(datanegociacion.interes);
                // Convertir la fecha al formato "YYYY-MM-DD" antes de asignarla al estado
                if (datanegociacion.fechaGracia) {
                    const fechaGraciaFormatted = new Date(datanegociacion.fechaGracia)
                        .toISOString()
                        .slice(0, 10);
                    setFechaGracia(fechaGraciaFormatted);
                } else {
                    setFechaGracia('');
                }

                setTotal(datanegociacion.total);
                setProductosSeleccionados(datanegociacion.productosSeleccionados);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    useEffect(() => {
        const url = ``;
        // fetch('http://localhost:4000/api/cliente/obtenerCliente')
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${url}`)
            .then((res) => res.json())
            .then((data) => {
                setDataClientes(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const url = `producto/obtenerProducto`;
        // fetch('http://localhost:4000/api/producto/obtenerProducto')
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${url}`)
            .then((res) => res.json())
            .then((data) => {
                setDataProductos(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

        // Define una función para actualizar los valores editados en la tabla
        const handleProductoEdit = (index, field, value) => {
            const productosActualizados = [...selectedProductos];
            productosActualizados[index][field] = value;
            setSelectedProductos(productosActualizados);
        };

    // const agregarProducto = () => {
    //     if (selectedProductos.length === 0 || cantidad === '' || precioVenta === '') {
    //         console.log('Debe seleccionar un producto, ingresar una cantidad y un precio de venta');
    //         return;
    //     }

    //     const obtenerPrecioBase = (producto) => {
    //         const productoEncontrado = dataproductos.find((p) => p.nombre === producto);
    //         return productoEncontrado ? productoEncontrado.precioBase : '';

    //     };

    //     const nuevoProducto = {
    //         tipoMaquina: selectedProductos,
    //         cantidad: Number(cantidad),
    //         precioBase: obtenerPrecioBase(selectedProductos),
    //         precioVenta: precioVenta, // Utilizar el valor del estado precioVenta
    //     };

    //     setProductosSeleccionados((prevProductos) => [...prevProductos, nuevoProducto]);
    // };

    //Eliminar los productos del listado de comprados
    // function eliminarProducto(index) {
    //     const productosActualizados = [...productosSeleccionados];
    //     productosActualizados.splice(index, 1);
    //     setProductosSeleccionados(productosActualizados);
    // }

    // const limpiarCampos = () => {
    //     setSelectedProductos([]);
    //     setCantidad([]);
    //     setPrecioVenta([]);
    // };

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

    //Función para actualizar
    const actualizarNegociacion = async () => {

        // Verificar que todos los campos sean llenados
        // if (
        //     selectedCliente === '' ||
        //     numFactura === '' ||
        //     selectedProductos === '' ||
        //     cantidad === '' ||
        //     precioVenta === '' ||
        //     numCuotas === '' ||
        //     tasa === '' ||
        //     anticipo === '' ||
        //     interes === '' ||
        //     fechaGracia === '' ||
        //     total === '' ||
        //     productosSeleccionados === ''
        // ) {
        //     swal({
        //         title: "Campos vacíos",
        //         text: "Todos los campos son obligatorios",
        //         icon: "warning",
        //         button: "Aceptar"
        //     })
        // }

        const negociacionActualizada = {
            cliente: selectedCliente,
            numFactura,
            tipoMaquina: selectedProductos,
            cantidad,
            precioVenta,
            numCuotas,
            tasa,
            anticipo,
            interes,
            fechaGracia,
            total,
            productosSeleccionados,
            precioBase
        };

        //Petición usando fetch
        try {
            const url = `negociacion/actualizarNegociacion/${id}`
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(negociacionActualizada)
            });

            if (response.ok) {
                const data = await response.json();
                swal({
                    title: "Actualización exitosa",
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
                        window.location.href = "/admin/listanegociaciones";
                    }
                });
            } else {
                throw new Error('Error al actualizar la negociación');
            }
        } catch (error) {
            console.error(error);
            swal({
                title: "Error",
                text: "Ha ocurrido un error al actualizar la negociación.",
                icon: "error",
                buttons: {
                    accept: {
                        text: "Aceptar",
                        value: true,
                        visible: true,
                        className: "btn-danger",
                        closeModal: true
                    }
                }
            });
        }
    };

    return (
        <>
            <section className="d-flex">
                <MenuLateral></MenuLateral>

                <main className="d-flex flex-column  border border-primary m-3 rounded">
                    <h3 className="text-center py-0 pt-3 my-0">EDITAR NEGOCIACIÓN</h3>
                    <br />
                    <form className="formulario" action="">
                        <div className="contenedores d-flex justify-content-center flex-lg-row flex-column flex-sm-column mx-5 gap-5">
                            <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100">
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Cliente</label>
                                    <select className="form-select" value={selectedCliente}
                                        onChange={(e) => setSelectedCliente(e.target.value)}>
                                        <option value="">Seleccione un cliente</option>
                                        {dataclientes.map((cliente) => (
                                            <option key={cliente.id} value={cliente.id}>
                                                {cliente.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Cantidad Cuotas</label>
                                    <select className="form-select" required value={numCuotas} onChange={(e) => { setNumCuotas(e.target.value) }}>
                                        {Array.from({ length: 24 }, (_, index) => (
                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Anticipo</label>
                                    <input type="number" className="form-control" id="anticipo" aria-describedby="emailHelp" placeholder="anticipo" required value={anticipo} onChange={(e) => { setAnticipo(e.target.value) }} />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Fecha Fin Gracia</label>
                                    <input type="date" className="form-control" placeholder="Fecha de Facturacion" required value={fechaGracia} onChange={(e) => { setFechaGracia(e.target.value) }} />
                                </div>
                                {/* <h2>Agregar Nuevos Productos</h2>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Producto</label>
                                    <select
                                        id="producto"
                                        className="form-select"
                                        required
                                        value={selectedProductos} // Utiliza el valor seleccionado directamente
                                        onChange={(e) => setSelectedProductos(e.target.value)}>
                                        <option value="">Seleccionar producto</option>
                                        {dataproductos.map((producto) => (
                                            <option key={producto.codigo} value={producto.nombre}>
                                                {producto.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Precio venta</label>
                                    {selectedProductos.length > 0 ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Precio venta"
                                            required
                                            onChange={(e) => setPrecioVenta(e.target.value)}
                                            onKeyDown={validarNumericos}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Precio venta"
                                            disabled
                                        />
                                    )}
                                </div> */}
                            </div>
                            <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0 w-100">
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Factura</label>
                                    <input type="text" className="form-control" placeholder="Número de la Factura" required value={numFactura} onChange={(e) => { setNumFactura(e.target.value) }} />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Tasa</label>
                                    <input type="text" className="form-control" placeholder="Porcentaje tasa" required value={tasa} onChange={(e) => { setTasa(e.target.value) }} />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Interes</label>
                                    <input type="number" className="form-control" placeholder="Interes" required value={interes} onChange={(e) => { setInteres(e.target.value) }} />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Total</label>
                                    <input type="text" className="form-control" placeholder="Total" required value={total} onChange={(e) => { setTotal(e.target.value) }} />
                                </div>
                                <br />
                                <div className="mb-3 w-100">
                                    {/* <label className="form-label fw-bold"></label>
                                        <input type="text" className="form-control" }} /> */}
                                    {/* <label className="form-label fw-bold"></label>
                                        <input type="text" className="form-control"/> */}
                                </div>
                                {/* <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Cantidad</label>
                                    {selectedProductos.length > 0 ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cantidad"
                                            required
                                            onChange={(e) => { setCantidad(e.target.value) }}
                                            onKeyDown={validarNumericos}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cantidad"
                                            disabled
                                        />
                                    )}
                                </div>
                                <div>
                                    <button type="button" className="btn btn-dark " id="producto" required value={selectedProductos} onChange={e => setSelectedProductos(e.target.value)} onClick={agregarProducto} style={{ marginRight: 10 }}><i className="fa fa-add" /></button>
                                    <button type="button" className="btn btn-dark" onClick={limpiarCampos}><i className="fa fa-broom" /></button>
                                </div> */}
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <table className="table table-hover mb-5 border" style={{ maxWidth: 800 }}>
                                <thead className="table-secondary">
                                    <tr>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Precio Base</th>
                                        <th scope="col">Precio Venta</th>
                                        {/* <th scope="col" style={{ textAlign: 'center' }}>Acciones</th> */}
                                    </tr>
                                </thead>
                                {/* <tbody>
                                    {selectedProductos.map((producto, index) => (
                                        <tr key={index}>
                                            <td>{producto}</td>
                                            <td>
                                                {Array.isArray(cantidad) ? cantidad[index] : cantidad}
                                            </td>
                                            <td>
                                                {Array.isArray(precioBase) ? precioBase[index] : precioBase}
                                            </td>
                                            <td>
                                                {Array.isArray(precioVenta) ? precioVenta[index] : precioVenta}
                                            </td>
                                             <td style={{ textAlign: 'center' }}>
                                                <Link>
                                                    <FaTimes
                                                        size={35}
                                                        style={{ color: 'black' }}
                                                        onClick={() => eliminarProducto(index)}
                                                    />
                                                </Link>
                                            </td> 
                                        </tr>
                                    ))}
                                </tbody> */}
                                 <tbody>
                                    {selectedProductos.map((producto, index) => (
                                        <tr key={index}>
                                            <td>{producto}</td>
                                            <td>
                                                {Array.isArray(cantidad) ? cantidad[index] : cantidad}
                                            </td>
                                            <td>
                                                {Array.isArray(precioBase) ? precioBase[index] : precioBase}
                                            </td>
                                            <td>
                                                {Array.isArray(precioVenta) ? precioVenta[index] : precioVenta}
                                            </td>
                                             {/* <td style={{ textAlign: 'center' }}>
                                                <Link>
                                                    <FaTimes
                                                        size={35}
                                                        style={{ color: 'black' }}
                                                        onClick={() => eliminarProducto(index)}
                                                    />
                                                </Link>
                                            </td>  */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5">
                            <div className="d-flex justify-content-center w-100">
                                <div className="div_botones ms-sm-0 w-100 d-flex justify-content-center">
                                    <button type="button" className="btn btn-dark btn-styles" onClick={actualizarNegociacion}>Guardar</button>
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

export default EditarNegociacion;