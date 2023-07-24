import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa';
import useAuth from '../hooks/useAuth'
import MenuLateral from './MenuLateral';

const EditarNegociacion = (negociacion) => {
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
                setFechaGracia(datanegociacion.fechaGracia)
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
        if (selectedProductos.length === 0 || cantidad === '' || precioVenta === '') {
            console.log('Debe seleccionar un producto, ingresar una cantidad y un precio de venta');
            return;
        }

        const nuevoProducto = {
            tipoMaquina: selectedProductos,
            cantidad: Number(cantidad),
            precioBase: obtenerPrecioBase(selectedProductos),
            precioVenta: precioVenta, // Utilizar el valor del estado precioVenta
        };

        setProductosSeleccionados((prevProductos) => [...prevProductos, nuevoProducto]);
    };

    const obtenerPrecioBase = (producto) => {
        const productoEncontrado = dataproductos.find((p) => p.nombre === producto);
        return productoEncontrado ? productoEncontrado.precioBase : '';
    };

    const eliminarProducto = (index) => {
        const nuevosProductosSeleccionados = [...productosSeleccionados];
        nuevosProductosSeleccionados.splice(index, 1);
        setProductosSeleccionados(nuevosProductosSeleccionados);
    };

    const limpiarCampos = () => {
        setSelectedProductos([]);
        setCantidad([]);
        setPrecioVenta([]);
    };

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

    const handleCantidadChange = (e, index) => {
        const nuevosProductosSeleccionados = [...productosSeleccionados];
        nuevosProductosSeleccionados[index].cantidad = Number(e.target.textContent);
        setProductosSeleccionados(nuevosProductosSeleccionados);
    };

    const handlePrecioVentaChange = (e, index) => {
        const nuevosProductosSeleccionados = [...productosSeleccionados];
        nuevosProductosSeleccionados[index].precioVenta = e.target.textContent;
        setProductosSeleccionados(nuevosProductosSeleccionados);
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
            fechaGracia === '' ||
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
            fechaGracia,
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
                <MenuLateral></MenuLateral>
                <main className="d-flex flex-column  border border-primary m-4 rounded">
                    <h2 className="text-center py-0 pt-5 my-0">EDITAR NEGOCIACIÓN</h2>
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
                                <br />
                                <h2>Agregar Nuevos Productos</h2>
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
                                </div>
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
                                <h2>borrar</h2>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Cantidad</label>
                                    {selectedProductos.length > 0 ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cantidad"
                                            required
                                            onChange={(e) => {setCantidad(e.target.value)}}
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
                                </div>
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
                                        <th scope="col" style={{ textAlign: 'center' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosSeleccionados.map((producto, index) => (
                                        <tr key={index}>
                                            <td>{producto.tipoMaquina}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>{producto.precioBase}</td>
                                            <td>{producto.precioVenta}</td>
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
                                </tbody>
                            </table>
                        </div>
                        <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5">
                            <div className="d-flex justify-content-center w-100">
                                <div className="div_botones ms-sm-0 w-100 d-flex justify-content-center">
                                    <button type="submit" className="btn btn-dark btn-styles" onClick={actualizarNegociacion}>Guardar</button>
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