import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { isValid, format, parseISO } from 'date-fns';

const PlandepagoIndividual = ({ plandePago }) => {
    const { _id } = plandePago; // Obtén el _id del objeto Plan de Pago
    const { id } = useParams();
    const [dataNegociaciones, setDataNegociaciones] = useState([]);

    //Función para traer los datos del cliente y poder enviar la notificación al correo
    useEffect(() => {
        const url = `negociacion/obtenerNegociaciones`;
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${url}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDataNegociaciones(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {dataNegociaciones.map(negociacion => (
                <React.Fragment key={negociacion._id}>
                    {negociacion.detalleCuotas.map((cuota, index) => (
                        <tr key={index}>
                            {index === 0 && (
                                <>
                                    <td rowSpan={negociacion.detalleCuotas.length}>{negociacion.cliente}</td>
                                    <td rowSpan={negociacion.detalleCuotas.length}>{negociacion.numFactura}</td>
                                </>
                            )}
                            <td>
                                {isValid(parseISO(cuota.fecha)) ? (
                                    format(parseISO(cuota.fecha), 'dd/MM/yyyy')
                                ) : (
                                    'Fecha inválida'
                                )}
                            </td>
                            <td>${parseFloat(cuota.valor).toLocaleString('es-CO')}</td>
                            <td>
                                {/* Acciones específicas */}
                            </td>
                        </tr>
                    ))}
                </React.Fragment>
            ))}
        </>
    );
};

export default PlandepagoIndividual;