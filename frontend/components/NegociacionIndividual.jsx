import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { isValid, format, parseISO } from 'date-fns';

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
      width: '1000px',
      height: '400px',
      margin: 'auto',
      borderRadius: '50px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'center',
    },
  };

  const customStyles2 = {
    content: {
      width: '500px',
      height: '300px',
      margin: 'auto',
      borderRadius: '50px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'center',
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

  // Fecha
  let fechaFormateada = '';
  if (isValid(parseISO(negociacion.fechaGracia))) {
    const fechaGracia = new Date(negociacion.fechaGracia);
    fechaFormateada = format(fechaGracia, 'dd/MM/yyyy');
  } else {
    fechaFormateada = 'Fecha inválida'; 
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
      <td>{fechaFormateada}</td>
      <td>{negociacion.total}</td>
      <td style={{ textAlign: 'center' }}>
        <Link onClick={toggleDetalles} >
          <i className="fa fa-circle-info" title="Detalle" style={{ marginRight: 10, color: '#212529', fontSize: 22 }} />
        </Link>

        <Link to={`/admin/editarnegociacion/${negociacion._id}`}>
          <i className="fa fa-pencil" title="Editar" style={{ marginRight: 10, color: '#212529', fontSize: 22 }} />
        </Link>

        <Link onClick={eliminarnegociacion}>
          <i className="fa fa-trash" title="Eliminar" style={{marginRight: 10, color: '#dc3545', fontSize: 22 }} />
        </Link>

        <Link>
          <i className="fa fa-money" title="Plan de pago" style={{ color: '#212529', fontSize: 22 }}/>
        </Link>
      </td>
      {/* Modal */}
      <Modal isOpen={mostrarDetalles} onRequestClose={toggleDetalles} style={customStyles} >
        <Link onClick={closeModal}>
          <FaTimes size={35} style={{ color: 'black', float: 'right' }} />
        </Link>
        <br />
        <h2 style={{textAlign: 'center'}}>Detalle Negociación</h2>
        <br />
        <table className="table table-hover mb-5 table-bordered" style={{ maxWidth: 800 }}>
            <thead className="table-secondary">
              <tr>
                <th scope="col">Cliente</th>
                <th scope="col">Factura</th>
                <th scope="col">Productos</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio Base</th>
                <th scope="col">PrecioVenta</th>
                <th scope="col">Cuotas</th>
                <th scope="col">Tasa</th>
                <th scope="col">Anticipo</th>
                <th scope="col">Intereses</th>
                <th scope="col">Fecha Fin Gracia</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{negociacion.cliente}</td>
                <td>{negociacion.numFactura}</td>
                <td dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.tipoMaquina) ? negociacion.tipoMaquina.join('<br />') : '' }}></td>
                <td dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.cantidad) ? negociacion.cantidad.join('<br />') : '' }}></td>
                <td dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.precioBase) ? negociacion.precioBase.join('<br />') : '' }}></td>
                <td dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.precioVenta) ? negociacion.precioVenta.join('<br />') : '' }}></td>
                <td>{negociacion.numCuotas}</td>
                <td>{negociacion.tasa}</td>
                <td>{negociacion.anticipo}</td>
                <td>{negociacion.interes}</td>
                <td>{negociacion.fechaGracia}</td>
                <td>{negociacion.total}</td>
              </tr>
            </tbody>
          </table>
      </Modal>
      {/* Modal 2 */}
      <Modal isOpen={showModal} onRequestClose={toggleModal} style={customStyles2}>
        <Link onClick={closeModal}>
          <FaTimes size={35} style={{ color: 'black', float: 'right' }} />
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
                <td dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.tipoMaquina) ? negociacion.tipoMaquina.join('<br />') : '' }}></td>
                <td dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.cantidad) ? negociacion.cantidad.join('<br />') : '' }}></td>
                <td dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.precioBase) ? negociacion.precioBase.join('<br />') : '' }}></td>
                <td dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.precioVenta) ? negociacion.precioVenta.join('<br />') : '' }}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </tr>
  );
};


export default NegociacionIndividual;