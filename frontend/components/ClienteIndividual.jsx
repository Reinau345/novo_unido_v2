import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

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

  if (!cliente) {
    return <div>No se ha proporcionado un cliente válido</div>;
  }

  return (
    <tr>
      <td>{cliente.cedula}</td>
      <td>{cliente.nombre}</td>
      <td>{cliente.direccion}</td>
      <td>{cliente.telefono}</td>
      <td>{cliente.email}</td>
      <td>{cliente.nombreCodeudor}</td>
      <td>{cliente.cedulaCodeudor}</td>
      <td>{cliente.telefonoCodeudor}</td>
      <td>{cliente.direccionCodeudor}</td>
      <td>{cliente.grupo}</td>
      <td>{cliente.estado}</td>
      <td>
        <Link to={`/admin/editarcliente/${cliente._id}`}>
          <img src={"https://cdn-icons-png.flaticon.com/128/565/565722.png"} alt="icono_editar" width="25px" height="25px" />
        </Link>
      </td>
      <td>
        <Link>
          <button onClick={eliminarCliente}>
            <img src={"https://cdn-icons-png.flaticon.com/128/565/565491.png"} alt="icono_editar" width="25px" height="25px" />
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default ClienteIndividual;