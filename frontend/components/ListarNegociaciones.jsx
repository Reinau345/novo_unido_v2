import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import NegociacionIndividual from './NegociacionIndividual';
import useAuth from '../hooks/useAuth'
import MenuLateral from './MenuLateral';

const ListarNegociaciones = () => {
    const [datanegociaciones, setdatanegociacion] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const { auth } = useAuth()

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
        return (
            negociacion.numFactura && negociacion.numFactura.toLowerCase().includes(busqueda.toLowerCase()) ||
            negociacion.cliente && negociacion.cliente.toString().includes(busqueda)
        );
    })

    const ListarNegociaciones = filteredNegociaciones.length > 0 ? (
        filteredNegociaciones.map((negociacion) => (
            <NegociacionIndividual key={negociacion._id} negociacion={negociacion} setdatanegociacion={setdatanegociacion} />

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
    filteredNegociaciones.map((negociacion) => (
        <NegociacionIndividual key={negociacion._id} negociacion={negociacion} setdatanegociacion={setdatanegociacion} />
    ))

    return (
        <>
            <section className="d-flex">
                <MenuLateral></MenuLateral>
                <main className="d-flex flex-column  border border-primary m-4 rounded">
                    <div className="contenedor-tabla mx-3">
                        <h2 className="py-0 pt-5 my-0">LISTADO NEGOCIACIONES</h2>

                        <div className="contenerdor-boton-buscar my-4">
                            <div className="row">
                                <div className="col-sm-12 col-md-6 blo1 my-1">
                                    <Link className="text-center" to="/admin/crearnegociacion">
                                        <button type="submit" className="btn btn-dark px-3 btn-styles">Agregar nueva negociación</button>
                                    </Link>
                                </div>

                                <div className="col-sm-12 col-md-6 blo2 my-1">
                                    <form action="" className="div-search">
                                        <input type="text" className="search-style form-control rounded-pill" value={busqueda} onChange={searchData}
                                            placeholder="Buscar" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="table table-hover mb-5 border">
                                <thead className="table-secondary">
                                    <tr>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Factura</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Productos</th>
                                        <th scope="col">Cuotas</th>
                                        <th scope="col">Fecha Fin Gracia</th>
                                        <th scope="col">Total</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ListarNegociaciones}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};

export default ListarNegociaciones;