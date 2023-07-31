import React, { useEffect, useState,  } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { isValid, format, parseISO } from 'date-fns';
import { FaToggleOn } from 'react-icons/fa';

const NegociacionIndividual = ({ negociacion }) => {
  const { _id } = negociacion; // Obtén el _id del objeto cliente
  const { id } = useParams();
  // const { auth } = useAuth()
  const [isActivated, setIsActivated] = useState(false);
  const [estado, setEstado] = useState(negociacion.estado);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPlanPagoModal, setShowPlanPagoModal] = useState(false);
  const [cumplimientoCuotas, setCumplimientoCuotas] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/negociacion/obtener-acumplimiento-cuotas/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        // Actualiza el estado cumplimientoCuotas con los datos obtenidos desde la base de datos
        setCumplimientoCuotas(data.cumplimientoCuotas);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [_id]);

  // Función para calcular los subtotales en cada posición del array cantidad y precioVenta
  const calcularSubtotales = () => {
    const cantidad = negociacion.cantidad;
    const precioVenta = negociacion.precioVenta;
    const subtotales = [];

    for (let i = 0; i < cantidad.length; i++) {
      const subtotal = cantidad[i] * precioVenta[i];
      subtotales.push(subtotal);
    }

    return subtotales;
  };

  const subtotales = calcularSubtotales();
  const sumaSubtotales = subtotales.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


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
            swal({
              title: "Error al eliminar la negociación",
              text: "Ha ocurrido un error al eliminar la negociación.",
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
          });
      }
    });
  };

  if (!negociacion) {
    return <div>No se ha proporcionado una negociación válida</div>;
  }

  useEffect(() => {
    setIsActivated(estado === 'Activo');
  }, [estado]);

  const toggleActivation = () => {
    setIsActivated(!isActivated);

    const newEstado = estado === 'Activo' ? 'Inactivo' : 'Activo';
    setEstado(newEstado);

    // Envía la solicitud al servidor para actualizar el estado en la base de datos
    fetch(`http://localhost:4000/api/negociacion/actualizar-estado/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ estado: newEstado })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // Puedes mostrar una notificación o mensaje de éxito aquí si lo deseas
      })
      .catch(error => {
        console.error('Error:', error);
        swal({
          title: "Error",
          text: "Ha ocurrido un error al modificar el estado de la negociación.",
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
      });
  };

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

  const toggleCumplimientoCuota = (numCuota) => {
    // Crea un nuevo array de cumplimiento de cuotas basado en el array existente
    const nuevoCumplimientoCuotas = cumplimientoCuotas.map((estado, index) =>
      index === numCuota ? !estado : estado
    );

    setCumplimientoCuotas(nuevoCumplimientoCuotas);

    // Envía la solicitud al servidor para actualizar el cumplimiento de cuotas en la base de datos
    fetch(`http://localhost:4000/api/negociacion/actualizar-cumplimiento-cuotas/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cumplimientoPago: nuevoCumplimientoCuotas }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Resto del código
      })
      .catch((error) => {
        console.error('Error:', error);
        // Si ocurre algún error, restauramos el estado anterior para evitar inconsistencias
        setCumplimientoCuotas(cumplimientoCuotas);
      });
  };

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

        {/* <Link onClick={eliminarnegociacion}>
          <i className="fa fa-trash" title="Eliminar" style={{ marginRight: 10, color: '#dc3545', fontSize: 22 }} />
        </Link> */}

        <Link onClick={toggleActivation}>
          <FaToggleOn
            title="Activar-Desactivar"
            style={{
              marginRight: 10,
              color: isActivated ? 'green' : 'gray', // Cambia el color según el estado
              fontSize: 30,
              transition: 'transform 0.2s ease', // Agrega una transición suave al giro
              transform: isActivated ? 'rotateY(180deg)' : 'rotateY(0deg)', // Aplica el giro horizontal según el estado
            }}
          />
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
            <tr>
              <th colSpan="5" style={{ backgroundColor: "#032770", color: 'white', padding: '3px' }}>Subtotal: $ {parseFloat(sumaSubtotales).toLocaleString('es-CO')}</th>
            </tr>
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
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Subtotal</th>
              <td style={{ color: '#032770' }}>$ {parseFloat(sumaSubtotales).toLocaleString('es-CO')}</td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Total</th>
              <td style={{ color: '#032770' }}>$ {negociacion.total.toLocaleString('es-CO', { minimumFractionDigits: 0 })}</td>
            </tr>
          </tbody>
        </table>
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
                <th scope="col" style={{ backgroundColor: "#032770", color: 'white' }}>Cumplió</th>
              </tr>
            </thead>
            <tbody>
              {planPagoData.map((item, index) => (
                <tr
                  key={item.numCuota}
                  style={{
                    backgroundColor: cumplimientoCuotas[item.numCuota] ? '#AFA8A8' : 'white',
                    color: cumplimientoCuotas[item.numCuota] ? 'white' : 'black',
                  }}
                >
                  <td style={{ textAlign: 'center' }}>{item.numCuota}</td>
                  <td style={{ textAlign: 'center' }}>{item.fecha}</td>
                  <td style={{ textAlign: 'center' }}>$ {item.valor}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span>
                      <FaCheck
                        className={`gray-icon ${cumplimientoCuotas[item.numCuota] ? 'active' : ''}`}
                        style={{ fontSize: 20, cursor: 'pointer' }}
                        onClick={() => toggleCumplimientoCuota(item.numCuota)}
                      />
                      <FaTimes
                        className={`red-icon ${!cumplimientoCuotas[item.numCuota] ? 'active' : ''}`}
                        style={{ fontSize: 22, marginLeft: 10, cursor: 'pointer' }}
                        onClick={() => toggleCumplimientoCuota(item.numCuota)}
                      />
                    </span>
                  </td>
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