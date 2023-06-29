import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const NegociacionIndividual = ({ negociacion }) => {
  const { _id } = negociacion; // Obtén el _id del objeto cliente
  const { id } = useParams();

  //Función para eliminar la negociacion
  const navegar = useNavigate()
  function eliminarnegociacion() {
    fetch(`http://localhost:4000/api/negociacion/eliminarnegociacion/${_id}`, {  // Corrección en la ruta
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
      <td>{negociacion.anticipo}</td>
      <td>{negociacion.tasa}</td>
      <td>{negociacion.interes}</td>
      <td>{negociacion.numCuotas}</td>
      <td>{negociacion.numFactura}</td>
      <td>{negociacion.tipoMaquina}</td>
      <td>{negociacion.cantidad}</td>
      <td>{negociacion.referencia}</td>
      <td>{negociacion.fechaFacturacion}</td>
      <td>{negociacion.cliente}</td>
      <td>
        <Link to={`/admin/editarnegociacion/${negociacion._id}`}>
          <img src={"https://cdn-icons-png.flaticon.com/128/565/565722.png"} alt="icono_editar" width="25px" height="25px" />
        </Link>
      </td>
      <td>
        <Link>
          <button onClick={eliminarnegociacion}>
            <img src={"https://cdn-icons-png.flaticon.com/128/565/565491.png"} alt="icono_editar" width="25px" height="25px" />
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default NegociacionIndividual;