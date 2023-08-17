import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { isValid, format, parseISO } from 'date-fns';
import { FaToggleOn } from 'react-icons/fa';

const NegociacionIndividual = ({ negociacion }) => {
  const { _id } = negociacion; 
  const { id } = useParams();
  // const { auth } = useAuth()
  const [isActivated, setIsActivated] = useState(false);
  const [estado, setEstado] = useState(negociacion.estado);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPlanPagoModal, setShowPlanPagoModal] = useState(false);
  const [cuotasPagadas, setCuotasPagadas] = useState({});
  const [dataclientes, setDataClientes] = useState([]);

  //Función para traer los datos del cliente y poder enviar la notificación
  useEffect(() => {
    const url = `cliente/obtenerCliente`;
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${url}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setDataClientes(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Función para marcar una cuota como pagada
  const handleCuotaPagada = (numCuota) => {
    setCuotasPagadas((prevCuotas) => ({
      ...prevCuotas,
      [numCuota]: true,
    }));

    // Envía la solicitud al servidor para actualizar el estado de la cuota en la base de datos
    const url = `negociacion/actualizar-cuota/${_id}/${numCuota}`;
    // fetch(`http://localhost:4000/api/negociacion/actualizar-cuota/${_id}/${numCuota}`, {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ numCuota: numCuota, pagada: true }) // Aquí pasamos el número de cuota como propiedad en el objeto
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // Aquí puedes mostrar una notificación o mensaje de éxito si lo deseas
      })
      .catch(error => {
        console.error('Error:', error);
        // Aquí puedes mostrar una notificación o mensaje de error si lo deseas
      });
  };

  // Función para marcar una cuota como NO pagada
  const handleCuotaNoPagada = (numCuota) => {
    setCuotasPagadas((prevCuotas) => ({
      ...prevCuotas,
      [numCuota]: false,

    }));

    // Envía la solicitud al servidor para actualizar el estado de la cuota en la base de datos
    const url = `negociacion/actualizar-cuota/${_id}/${numCuota}`
    // fetch(`http://localhost:4000/api/negociacion/actualizar-cuota/${_id}/${numCuota}`, {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ numCuota, pagada: false })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // Aquí puedes mostrar una notificación o mensaje de éxito si lo deseas
      })
      .catch(error => {
        console.error('Error:', error);
        // Aquí puedes mostrar una notificación o mensaje de error si lo deseas
      });
  };

  useEffect(() => {
    // Obtén la lista de cuotas pagadas desde la negociación recibida
    const cuotasPagadasDesdeNegociacion = negociacion.cumplimientoCuotas
      ? negociacion.cumplimientoCuotas.reduce((cuotas, pagada, index) => {
        if (pagada) {
          cuotas[index + 1] = true;
        }
        return cuotas;
      }, {})
      : {};

    // Establece el estado cuotasPagadas con la lista de cuotas pagadas
    setCuotasPagadas(cuotasPagadasDesdeNegociacion);
  }, [negociacion]);

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
        const url = `negociacion/eliminarnegociacion/${_id}`;
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${url}`, {
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
    const url = `negociacion/actualizar-estado/${_id}`
    // fetch(`http://localhost:4000/api/negociacion/actualizar-estado/${_id}`, {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ estado: newEstado })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        swal({
          title: "Estado modificado correctamente",
          icon: "success",
          buttons: {
            accept: {
              text: "Aceptar",
              value: true,
              visible: true,
              className: "btn-primary",
              closeModal: true
            }
          }
        })
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

  // Fecha fin gracia
  let fechaFormateada = '';
  if (isValid(parseISO(negociacion.fechaGracia))) {
    const fechaGracia = new Date(negociacion.fechaGracia);
    fechaFormateada = format(fechaGracia, 'dd/MM/yyyy');
  } else {
    fechaFormateada = 'Fecha inválida';
  }

  // Fecha creación
  let fechaCreacionFormateada = '';
  if (isValid(parseISO(negociacion.fechaCreacion))) {
    const fechaCreacion = new Date(negociacion.fechaCreacion);
    fechaCreacionFormateada = format(fechaCreacion, 'dd/MM/yyyy');
  } else {
    fechaCreacionFormateada = 'Fecha inválida';
  }

  // Cálculo de las fechas y valores del Plan de pago
  const calcularPlanPago = () => {
    const fechaGracia = new Date(negociacion.fechaGracia);
    const numCuotas = parseInt(negociacion.numCuotas, 10);
    const valorCuota = parseFloat(negociacion.total) / numCuotas;

    // console.log(fechaGracia)

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

  const negociacionPlanPagoData = calcularPlanPago();


  return (

    <>
      <tr>
        <td>{negociacion.cliente}</td>
        <td>{negociacion.numFactura}</td>
        <td>{negociacion.numCuotas}</td>
        <td>{fechaFormateada}</td>
        <td>$ {parseFloat(negociacion.total).toLocaleString('es-CO')}</td>
        <td>{negociacion.estadoNegociacion}</td>
        <td style={{ textAlign: 'center' }}>
          <Link onClick={setShowModal}>
            <i className="fa fa-shopping-cart" style={{ fontSize: '1.5rem', color: '#212529' }} />
          </Link>
        </td>
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
                <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Fecha Facturación</th>
                <td style={{ color: '#032770' }}>{fechaCreacionFormateada.toString()}</td>
              </tr>
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
                  <th scope="col" style={{ backgroundColor: "#032770", color: 'white' }}>Notificar</th>
                </tr>
              </thead>
              <tbody>
                {negociacionPlanPagoData.map((item, index) => (
                  <tr
                    key={index}
                    className={cuotasPagadas[item.numCuota] ? 'row-pagada' : 'row-no-pagada'}
                  >
                    <td style={{ color: '#032770' }}>{item.numCuota}</td>
                    <td style={{ color: '#032770' }}>{item.fecha}</td>
                    <td style={{ color: '#032770' }}>$ {item.valor}</td>
                    <td key={item.numCuota} style={{ textAlign: 'center' }}>
                      <span>
                        {/* Marcar como pagada */}
                        <FaCheck
                          className={`green-icon ${cuotasPagadas[item.numCuota] ? 'active' : ''}`} title="Pagada"
                          style={{ fontSize: 20, cursor: 'pointer', color: '#699F29' }}
                          onClick={() => handleCuotaPagada(item.numCuota)} // Asegúrate de pasar el número de cuota aquí
                        />
                        {/* Marcar como no pagada */}
                        <FaTimes
                          className={`red-icon ${!cuotasPagadas[item.numCuota] ? 'active' : ''}`} title="No pagada"
                          style={{ fontSize: 22, marginLeft: 30, cursor: 'pointer', color: '#ED3131' }}
                          onClick={() => handleCuotaNoPagada(item.numCuota)}
                        />
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <Link onClick={toggleDetalles} >
                        <i className="fa fa-bell" title="Notificar" style={{ marginRight: 10, color: '#212529', fontSize: 22 }} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      </tr>
    </>
  );
};


export default NegociacionIndividual;