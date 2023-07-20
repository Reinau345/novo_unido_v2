import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

const ClienteIndividual = ({ cliente }) => {
  const { _id } = cliente; // Obtén el _id del objeto cliente
  const { id } = useParams();

  //Función para eliminar el cliente
  const navegar = useNavigate();
  function eliminarCliente() {
    fetch(`http://localhost:4000/api/cliente/eliminarcliente/${_id}`, {  // Corrección en la ruta
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert(data.message); // Mostrar el mensaje específico del objeto
        navegar(0);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al eliminar el cliente');
      });
  }

  const [mostrarDetalles, setMostrarDetalles] = useState(false); // Estado para controlar la ventana emergente

  const toggleDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  };

  const customStyles = {
    content: {
      width: '800px',
      height: '350px',
      margin: 'auto',
      borderRadius: '50px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'center',
    },
  };

  const closeModal = () => {
    setMostrarDetalles(false);
  };

  if (!cliente) {
    return <div>No se ha proporcionado un cliente válido</div>;
  }

  return (
    <tr>
      <td>{cliente.cedula}</td>
      <td>{cliente.nombre}</td>
      <td>{cliente.telefono}</td>
      <td>{cliente.email}</td>
      <td>{cliente.grupo}</td>
      <td style={{ textAlign: 'center' }}>
        <Link onClick={toggleDetalles} >
          <i className="fa fa-circle-info" title="Detalle" style={{marginRight:10, color: '#212529', fontSize: 22 }} />
        </Link>

        <Link to={`/admin/editarcliente/${cliente._id}`}>
          <i className="fa fa-pencil" title="Editar" style={{marginRight:10, color: '#212529', fontSize: 22 }} />
        </Link>

        <Link onClick={eliminarCliente}>
          <i className="fa fa-trash" title="Eliminar" style={{ color: '#dc3545', fontSize: 22 }} />
        </Link>
      </td>
      <Modal isOpen={mostrarDetalles} onRequestClose={toggleDetalles} style={customStyles} >
        <Link onClick={closeModal}>
          <FaTimes size={35} style={{ color: 'black', float: 'right' }} />
        </Link>
        <br />
        <h2 style={{textAlign: 'center'}}>Detalle Cliente</h2>
        <br />
        <table className="table table-hover mb-5 table-bordered" style={{ maxWidth: 800 }}>
            <thead className="table-secondary">
              <tr>
                <th scope="col">Cédula</th>
                <th scope="col">Nombre</th>
                <th scope="col">Dirección</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Email</th>
                <th scope="col">Nombre Codeudor</th>
                <th scope="col">Teléfono Codeudor</th>
                <th scope="col">Grupo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cliente.cedula}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.email}</td>
                <td>{cliente.nombreCodeudor}</td>
                <td>{cliente.telefonoCodeudor}</td>
                <td>{cliente.grupo}</td>
              </tr>
            </tbody>
          </table>
      </Modal>
    </tr>
  );
};

export default ClienteIndividual;