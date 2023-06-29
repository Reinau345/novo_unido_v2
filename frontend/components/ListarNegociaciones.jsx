import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import NegociacionIndividual from './NegociacionIndividual';

const ListarNegociaciones = () => {
    const [datanegociaciones, setdatanegociacion] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        fetch('http://localhost:4000/api/negociacion/obtenerNegociaciones')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error al obtener los datos de la negociación');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setdatanegociacion(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function searchData(event) {
        event.preventDefault();
        setBusqueda(event.target.value);
    }

    const filteredNegociaciones = datanegociaciones.filter((negociacion) => {
        const busquedaLowerCase = busqueda.toLowerCase();

        return (
            (negociacion.anticipo !== null && negociacion.anticipo.toString().includes(busqueda)) ||
            (negociacion.tasa !== null && negociacion.tasa.toString().includes(busqueda)) ||
            (negociacion.interes !== null && negociacion.interes.toString().includes(busqueda)) ||
            (negociacion.numCuotas !== null && negociacion.numCuotas.toString().includes(busqueda)) ||
            (negociacion.numFactura !== null && negociacion.numFactura.toLowerCase().includes(busquedaLowerCase)) ||
            (negociacion.tipoMaquina !== null && negociacion.tipoMaquina.toLowerCase().includes(busquedaLowerCase)) ||
            (negociacion.cantidad !== null && negociacion.cantidad.toString().includes(busqueda)) ||
            (negociacion.referencia !== null && negociacion.referencia.toLowerCase().includes(busquedaLowerCase)) ||
            (negociacion.fechaFacturacion !== null && negociacion.fechaFacturacion.toString().includes(busqueda)) ||
            (negociacion.cliente !== null && negociacion.cliente.toLowerCase().includes(busquedaLowerCase))
        );
    });
    const ListarNegociaciones = datanegociaciones && filteredNegociaciones.map((negociacion) => {
        return (
            <NegociacionIndividual key={negociacion._id} negociacion={negociacion} setdatanegociacion={setdatanegociacion} />
        );
    });

    return (
        <>
            <section className="d-flex">
                <aside className="">
                    <ul className="d-flex flex-column justify-content-start w-100 px-0 my-0 mx-0">
                        <div className="d-flex justify-content-start align-items-center px-3 py-2">
                            <i className="py-3">
                                <img className="rounded-circle" src="https://e7.pngegg.com/pngimages/164/153/png-clipart-donut-the-simpsons-tapped-out-doughnut-homer-simpson-bart-simpson-krusty-the-clown-donut-food-bagel.png" alt="batman" title="batman" width="40" height="40" />
                            </i>
                            <p className="mb-0 mx-3 text-icon-menu">Nombre</p>
                        </div>

                        <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="listarVentas.html">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-user-tie mx-4" title="Usuarios"></i>
                                <p className="text-icon-menu my-0">Usuarios</p>
                            </div>
                        </Link>

                        <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="/admin/listaclientes">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-user mx-4" title="Clientes"></i>
                                <p className="text-icon-menu my-0">Clientes</p>
                            </div>
                        </Link>

                        <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="/admin/listaproductos">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-box-open mx-4" title="Productos"></i>
                                <p className="text-icon-menu my-0">Productos</p>
                            </div>
                        </Link>

                        <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="/admin/listanegociaciones">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-sack-dollar mx-4" title="Negociaciones"></i>
                                <p className="text-icon-menu my-0">Negociaciones</p>
                            </div>
                        </Link>

                        <Link className="d-flex justify-content-between py-2 border-bottom border-dark" to="/admin/listaplandepago">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-money-bill-1-wave mx-4" title="Planes de pago"></i>
                                <p className="text-icon-menu my-0">Planes de pago</p>
                            </div>
                        </Link>

                        {/* <Link className="d-flex justify-content-between py-2 border-bottom border-dark" to="listarVentas.html">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-book-open mx-4" title="Catálogo"></i>
                                <p className="text-icon-menu my-0">Catálogo de productos</p>
                            </div>
                        </Link> */}
                    </ul>
                </aside>

                <main className="d-flex flex-column">
                    <h1 className="text-center py-0 pt-5 my-0">LISTADO NEGOCIACIONES</h1>
                    <div className="contenedor-tabla mx-3">
                        <div className="contenerdor-boton-buscar my-4">
                            <div className="row">
                                <div className="col-sm-12 col-md-6 blo1 my-1">
                                    <Link className="text-center" to="/admin/crearnegociacion">
                                        <button type="submit" className="btn btn-dark px-5 btn-styles">Agregar nueva negociación</button>
                                    </Link>
                                </div>

                                <div className="col-sm-12 col-md-6 blo2 my-1">
                                    <form action="" className="div-search">
                                        <input type="text" className="search-style form-control rounded-pill" value={busqueda} onChange={searchData}
                                            placeholder="Search" />
                                    </form>
                                </div>
                            </div>
                        </div>

                        <table className="table table-hover mb-5">
                            <thead className="table-secondary">
                                <tr>
                                    <th scope="col">Anticipo</th>
                                    <th scope="col">Tasa</th>
                                    <th scope="col">Interes</th>
                                    <th scope="col">Número de Cuotas</th>
                                    <th scope="col">Número de Factura</th>
                                    <th scope="col">Tipo de Maquina</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Referencia</th>
                                    <th scope="col">Fecha de Facturacion</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Editar</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ListarNegociaciones}
                            </tbody>
                        </table>
                    </div>
                </main>
            </section>
        </>
    );
};

export default ListarNegociaciones;