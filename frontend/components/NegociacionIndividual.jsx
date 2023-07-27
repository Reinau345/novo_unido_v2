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
  const [showPlanPagoModal, setShowPlanPagoModal] = useState(false);

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

  const togglePlanPagoModal = () => {
    setShowPlanPagoModal(!showPlanPagoModal);
  };

  const closeModalPlanPago = () => {
    setShowPlanPagoModal(false);
  };

  const customStyles = {
    content: {
      width: '700px',
      height: '590px',
      margin: 'auto',
      borderRadius: '10px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
  };

  const customStyles2 = {
    content: {
      width: '700px',
      height: '590px',
      margin: 'auto',
      borderRadius: '10px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
  };

  //Función para eliminar la negociacion
  const navegar = useNavigate()
  function eliminarnegociacion() {
    swal({
      title: "Eliminar",
      text: "¿Estás seguro de eliminar el registro?",
      icon: "warning",
      buttons: {
        cancel: "NO",
        confirm: "SI"
      },
      dangerMode: true
    }).then(isConfirmed => {
      if (isConfirmed) {
        fetch(`http://localhost:4000/api/negociacion/eliminarnegociacion/${_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            swal({
              title: "Negociación eliminada con éxito",
              icon: "success"
            }).then(() => {
              navegar(0);
            });
          })
          .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar la negociación');
          });
      }
    });
  };

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

  // Cálculo de las fechas y valores del Plan de pago
  const calcularPlanPago = () => {
    const fechaGracia = new Date(negociacion.fechaGracia);
    const numCuotas = parseInt(negociacion.numCuotas, 10);
    const valorCuota = parseFloat(negociacion.total) / numCuotas;

    const planDePago = [];

    let fechaPago = new Date(fechaGracia); // Inicializar fechaPago con la fecha de gracia

    for (let i = 0; i < numCuotas; i++) {
      // Para la primera cuota, restar 5 días a la fecha de gracia
      if (i === 0) {
        fechaPago.setDate(fechaPago.getDate() - 5);
      } else {
        fechaPago.setDate(fechaPago.getDate() + 25); // Sumar 25 días a partir de la primera cuota
      }

      planDePago.push({
        numCuota: i + 1, // Número de cuota
        fecha: format(fechaPago, 'dd/MM/yyyy'),
        valor: valorCuota.toLocaleString('es-CO', { minimumFractionDigits: 0 })
      });
    }

    return planDePago;
  };

  const planPagoData = calcularPlanPago();

  console.log(negociacion)

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
      <td>$ {parseFloat(negociacion.total).toLocaleString('es-CO')}</td>
      <td style={{ textAlign: 'center' }}>
        <Link onClick={toggleDetalles} >
          <i className="fa fa-circle-info" title="Detalle" style={{ marginRight: 10, color: '#212529', fontSize: 22 }} />
        </Link>

        <Link to={`/admin/editarnegociacion/${negociacion._id}`}>
          <i className="fa fa-pencil" title="Editar" style={{ marginRight: 10, color: '#212529', fontSize: 22 }} />
        </Link>

        <Link onClick={eliminarnegociacion}>
          <i className="fa fa-trash" title="Eliminar" style={{ marginRight: 10, color: '#dc3545', fontSize: 22 }} />
        </Link>

        <Link onClick={togglePlanPagoModal}>
          <i className="fa fa-money" title="Plan de pago" style={{ color: '#212529', fontSize: 22 }} />
        </Link>
      </td>

      {/* Modal Detalle Productos */}
      <Modal isOpen={showModal} onRequestClose={toggleModal} style={customStyles2}>
        <Link onClick={closeModal}>
          <FaTimes size={35} style={{ color: 'black', float: 'right' }} />
        </Link>
        <br />
        <h2 style={{ textAlign: 'center', color: '#032770' }}>DETALLE PRODUCTOS</h2>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table className="table table-hover mb-5 table-bordered" style={{ maxWidth: 800, border: "2px solid blue" }}>
            <thead className="table-secondary" style={{ border: "2px solid blue" }}>
              <tr>
                <th scope="col" style={{ backgroundColor: "#032770", color: 'white' }}>Producto</th>
                <th scope="col" style={{ backgroundColor: "#032770", color: 'white' }}>Cantidad</th>
                <th scope="col" style={{ backgroundColor: "#032770", color: 'white' }}>Precio Base</th>
                <th scope="col" style={{ backgroundColor: "#032770", color: 'white' }}>Precio Venta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: '#032770' }} dangerouslySetInnerHTML={{ __html: negociacion.tipoMaquina.join('<br />') }}></td>
                <td style={{ color: '#032770' }} dangerouslySetInnerHTML={{ __html: negociacion.cantidad.join('<br />') }}></td>
                <td style={{ color: '#032770' }} dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.precioBase) ? negociacion.precioBase.map((precio) => `$ ${parseFloat(precio).toLocaleString('es-CO')}`).join('<br />') : '' }}></td>
                <td style={{ color: '#032770' }} dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.precioVenta) ? negociacion.precioVenta.map((precio) => `$ ${parseFloat(precio).toLocaleString('es-CO')}`).join('<br />') : '' }}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>

      {/* Modal Detalle Negociacion */}
      <Modal isOpen={mostrarDetalles} onRequestClose={toggleDetalles} style={customStyles} >
        <Link onClick={closeModal}>
          <FaTimes size={35} style={{ color: 'black', float: 'right' }} />
        </Link>
        <br />
        <h2 style={{ textAlign: 'center', color: '#032770' }}>DETALLE NEGOCIACIÓN</h2>
        <br />
        <table className="table table-hover mb-5 table-bordered" style={{ maxWidth: 800, border: "2px solid blue" }}>
          <tbody style={{ border: "2px solid blue" }}>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Cliente</th>
              <td style={{ color: '#032770' }}>{negociacion.cliente}</td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Factura</th>
              <td style={{ color: '#032770' }}>{negociacion.numFactura}</td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Productos</th>
              <td style={{ color: '#032770' }} dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.tipoMaquina) ? negociacion.tipoMaquina.join('<br />') : '' }}></td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Cantidad</th>
              <td style={{ color: '#032770' }} dangerouslySetInnerHTML={{ __html: negociacion.cantidad.join('<br />') }}></td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Precio Base</th>
              <td style={{ color: '#032770' }} dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.precioBase) ? negociacion.precioBase.map((precio) => `$ ${parseFloat(precio).toLocaleString('es-CO')}`).join('<br />') : '' }}></td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Precio Venta</th>
              <td style={{ color: '#032770' }} dangerouslySetInnerHTML={{ __html: Array.isArray(negociacion.precioVenta) ? negociacion.precioVenta.map((precio) => `$ ${parseFloat(precio).toLocaleString('es-CO')}`).join('<br />') : '' }}></td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Cuotas</th>
              <td style={{ color: '#032770' }}>{negociacion.numCuotas}</td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Tasa</th>
              <td style={{ color: '#032770' }}>{negociacion.tasa}</td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Anticipo</th>
              <td style={{ color: '#032770' }}>{negociacion.anticipo}</td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Intereses</th>
              <td style={{ color: '#032770' }}>{negociacion.interes}</td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Fecha Fin Gracia</th>
              <td style={{ color: '#032770' }}>{fechaFormateada}</td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Total</th>
              <td style={{ color: '#032770' }}>$ {negociacion.total.toLocaleString('es-CO', { minimumFractionDigits: 0 })}</td>
            </tr>
          </tbody>
        </table>
      </Modal>

      {/* Modal Planes de Pago */}
      <Modal isOpen={showPlanPagoModal} onRequestClose={togglePlanPagoModal} style={customStyles2}>
        <Link onClick={closeModalPlanPago}>
          <FaTimes size={35} style={{ color: 'black', float: 'right' }} />
        </Link>
        <br />
        <h2 style={{ textAlign: 'center', color: "#032770" }}>PLAN DE PAGO</h2>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table className="table table-hover mb-5 table-bordered" style={{ maxWidth: 800, border: "2px solid blue" }}>
            <thead className="table-secondary" style={{ border: "2px solid blue" }}>
              <tr>
                <th scope="col" style={{ backgroundColor: "#032770", color: 'white' }}>Cuota</th>
                <th scope="col" style={{ backgroundColor: "#032770", color: 'white' }}>Fecha</th>
                <th scope="col" style={{ backgroundColor: "#032770", color: 'white' }}>Valor</th>
              </tr>
            </thead>
            <tbody>
              {planPagoData.map((item, index) => (
                <tr key={index}>
                  <td style={{ color: '#032770' }}>{item.numCuota}</td>
                  <td style={{ color: '#032770' }}>{item.fecha}</td>
                  <td style={{ color: '#032770' }}>$ {item.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </tr>
  );
};


export default NegociacionIndividual;