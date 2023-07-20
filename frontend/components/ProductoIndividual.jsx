import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProductoIndividual = ({ producto }) => {
    const { _id } = producto; // Obtén el _id del objeto cliente
    const { id } = useParams();

    const navegar = useNavigate()
    function eliminarproducto() {
        fetch(`http://localhost:4000/api/producto/eliminarproducto/${_id}`, {  // Corrección en la ruta
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
        alert('Error al eliminar el producto');
      });
  }

  if (!producto) {
    return <div>No se ha proporcionado un producto válido</div>;
  }
  return (
    <tr >
      <td>{producto.referencia}</td>
      <td>{producto.nombre}</td>
      <td>{producto.cantidad}</td>
      <td>{producto.precioBase}</td>
      <td>{producto.imagen}</td>
      <td style={{ textAlign: 'center' }}>
        <Link to={`/admin/editarproducto/${producto._id}`}>
        <i className="fa fa-pencil" title="Editar" style={{marginRight:10, color: '#212529', fontSize: 22 }} />
        </Link>

        <Link onClick={eliminarproducto}>
        <i className="fa fa-trash" title="Eliminar" style={{ color: '#dc3545', fontSize: 22 }} />
        </Link>
      </td>
    </tr>
  );
};

export default ProductoIndividual;