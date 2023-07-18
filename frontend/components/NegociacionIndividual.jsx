import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

const NegociacionIndividual = ({ negociacion }) => {
  const { _id } = negociacion; // Obtén el _id del objeto cliente
  const { id } = useParams();
  // const { auth } = useAuth()

  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setMostrarDetalles(false);
    setShowModal(false);
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

  //Función para eliminar la negociacion
  const navegar = useNavigate()
  function eliminarnegociacion() {
    fetch(`http://localhost:4000/api/negociacion/eliminarnegociacion/${_id}`, {
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
        alert('Error al eliminar la negociación');
      });
  }

  if (!negociacion) {
    return <div>No se ha proporcionado una negociación válida</div>;
  }

  return (
    <tr>
      <td>{negociacion.cliente}</td>
      <td>{negociacion.numFactura}</td>
      <td style={{ textAlign: 'center' }}>
        <Link onClick={setShowModal}>
          <i className="fa fa-shopping-cart" style={{ fontSize: '1.5rem', color: 'gray' }} />
        </Link>
      </td>
      <td>{negociacion.numCuotas}</td>
      <td>{negociacion.fechaFacturacion}</td>
      <td>{negociacion.total}</td>
      <td style={{ textAlign: 'center' }}>
        <Link onClick={toggleDetalles} >
          <button className="btn btn-primary" style={{ marginRight: 10 }}><i className="fa fa-info-circle" style={{ color: 'black' }}></i> | Detalles</button>
        </Link>

        <Link to={`/admin/editarnegociacion/${negociacion._id}`}>
          <button className="btn btn-warning" style={{ marginRight: 10, color: 'white' }}><i className="fa fa-pencil" style={{ color: 'black' }}></i> | Editar</button>
        </Link>

        <Link onClick={eliminarnegociacion}>
          <button className="btn btn-danger" style={{ marginRight: 10 }}><i className="fa fa-trash" style={{ color: 'black' }}></i> | Eliminar</button>
        </Link>

        <Link>
          <button className="btn btn-secondary"><i className="fa fa-money" style={{ color: 'black' }}></i> | Planes de pago</button>
        </Link>
      </td>
      {/* Modal */}
      <Modal isOpen={mostrarDetalles} onRequestClose={toggleDetalles} style={customStyles} >
        <Link onClick={closeModal}>
          <FaTimes size={35} style={{ color: 'black' }} />
        </Link>
        <br />
        <div>
          <h3>Detalles Negociación</h3>
          <br />
          <h5>Porcentaje tasa: {negociacion.tasa}</h5>
          <h5>Porcentaje anticipo: {negociacion.anticipo}</h5>
          <h5>Porcentaje intereses: {negociacion.interes}</h5>
        </div>
      </Modal>
      {/* Modal 2 */}
      <Modal isOpen={showModal} onRequestClose={toggleModal} style={customStyles}>
        <Link onClick={closeModal}>
          <FaTimes size={35} style={{ color: 'black' }} />
        </Link>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table className="table table-hover mb-5 table-bordered" style={{ maxWidth: 800 }}>
            <thead className="table-secondary">
              <tr>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio Base</th>
                <th scope="col">Precio Venta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.tipoMaquina) ? negociacion.tipoMaquina.join('<br />') : '' }}></td>
                <td style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.cantidad) ? negociacion.cantidad.join('<br />') : '' }}></td>
                <td style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.precioBase) ? negociacion.precioBase.join('<br />') : '' }}></td>
                <td style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.precioVenta) ? negociacion.precioVenta.join('<br />') : '' }}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </tr>
  );
};


export default NegociacionIndividual;