import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { FaToggleOn } from 'react-icons/fa';

const ProductoIndividual = ({ producto }) => {
  const { _id } = producto; // Obtén el _id del objeto cliente
  const { id } = useParams();
  const [isActivated, setIsActivated] = useState(false);
  const [estado, setEstado] = useState(producto.estado);

  const navegar = useNavigate()

  function eliminarproducto() {
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
        fetch(`http://localhost:4000/api/producto/eliminarproducto/${_id}`, {  // Corrección en la ruta
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            swal({
              title: "Producto eliminado con éxito",
              icon: "success"
            }).then(() => {
              navegar(0);
            });
          })
          .catch(error => {
            console.error('Error:', error);
            swal({
              title: "Error al eliminar el producto",
              text: "Ha ocurrido un error al eliminar el producto.",
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

  const [mostrarDetalles, setMostrarDetalles] = useState(false); // Estado para controlar la ventana emergente

  const toggleDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
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
      // justifyContent: 'center',
    },
  };

  const closeModal = () => {
    setMostrarDetalles(false);
  };

  if (!producto) {
    return <div>No se ha proporcionado un producto válido</div>;
  }

  useEffect(() => {
    setIsActivated(estado === 'Activo');
  }, [estado]);

  const toggleActivation = () => {
    setIsActivated(!isActivated);

    const newEstado = estado === 'Activo' ? 'Inactivo' : 'Activo';
    setEstado(newEstado);

    // Envía la solicitud al servidor para actualizar el estado en la base de datos
    fetch(`http://localhost:4000/api/producto/actualizar-estado/${_id}`, {
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
          text: "Ha ocurrido un error al modificar el estado del producto.",
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

  return (
    <tr >
      <td>{producto.referencia}</td>
      <td>{producto.nombre}</td>
      <td>$ {parseFloat(producto.precioBase).toLocaleString('es-CO')}</td>
      <td style={{ textAlign: 'center' }}>
        <Link onClick={toggleDetalles} >
          <i className="fa fa-circle-info" title="Detalle" style={{ marginRight: 10, color: '#212529', fontSize: 22 }} />
        </Link>
        <Link to={`/admin/editarproducto/${producto._id}`}>
          <i className="fa fa-pencil" title="Editar" style={{ marginRight: 10, color: '#212529', fontSize: 22 }} />
        </Link>
        {/* <Link onClick={eliminarproducto}>
          <i className="fa fa-trash" title="Eliminar" style={{ color: '#dc3545', fontSize: 22 }} />
        </Link> */}
        <Link onClick={toggleActivation}>
          <FaToggleOn
            title="Activar-Desactivar"
            style={{
              marginRight: 10,
              // color: isActivated ? '#021F59' : 'gray', // Cambia el color según el estado
              color: isActivated ? 'green' : 'gray', // Cambia el color según el estado
              fontSize: 30,
              transition: 'transform 0.2s ease', // Agrega una transición suave al giro
              transform: isActivated ? 'rotateY(180deg)' : 'rotateY(0deg)', // Aplica el giro horizontal según el estado
            }}
          />
        </Link>
      </td>
      <Modal isOpen={mostrarDetalles} onRequestClose={toggleDetalles} style={customStyles} >
        <Link onClick={closeModal}>
          <FaTimes size={35} style={{ color: 'black', float: 'right' }} />
        </Link>
        <br />
        <h2 style={{ textAlign: 'center', color: '#032770' }}>DETALLE PRODUCTO</h2>
        <br />
        <table className="table table-hover mb-5 table-bordered" style={{ maxWidth: 800, border: "2px solid blue" }}>
          <tbody>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Referencia</th>
              <td style={{ color: '#032770' }}>{producto.referencia}</td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Nombre</th>
              <td style={{ color: '#032770' }}>{producto.nombre}</td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Precio Base</th>
              <td style={{ color: '#032770' }}>{producto.precioBase}</td>
            </tr>
            <tr>
              <th scope="row" style={{ backgroundColor: "#032770", color: 'white' }}>Descripción</th>
              <td style={{ color: '#032770' }}>
                <div style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{producto.descripcion}</div>
              </td>
            </tr>
            <p><img className='text-centerounded mx-auto d-block' width={200} height={200} src={`../uploads/products/${producto.imagen}`} ></img></p>
          </tbody>
        </table>
      </Modal>
    </tr>
  );
};

export default ProductoIndividual;