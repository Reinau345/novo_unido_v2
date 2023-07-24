import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import MenuLateral from './MenuLateral';

const EditarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Hooks
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [nombreCodeudor, setNombreCodeudor] = useState('');
  const [cedulaCodeudor, setCedulaCodeudor] = useState('');
  const [telefonoCodeudor, setTelefonoCodeudor] = useState('');
  const [grupo, setGrupo] = useState('');
  const { auth } = useAuth()

  const handleCancelar = () => {
    navigate(-1); // Regresa a la ubicación anterior
  };
  // Validar campos numéricos
  function validarNumericos(event) {
    const charCode = event.keyCode || event.which;
    const char = String.fromCharCode(charCode);

    // Permitir la tecla de retroceso (backspace) y la tecla de suprimir (delete)
    if (charCode === 8 || charCode === 46 || charCode === 9) {
      return;
    }

    // Verificar si el carácter no es un número del 0 al 9
    if (/\D/.test(char)) {
      event.preventDefault();
    }
  }

  function validarTexto(event) {
    const charCode = event.keyCode || event.which;
    const char = String.fromCharCode(charCode);

    // Permitir la tecla de retroceso (backspace) y la tecla de suprimir (delete)
    if (charCode === 8 || charCode === 46 || charCode === 9 || char === ' ') {
      return;
    }

    // Verificar si el carácter es un número o un carácter especial
    if (/[0-9\W_]/.test(char)) {
      event.preventDefault();
    }
  }

  useEffect(() => {
    fetch(`http://localhost:4000/api/cliente/obtenerdatacliente/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al obtener los datos del cliente');
        }
        return res.json();
      })
      .then((datacliente) => {
        setCedula(datacliente.cedula);
        setNombre(datacliente.nombre);
        setDireccion(datacliente.direccion);
        setTelefono(datacliente.telefono);
        setEmail(datacliente.email);
        setNombreCodeudor(datacliente.nombreCodeudor);
        setCedulaCodeudor(datacliente.cedulaCodeudor);
        setTelefonoCodeudor(datacliente.telefonoCodeudor);
        setGrupo(datacliente.grupo);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  // Función para actualizar
  const actualizarCliente = async () => {

    // Verificar que todos los campos sean llenados
    if (
      cedula === '' ||
      nombre === '' ||
      direccion === '' ||
      telefono === '' ||
      email === '' ||
      nombreCodeudor === '' ||
      cedulaCodeudor === '' ||
      telefonoCodeudor === '' ||
      grupo === ''
    ) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    const clienteActualizado = {
      cedula,
      nombre,
      direccion,
      telefono,
      email,
      nombreCodeudor,
      cedulaCodeudor,
      telefonoCodeudor,
      grupo,
    };

    try {
      const response = await fetch(`http://localhost:4000/api/cliente/actualizarCliente/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteActualizado)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Cliente actualizado correctamente
      } else {
        throw new Error('Error al actualizar el cliente');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="d-flex">
        <MenuLateral></MenuLateral>
        <main className="d-flex flex-column  border border-primary m-4 rounded">
          <h2 className="text-center py-0 pt-5 my-0">EDITAR CLIENTE</h2>
          <br />
          <form className="formulario" action="">
            <div className="contenedores d-flex justify-content-center flex-lg-row flex-column flex-sm-column mx-5 gap-5">
              <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100">
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Cédula</label>
                  <input type="text" className="form-control" id="cedula" placeholder="Cédula" required onKeyDown={validarNumericos} value={cedula} onChange={(e) => { setCedula(e.target.value) }} />
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Dirección</label>
                  <input type="text" className="form-control" placeholder="Dirección" required value={direccion} onChange={(e) => { setDireccion(e.target.value) }} />
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Email</label>
                  <input type="text" className="form-control" placeholder="Email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Cédula Codeudor</label>
                  <input type="text" className="form-control" placeholder="Cédula Codeudor" required onKeyDown={validarNumericos} value={cedulaCodeudor} onChange={(e) => { setCedulaCodeudor(e.target.value) }} />
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Teléfono Codeudor</label>
                  <input type="text" className="form-control" placeholder="Teléfono Codeudor" required onKeyDown={validarNumericos} value={telefonoCodeudor} onChange={(e) => { setTelefonoCodeudor(e.target.value) }} />
                </div>
              </div>
              <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0 w-100">
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Nombre</label>
                  <input type="text" className="form-control" id="nombre" placeholder="Nombre" required onKeyDown={validarTexto} value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Teléfono</label>
                  <input type="text" className="form-control" placeholder="Teléfono" required onKeyDown={validarNumericos} value={telefono} onChange={(e) => { setTelefono(e.target.value) }} />
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Grupo</label>
                  <input type="text" className="form-control" placeholder="Grupo" required onKeyDown={validarTexto} value={grupo} onChange={(e) => { setGrupo(e.target.value) }} />
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Nombre Codeudor</label>
                  <input type="text" className="form-control" placeholder="Nombre Codeudor" required onKeyDown={validarTexto} value={nombreCodeudor} onChange={(e) => { setNombreCodeudor(e.target.value) }} />
                </div>
              </div>
            </div>
            <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5">
              <div className="d-flex justify-content-center w-100">
                <div className="div_botones ms-sm-0 w-100 d-flex justify-content-center">
                  <button type="submit" className="btn btn-dark btn-styles" onClick={actualizarCliente}>Guardar</button>
                </div>
              </div>
              <div className="d-flex justify-content-center w-100 ">
                <div className="div_botones me-sm-0 w-100 d-flex justify-content-center">
                  <button type="button" className="btn btn-dark btn-styles" onClick={handleCancelar}>Cancelar</button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </section>
    </>
  );
};

export default EditarCliente;