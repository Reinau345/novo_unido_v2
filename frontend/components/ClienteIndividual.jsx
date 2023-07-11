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
      width: '500px',
      height: '400px',
      margin: 'auto',
      borderRadius: '50px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
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
          <button className="btn btn-primary" style={{ marginRight: 10 }}><i className="fa fa-info-circle" style={{ color: 'black' }}></i> | Detalles</button>
        </Link>

        <Link to={`/admin/editarcliente/${cliente._id}`}>
          <button className="btn btn-warning" style={{ marginRight: 10, color: 'white' }}><i className="fa fa-pencil" style={{ color: 'black' }}></i> | Editar</button>
        </Link>

        <Link onClick={eliminarCliente}>
          <button className="btn btn-danger"><i className="fa fa-trash" style={{ color: 'black' }}></i> | Eliminar</button>
        </Link>
      </td>
      <Modal isOpen={mostrarDetalles} onRequestClose={toggleDetalles} style={customStyles} >
        <Link onClick={closeModal}>
          <FaTimes size={35} style={{ color: 'black' }} />
        </Link>
        <br />
        <div>
          <h5>Detalles Cliente</h5>
          <p>Dirección: {cliente.direccion}</p>
          <h5>Detalles Codeudor</h5>
          <p>Nombre: {cliente.nombreCodeudor}</p>
          <p>Cédula: {cliente.cedulaCodeudor}</p>
          <p>Teléfono: {cliente.telefonoCodeudor}</p>
        </div>
      </Modal>

    </tr>
  );
};

export default ClienteIndividual;