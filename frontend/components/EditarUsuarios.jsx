import React, {useEffect, useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import MenuLateral from './MenuLateral'

const EditarUsuarios = () => {

  const navigate = useNavigate();
  const {id} = useParams();

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetch(`http://localhost:4000/api/usuarios/obtener-usuario/${id}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Error al obtener usuario');
            }
            return res.json();
        })
        .then((dataUsuario) => {
          console.log(dataUsuario[0])
          setNombre(dataUsuario.nombre)
          setApellido(dataUsuario.apellido)
          setEmail(dataUsuario.email)
        })
        .catch((err) => {
            console.error(err);
        });
}, [id]);


const actualizarUsuario = async (e) => {
  e.preventDefault()

  // const { nombre, apellido, email } = perfil;

  if ([nombre, apellido, email].includes('')) {
      setAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
      })
      return
  }


const usuarioActualizado = {
  nombre,
  apellido,
  email
}

try {
  const response = await fetch(`http://localhost:4000/api/usuarios/editar-usuario/${id}`,{
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuarioActualizado)
  });

  if(response.ok){
    swal({
      title: "Actualización exitosa",
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
  }).then((value) =>{
    if(value){
      window.location.href = "/admin/listar-usuarios"
    }
  });

  }
  else{
    throw new Error('Error al actualizar usuario');
  }
} catch (error) {
  console.log(error)
  swal({
    title: "Error",
    text: "Ha ocurrido un error al actualizar el usuario.",
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
}
}


  return (
    // <div>EditarUsuarios</div>
    <>
    <section className="d-flex">
        <MenuLateral></MenuLateral>

        <main className="d-flex flex-column  border border-primary m-3 rounded">
            <h3 className="text-center py-0 pt-3 my-0">EDITAR USUARIO</h3>
            <br />
            <form className="formulario" onSubmit={actualizarUsuario}>
                <div className="contenedores d-flex justify-content-center flex-lg-row flex-column flex-sm-column mx-5 gap-5">
                    <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100">
                        <div className="mb-3 w-100">
                            <label className="form-label fw-bold">Nombre</label>
                            <input type="text" 
                            className="form-control" 
                            id='nombre'
                            placeholder="Nombre" 
                            required 
                            value={nombre}
                            onChange={(e) => {setNombre(e.target.value)}}/>
                        </div>

                        <div className="mb-3 w-100">
                            <label className="form-label fw-bold">Email</label>
                            <input type="email" 
                            className="form-control" 
                            id='email'
                            placeholder="Email"  
                            required
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            />
                        </div>

                    </div>
                    <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0 w-100">
                        <div className="mb-3 w-100">
                            <label className="form-label fw-bold">Apellido</label>
                            <input type="text" 
                            className="form-control" 
                            id="apellido" 
                            required
                            value={apellido}
                            placeholder="Apellido"  
                            onChange={(e) => {setApellido(e.target.value)}}
                            />
                        </div>


                    </div>
                </div>
                <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5">
                    <div className="d-flex justify-content-center w-100">
                        <div className="div_botones ms-sm-0 w-100 d-flex justify-content-center">
                            <button type="submit" className="btn btn-dark btn-styles" >Guardar</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center w-100">
                        <div className="div_botones me-sm-0 w-100 d-flex justify-content-center">
                            <button type="button" className="btn btn-dark btn-styles" >Cancelar</button>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    </section>
</>
  )
}

export default EditarUsuarios