import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import PlandePagoIndividual from '../components/PlandepagoIndividual';
import useAuth from '../hooks/useAuth'

const ListarPlandepago = () => {
    const [dataplandePago, setdataPlandePago] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const { auth } = useAuth()

    useEffect(() => {
        fetch('http://localhost:4000/api/plandepago/obtenerplandepago')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error al obtener los datos del plan de pago');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setdataPlandePago(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function searchData(event) {
        event.preventDefault();
        setBusqueda(event.target.value);
    }

    const filteredPlandePago = dataplandePago.filter((plandePago) => {
        return (
            (typeof plandePago.fechaPago === 'string' && plandePago.fechaPago.toLowerCase().includes(busqueda.toLowerCase())) ||
            (typeof plandePago.valorPago === 'string' && plandePago.valorPago.toLowerCase().includes(busqueda.toLowerCase())) ||
            (typeof plandePago.cumplioPago === 'string' && plandePago.cumplioPago.toLowerCase().includes(busqueda.toLowerCase()))
        );
    });

    const listaPlandePagos = filteredPlandePago.length > 0 ? (
        filteredPlandePago.map(plandePago => (
            <PlandePagoIndividual key={plandePago._id} plandePago={plandePago} />
        ))
    ) : (
        <tr>
            <td colSpan="12">
                <div>
                    <h5 style={{ textAlign: 'center' }}>No se encontraron resultados</h5>
                </div>
            </td>
        </tr>
    );

    return (
        <>
            <section className="d-flex">
                <aside className="">
                    <ul className="d-flex flex-column justify-content-start w-100 px-0 my-0 mx-0">
                        <div className="d-flex justify-content-start align-items-center px-3 py-2">
                            <i className="py-3">
                                <img className="rounded-circle" src="https://www.novomatic.com/themes/novomatic/images/novomatic_n.svg" alt="logo" title="logo" width="35" height="35" />
                            </i>
                            <p className="mb-0 mx-3 text-icon-menu">{auth.nombre} {auth.apellido}</p>
                        </div>

                        <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="/admin/usuarios">
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

                        <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="/admin/listaplandepago">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-money-bill-1-wave mx-4" title="Planes de pago"></i>
                                <p className="text-icon-menu my-0">Planes de pago</p>
                            </div>
                        </Link>
                    </ul>
                </aside>

                <main className="d-flex flex-column">
                    <div className="contenedor-tabla mx-3">
                        <h2 className="py-0 pt-5 my-0">LISTADO PLANES DE PAGO</h2>
                        <div className="contenerdor-boton-buscar my-4">
                            <div className="row">
                                <div className="col-sm-12 col-md-6 blo1 my-1">
                                    <Link className="text-center" to="/admin/crearplandepago">
                                        <button type="submit" className="btn btn-dark px-3 btn-styles">Agregar nuevo plan de pago</button>
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

                        <table className="table table-hover mb-5 border">
                            <thead className="table-secondary">
                                <tr>
                                    <th scope="col">Fecha Pago</th>
                                    <th scope="col">Valor</th>
                                    <th scope="col">Cumplió</th>
                                    <th scope="col" style={{ textAlign: 'center' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaPlandePagos}
                            </tbody>
                        </table>
                    </div>
                </main>
            </section>
        </>
    );
};

export default ListarPlandepago;