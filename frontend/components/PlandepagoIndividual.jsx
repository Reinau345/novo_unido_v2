import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const PlandepagoIndividual = ({ plandePago }) => {
    const { _id } = plandePago; // Obtén el _id del objeto Plan de Pago
    const { id } = useParams();

    //Función para eliminar el Plan de Pago
    const navegar = useNavigate();
    function eliminarPlandepago() {
        fetch(`http://localhost:4000/api/plandepago/eliminarplandepago/${_id}`, {  // Corrección en la ruta
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
                alert('Error al eliminar el Plan de Pago');
            });
    }

    if (!plandePago) {
        return <div>No se ha proporcionado plan de pago válido</div>;
    }
    return (
        <tr>
            <td>{plandePago.fechaPago}</td>
            <td>{plandePago.valorPago}</td>
            <td>{plandePago.cumplioPago}</td>
            <td style={{ textAlign: 'center' }}>
                <Link to={`/admin/editarplandepago/${plandePago._id}`}>
                    <button className="btn btn-warning" style={{ marginRight: 10, color: 'white' }}><i className="fa fa-pencil" style={{ color: 'black' }}></i> | Editar</button>
                </Link>

                <Link onClick={eliminarPlandepago}>
                        <button className="btn btn-danger"><i className="fa fa-trash" style={{ color: 'black' }}></i> | Eliminar</button>
                </Link>
            </td>
        </tr>
    );
};

export default PlandepagoIndividual;