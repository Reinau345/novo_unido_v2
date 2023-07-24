import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const UsuarioIndividual = ({ usuario }) => {
    const { _id } = usuario; // Obtén el _id del objeto cliente
    const { id } = useParams();

    const navegar = useNavigate()

    function eliminarUsuario() {
        fetch(`http://localhost:4000/api/usuarios/eliminar-usuario/${_id}`, {  // Corrección en la ruta
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


    if(!usuario){
        return <> <div>No se ha proporcionado un usuario válido</div></>
    }
    return(
        <tr>
            <td>{usuario.nombre}</td>
            <td>{usuario.apellido}</td>
            <td>{usuario.email}</td>
            {/* <td>{usuario.email}</td> */}
            <td style={{ textAlign: 'center' }}>
                <Link >
                    <i className="fa fa-pencil" title="Editar" style={{marginRight:10, color: '#212529', fontSize: 22 }} />
                </Link>
                <Link onClick={eliminarUsuario}>
                    <i className="fa fa-pencil" title="Eliminar" style={{marginRight:10, color: '#dc3545', fontSize: 22 }} />
                </Link>

            </td>
            
        </tr>
    )
}


export default UsuarioIndividual;