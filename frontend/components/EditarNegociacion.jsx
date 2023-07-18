import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom'
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
    const [cantidad, setCantidad] = useState([]);
    const [precioVenta, setPrecioVenta] = useState([]);
    const [numCuotas, setNumCuotas] = useState('');
    const [tasa, setTasa] = useState('');
    const [anticipo, setAnticipo] = useState('');
    const [interes, setInteres] = useState('');
    const [fechaFacturacion, setFechaFacturacion] = useState('');
    const [total, setTotal] = useState('');
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const { auth } = useAuth()

    const handleCancelar = () => {
        navigate(-1); // Regresa a la ubicación anterior
    };

    useEffect(() => {
        fetch(`http://localhost:4000/api/negociacion/obtenerdatanegociacion/${id}`)
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
                setPrecioVenta(datanegociacion.precioVenta);
                setNumCuotas(datanegociacion.numCuotas);
                setTasa(datanegociacion.tasa);
                setAnticipo(datanegociacion.anticipo);
                setInteres(datanegociacion.interes);
                setFechaFacturacion(datanegociacion.fechaFacturacion)
                setTotal(datanegociacion.total)
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    useEffect(() => {
        fetch('http://localhost:4000/api/cliente/obtenerCliente')
            .then((res) => res.json())
            .then((data) => {
                setDataClientes(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:4000/api/producto/obtenerProducto')
            .then((res) => res.json())
            .then((data) => {
                setDataProductos(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const agregarProducto = () => {
        if (selectedProductos.length === 0) {
            console.log('Debe seleccionar al menos un producto');
            return;
        }

        const nuevosProductos = selectedProductos.map((producto, index) => ({
            tipoMaquina: producto,
            cantidad: Number(cantidad[index]), // Convertir la cadena a número
            precioBase: obtenerPrecioBase(producto),
            precioVenta: Number(precioVenta[index]),
        }));

        setProductosSeleccionados((prevProductos) => {
            const nuevosProductosSeleccionados = [...prevProductos, ...nuevosProductos];
            console.log(nuevosProductosSeleccionados);
            return nuevosProductosSeleccionados;
        });
    };

    const obtenerPrecioBase = (producto) => {
        const productoEncontrado = dataproductos.find((p) => p.nombre === producto);
        return productoEncontrado ? productoEncontrado.precioBase : '';
    };

    const limpiarCampos = () => {
        setSelectedProductos([]);
        setCantidad([]);
        setPrecioVenta([]);
    };

    //Función para actualizar
    const actualizarNegociacion = async () => {

        // Verificar que todos los campos sean llenados
        if (
            selectedCliente === '' ||
            numFactura === '' ||
            selectedProductos === '' ||
            cantidad === '' ||
            precioVenta === '' ||
            numCuotas === '' ||
            tasa === '' ||
            anticipo === '' ||
            interes === '' ||
            fechaFacturacion === '' ||
            total === '' ||
            productosSeleccionados === ''
        ) {
            console.error('Todos los campos son obligatorios');
            return;
        }

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
            fechaFacturacion,
            total
        };

        //Petición usando fetch
        try {
            const response = await fetch(`http://localhost:4000/api/negociacion/actualizarNegociacion/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(negociacionActualizada)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Cliente actualizado correctamente
            } else {
                throw new Error('Error al actualizar la negociación');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section className="d-flex">
                {/* <aside className="">
                    <ul className="d-flex flex-column justify-content-start w-100 px-0 my-0 mx-0">
                        <div className="d-flex justify-content-start align-items-center px-3 py-2">
                            <i className="py-3">
                                <img className="rounded-circle" src="https://www.novomatic.com/themes/novomatic/images/novomatic_n.svg" alt="logo" title="logo" width="35" height="35" />
                            </i>
                            <p className="mb-0 mx-3 text-icon-menu">{auth.nombre} {auth.apellido}</p>
                        </div>
                        <Link className="d-flex justify-content-start py-2  border-bottom border-primary" to="/admin/usuarios">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-user-tie mx-4" title="Usuarios"></i>
                                <p className="text-icon-menu my-0">Usuarios</p>
                            </div>
                        </Link>
                        <Link className="d-flex justify-content-start py-2  border-bottom border-primary" to="/admin/listaclientes">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-user mx-4" title="Clientes"></i>
                                <p className="text-icon-menu my-0">Clientes</p>
                            </div>
                        </Link>
                        <Link className="d-flex justify-content-start py-2  border-bottom border-primary" to="/admin/listaproductos">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-box-open mx-4" title="Productos"></i>
                                <p className="text-icon-menu my-0">Productos</p>
                            </div>
                        </Link>
                        <Link className="d-flex justify-content-start py-2  border-bottom border-primary" to="/admin/listanegociaciones">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-sack-dollar mx-4" title="Negociaciones"></i>
                                <p className="text-icon-menu my-0">Negociaciones</p>
                            </div>
                        </Link>
                        <Link className="d-flex justify-content-between py-2  border-bottom border-primary" to="/admin/listaplandepago">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-money-bill-1-wave mx-4" title="Planes de pago"></i>
                                <p className="text-icon-menu my-0">Planes de pago</p>
                            </div>
                        </Link>
                    </ul>
                </aside> */}

                <MenuLateral></MenuLateral>

                <main className="d-flex flex-column  border border-primary m-4 rounded">
                    <h1 className="text-center py-0 pt-5 my-0">EDITAR NEGOCIACIÓN</h1>
                    <Link to="/listanegociaciones" style={{ color: 'black', textDecoration: 'none' }}>
                        <div className="controles d-flex align-items-center">
                            <i className="icon-menu fa-solid fa-angles-left"> Volver </i>
                        </div>
                    </Link>
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
                                    <label className="form-label fw-bold">Producto</label>
                                    <select className="form-select" value={selectedProductos}
                                        onChange={(e) => setSelectedProductos(e.target.value)}>
                                        <option value="">Seleccione un producto</option>
                                        {dataproductos.map((producto) => (
                                            <option key={producto.id} value={producto.id}>
                                                {producto.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Precio venta</label>
                                    {selectedProductos.length > 0 ? (
                                        selectedProductos.map((producto, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                className="form-control"
                                                placeholder="Precio venta"
                                                required
                                                value={precioVenta[index] || ''}
                                                onChange={(e) => {
                                                    const nuevosValores = [...precioVenta];
                                                    nuevosValores[index] = e.target.value;
                                                    setPrecioVenta(nuevosValores);
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Precio venta"
                                            disabled
                                        />
                                    )}
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
                                    <label className="form-label fw-bold">Fecha Facturacion</label>
                                    <input type="date" className="form-control" placeholder="Fecha de Facturacion" required value={fechaFacturacion} onChange={(e) => { setFechaFacturacion(e.target.value) }} />
                                </div>
                            </div>
                            <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0 w-100">
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Factura</label>
                                    <input type="text" className="form-control" placeholder="Número de la Factura" required value={numFactura} onChange={(e) => { setNumFactura(e.target.value) }} />
                                </div>

                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Cantidad</label>
                                    {selectedProductos.length > 0 ? (
                                        selectedProductos.map((producto, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                className="form-control"
                                                placeholder="Cantidad"
                                                required
                                                value={cantidad[index] || ''}
                                                onChange={(e) => {
                                                    const nuevosValores = [...cantidad];
                                                    nuevosValores[index] = e.target.value;
                                                    setCantidad(nuevosValores);
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cantidad"
                                            disabled
                                        />
                                    )}
                                </div>
                                <div className="mb-3 w-100">
                                    <button type="button" className="btn btn-dark btn-styles" id="producto" required value={selectedProductos} onChange={e => setSelectedProductos(e.target.value)} onClick={agregarProducto} style={{ marginRight: 10 }}>Agregar</button>
                                    <button type="button" className="btn btn-secondary btn-styles" onClick={limpiarCampos}>Limpiar</button>
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Tasa</label>
                                    <input type="text" className="form-control" placeholder="Porcentaje tasa" required value={tasa} onChange={(e) => { setTasa(e.target.value) }} />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Interes</label>
                                    <input type="number" className="form-control" placeholder="Interes" required value={interes} onChange={(e) => { setInteres(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5">
                            <div className="d-flex justify-content-center w-100">
                                <div className="div_botones ms-sm-0 w-100">
                                    <button type="submit" className="btn btn-dark w-100 btn-styles" onClick={actualizarNegociacion}>Guardar</button>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center w-100">
                                <div className="div_botones me-sm-0 w-100">
                                    <button type="button" className="btn btn-dark w-100 btn-styles" onClick={handleCancelar}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <table className="table table-hover mb-5 border" style={{ maxWidth: 800 }}>
                            <thead className="table-secondary">
                                <tr>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Precio Base</th>
                                    <th scope="col">Precio Venta</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosSeleccionados.map((producto, index) => (
                                    <tr key={producto.id || index}>
                                        <td>{producto.tipoMaquina}</td>
                                        <td>{producto.cantidad}</td>
                                        <td>{producto.precioBase}</td>
                                        <td>{producto.precioVenta}</td>
                                        <td>
                                            <Link>
                                                <FaTimes size={35} style={{ color: 'black' }} onClick={() => eliminarProducto(index)} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </section>
        </>
    );
};

export default EditarNegociacion;