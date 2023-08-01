import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { parseISO } from 'date-fns';
import useAuth from '../hooks/useAuth'
import MenuLateral from './MenuLateral';

const CrearNegociacion = () => {
    const navigate = useNavigate();

    const [dataclientes, setDataClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState('');
    const [numFactura, setNumFactura] = useState('');
    const [dataproductos, setDataProductos] = useState([]);
    const [selectedProductos, setSelectedProductos] = useState([]);
    const [cantidad, setCantidad] = useState([]);
    const [precioBase, setPrecioBase] = useState([]);
    const [precioVenta, setPrecioVenta] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [numCuotas, setNumCuotas] = useState('');
    const [tasa, setTasa] = useState('');
    const [anticipo, setAnticipo] = useState('');
    const [interes, setInteres] = useState('');
    const [fechaGracia, setFechaGracia] = useState('');
    const [total, setTotal] = useState('');
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    const handleCancelar = () => {
        navigate(-1); // Regresa a la ubicación anterior
    };
    const { auth } = useAuth()

    useEffect(() => {
        fetch('http://localhost:4000/api/cliente/obtenerCliente')
            .then(res => res.json())
            .then(data => {
                setDataClientes(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:4000/api/producto/obtenerProducto')
            .then(res => res.json())
            .then(data => {
                setDataProductos(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

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

    //Eliminar los productos del listado de comprados
    function eliminarProducto(index) {
        const productosActualizados = [...productosSeleccionados];
        productosActualizados.splice(index, 1);
        setProductosSeleccionados(productosActualizados);
    }

    const agregarNegociacion = async () => {

        // Verificar que todos los campos sean llenados
        if (
            selectedCliente === '' ||
            numFactura === '' ||
            numCuotas === '' ||
            tasa === '' ||
            anticipo === '' ||
            interes === '' ||
            fechaGracia === '' ||
            total === ''
        ) {
            swal({
                title: "1Campos vacíos",
                text: "Todos los campos son obligatorios",
                icon: "warning",
                button: "Aceptar"
            });
<<<<<<< HEAD
            return;
        }

=======
            return
        } 
>>>>>>> juan
        for (let i = 0; i < selectedProductos.length; i++) {
            if (!cantidad[i] || !precioVenta[i] || !productosSeleccionados[i]) {
                swal({
                    title: "2Campos vacíos",
                    text: "Todos los campos son obligatorios",
                    icon: "warning",
                    button: "Aceptar"
                });
                return;
            }
        }

        const tipoMaquinaArray = productosSeleccionados.map((producto) => producto.tipoMaquina);
        const cantidadArray = productosSeleccionados.map((producto) => Number(producto.cantidad));
        const precioBaseArray = productosSeleccionados.map((producto) => Number(producto.precioBase));
        const precioVentaArray = productosSeleccionados.map((producto) => Number(producto.precioVenta));

        const nuevaNegociacion = {
            cliente: selectedCliente,
            numFactura,
            tipoMaquina: tipoMaquinaArray,
            cantidad: cantidadArray,
            precioBase: precioBaseArray,
            precioVenta: precioVentaArray,
            numCuotas,
            tasa,
            anticipo,
            interes,
            fechaGracia: parseISO(fechaGracia),
            total,
            productos: productosSeleccionados, // Agregar productos seleccionados
        };

        try {
            const response = await fetch('http://localhost:4000/api/negociacion/agregarNegociacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaNegociacion)
            });

            const data = await response.json();

            if (response.ok) {
                swal({
                    title: "Negociación Creada Correctamente",
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

                if(data.msg){
                    throw new Error(data.msg);
                }else{
                    throw new Error(data.error);
                }
            }
        } catch (error) {
<<<<<<< HEAD
            swal({
                title: "Error",
                text: "Ha ocurrido un error al crear la negociación.",
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
=======
            console.error(error);
            swal({
                title: `${error.message}`,
                text: "",
                icon: "warning",
                button: "Aceptar"
              })
>>>>>>> juan
        }
    };

    const agregarProducto = () => {
        if (selectedProductos.length === 0) {
            console.log('Debe seleccionar al menos un producto');
            swal({
                title: "Debe Agregar al menos un producto",
                text: "",
                icon: "warning",
                button: "Aceptar"
            });
            return;
        }

        const obtenerPrecioBase = (producto) => {
            const productoEncontrado = dataproductos.find((p) => p.nombre === producto);
            return productoEncontrado ? productoEncontrado.precioBase : '';
        };

        const nuevosProductos = selectedProductos.map((producto, index) => ({
            tipoMaquina: producto,
            cantidad: Number(cantidad[index]), // Convertir la cadena a número
            precioBase: Number(obtenerPrecioBase(producto)),
            precioVenta: Number(precioVenta[index]),
        }));

        setCantidad(prevCantidad => [...prevCantidad, ...nuevosCantidad]);
        setPrecioBase(prevPrecioBase => [...prevPrecioBase, ...nuevosPreciosBase]);
        setPrecioVenta(prevPrecioVenta => [...prevPrecioVenta, ...nuevosPreciosVenta]);

        const nuevosCantidad = nuevosProductos.map((producto) => producto.cantidad);
        const nuevosPreciosBase = nuevosProductos.map((producto) => producto.precioBase); // Obtener el array de precios base
        const nuevosPreciosVenta = nuevosProductos.map((producto) => producto.precioVenta);

        setProductosSeleccionados((prevProductos) => {
            const nuevosProductosSeleccionados = [...prevProductos, ...nuevosProductos];
            console.log(nuevosProductosSeleccionados);
            return nuevosProductosSeleccionados;
        });

        // Almacenar los precios base en un estado separado
        setPrecioBase(prevPreciosBase => [...prevPreciosBase, ...nuevosPreciosBase]);
    };

    const limpiarCampos = () => {
        setSelectedProductos([]);
        setCantidad([]);
        setPrecioVenta([]);
    };

    return (
        <>
            <section className="d-flex">
                <MenuLateral></MenuLateral>


                <main className="d-flex flex-column  border border-primary m-3 rounded">
                    <h3 className="text-center py-0 pt-3 my-0">CREAR NEGOCIACIÓN</h3>
                    <br />
                    <form className="formulario" action="">
                        <div className="contenedores d-flex justify-content-center flex-lg-row flex-column flex-sm-column mx-5 gap-5">
                            <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100">
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Cliente</label>
                                    <select id="cliente" className="form-select" value={selectedCliente} onChange={(e) => setSelectedCliente(e.target.value)}>
                                        <option value="">Seleccionar cliente</option>
                                        {dataclientes.map(cliente => (
                                            <option key={cliente.id} value={cliente.nombre}>
                                                {cliente.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Cantidad Cuotas</label>
                                    <select className="form-select" required value={numCuotas} onChange={(e) => { setNumCuotas(e.target.value) }}>
                                        <option value="">Seleccionar</option>
                                        {Array.from({ length: 24 }, (_, index) => (
                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Anticipo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Porcentaje anticipo"
                                        required value={anticipo}
                                        onChange={(e) => { setAnticipo(e.target.value) }}
                                    />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Fecha Fin Gracia</label>
                                    <input type="date" className="form-control" placeholder="Fecha Facturación" required value={fechaGracia} onChange={(e) => { setFechaGracia(e.target.value) }} />
                                </div>
                                <h2>Seleccionar Productos</h2>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Producto</label>
                                    <select
                                        id="producto"
                                        className="form-select"
                                        required
                                        value={selectedProductos.join(',')} // Convertir el array en una cadena separada por comas
                                        onChange={(e) =>
                                            setSelectedProductos(
                                                Array.from(e.target.selectedOptions, (option) => option.value)
                                            )}>
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
                                        selectedProductos.map((producto, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                className="form-control"
                                                placeholder="$"
                                                required
                                                onKeyDown={validarNumericos}
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
                                            placeholder="$"
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0 w-100">
                                <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0 w-100">
                                    <div className="mb-3 w-100">
                                        <label className="form-label fw-bold">Factura</label>
                                        <input type="text" className="form-control" placeholder="Número de Factura" required value={numFactura} onChange={(e) => { setNumFactura(e.target.value) }} />
                                    </div>
                                    <div className="mb-3 w-100">
                                        <label className="form-label fw-bold">Tasa</label>
                                        <input type="text" className="form-control" placeholder="Porcentaje tasa" required value={tasa} onChange={(e) => { setTasa(e.target.value) }} />
                                    </div>
                                    <div className="mb-3 w-100">
                                        <label className="form-label fw-bold">Interes</label>
                                        <input type="text" className="form-control" placeholder="Porcentaje interes" required value={interes} onChange={(e) => { setInteres(e.target.value) }} />
                                    </div>
                                    <div className="mb-3 w-100">
                                        <label className="form-label fw-bold">Total</label>
                                        <input type="text" className="form-control" placeholder="$" required onKeyDown={validarNumericos} value={total} onChange={(e) => { setTotal(e.target.value) }} />
                                    </div>
                                    <h2>borrar</h2>
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
                                                    onKeyDown={validarNumericos}
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
                                    <br />
                                    <div>
                                        <button type="button" className="btn btn-dark " id="producto" required value={selectedProductos} onChange={e => setSelectedProductos(e.target.value)} onClick={agregarProducto} style={{ marginRight: 10 }}><i className="fa fa-add" /></button>
                                        <button type="button" className="btn btn-dark" onClick={limpiarCampos}><i className="fa fa-broom" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
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
                                        <tr key={producto.id || index}>
                                            <td>{producto.tipoMaquina}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>{producto.precioBase}</td>
                                            <td>{producto.precioVenta}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <Link>
                                                    <FaTimes size={35} style={{ color: 'black' }} onClick={() => eliminarProducto(index)} />
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
                                    <button type="button" className="btn btn-dark btn-styles" onClick={agregarNegociacion}>Guardar</button>
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

export default CrearNegociacion