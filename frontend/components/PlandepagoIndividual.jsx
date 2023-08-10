import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

const PlandepagoIndividual = ({ plandePago }) => {
    const { _id } = plandePago; // Obtén el _id del objeto Plan de Pago
    const { id } = useParams();
    const [dataNegociaciones, setDataNegociaciones] = useState([]);

    //Función para traer los datos del cliente y poder enviar la notificación al correo
    useEffect(() => {
        fetch('http://localhost:4000/api/negociacion/obtenerNegociaciones')
            .then(res => res.json())
            .then(data => {
                setDataNegociaciones(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

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
                // console.log(data);
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
        <>
            {dataNegociaciones.map(negociacion => (
                <tr key={negociacion._id}>
                    <td>{negociacion.cliente}</td>
                    <td>{negociacion.numFactura}</td>
                    <td>{negociacion.fechaCuota}</td>

                    <td style={{ textAlign: 'center' }}>
                        {/* Agregar acciones específicas para cada fila si es necesario */}
                    </td>
                </tr>
            ))}
        </>
    );
};

export default PlandepagoIndividual;