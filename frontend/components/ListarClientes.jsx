import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ClienteIndividual from './ClienteIndividual';
import useAuth from '../hooks/useAuth'
import MenuLateral from './MenuLateral';

const ListarClientes = () => {
  const [dataclientes, setdatacliente] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const { auth } = useAuth();
  const [paginaActual, setPaginaActual] = useState(1);
  const clientesPorPagina = 4;
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/cliente/obtenerCliente')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al obtener los datos del cliente');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setdatacliente(data);
        setClientesFiltrados(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function searchData(event) {
    event.preventDefault();
    const searchValue = event.target.value;
    setBusqueda(searchValue);

    const filteredClientes = dataclientes.filter((cliente) => {
      return (
        cliente.cedula.toString().includes(searchValue) ||
        cliente.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
        cliente.grupo.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    setClientesFiltrados(filteredClientes);
    setPaginaActual(1);
  }

  const indexOfLastCliente = paginaActual * clientesPorPagina;
  const indexOfFirstCliente = indexOfLastCliente - clientesPorPagina;
  const clientesPaginados = clientesFiltrados.slice(indexOfFirstCliente, indexOfLastCliente);

  const listaclientes = clientesPaginados.length === 0 ? (
    <tr>
      <td colSpan="12">
        <div>
          <h5 style={{ textAlign: 'center' }}>No se encontraron resultados</h5>
        </div>
      </td>
    </tr>
  ) : (
    clientesPaginados.map((cliente) => {
      return <ClienteIndividual key={cliente._id} cliente={cliente} />;
    })
  );

  // Paginador
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(clientesFiltrados.length / clientesPorPagina); i++) {
    pageNumbers.push(i);
  }

  const paginador = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        className={`page-item ${paginaActual === number ? 'active' : ''}`}
        onClick={() => setPaginaActual(number)}
      >
        <button className="page-link">{number}</button>
      </li>
    );
  });

  return (
    <>
      <section className="d-flex">
        {/* <aside className="" id='menu_side'>
          <ul className="d-flex flex-column justify-content-start w-100 px-0 my-0 mx-0">
            <div className="d-flex justify-content-start align-items-center px-3 py-2">
              <i className="py-3">
              </i>
              <p id='contenedor-logo-imagen-lateral'>
                <img id="logo-imagen-lateral" src={"../public/img/logo_letra2.png"} alt="Bootstrap" />
              </p>
              
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

        <main className="d-flex flex-column  border border-primary m-3 rounded" id='main'>
          <div className="contenedor-tabla mx-3">
            <h3 className="py-0 pt-3 my-0">LISTADO CLIENTES</h3>
            <div className="contenerdor-boton-buscar my-4">
              <div className="row">
                <div className="col-sm-12 col-md-6 blo1 my-1">
                  <Link className="text-center" to="/admin/crearcliente">
                    <button type="submit" className="btn btn-dark px-3 btn-styles">Agregar nuevo cliente</button>
                  </Link>
                </div>

                <div className="col-sm-12 col-md-6 blo2 my-1">
                  <form action="" className="div-search">
                    <input type="text" className="search-style form-control rounded-pill" value={busqueda} onChange={searchData} placeholder="Buscar" />
                  </form>
                </div>
              </div>
            </div>

            <div className="table-container">
              <table className="table table-hover mb-5 border">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">Cédula</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Tel</th>
                    <th scope="col">Email</th>
                    <th scope="col">Grupo</th>
                    <th scope="col" style={{ textAlign: 'center' }}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>{listaclientes}</tbody>
              </table>
              <nav className="d-flex justify-content-center">
                <ul className="pagination gap-0 justify-content-center">
                  {paginador}
                </ul>
              </nav>
            </div>
          </div>

        </main>
      </section>
    </>
  );
};

export default ListarClientes;