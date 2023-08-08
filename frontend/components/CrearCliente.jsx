//Nombre del Proyecto, Modulo, Autor, Fecha, Version

// Documentar bloque de codigo

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import MenuLateral from './MenuLateral';
import swal from 'sweetalert';

const CrearCliente = () => {
  const navigate = useNavigate();

  // Hooks  
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [grupo, setGrupo] = useState('');
  const [tipoDocumentoCod, setTipoDocumentoCod] = useState('');
  const [cedulaCodeudor, setCedulaCodeudor] = useState('');
  const [nombreCodeudor, setNombreCodeudor] = useState('');
  const [telefonoCodeudor, setTelefonoCodeudor] = useState('');
  const { auth } = useAuth()

  const handleCancelar = () => {
    navigate(-1); // Regresa a la ubicación anterior
  };

  function validarNumericos(event) {
    const charCode = event.keyCode || event.which;
    const char = String.fromCharCode(charCode);

    // Permitir la tecla de retroceso (backspace) y la tecla de suprimir (delete)
    if (charCode === 8 || charCode === 46 || charCode === 9) {
      return;
    }

    // Verificar si el carácter no es un número del 0 al 9 ni el punto decimal
    if (/[\D/.-]/.test(char)) {
      event.preventDefault();
    }

    // Verificar que no haya más de un punto decimal
    if (char === '.' && event.target.value.includes('.')) {
      event.preventDefault();
    }
  }

  function validarTexto(event) {
    const inputText = event.target.value;

    // Remover caracteres especiales y números, permitiendo solo letras y la letra "ñ" (tanto en mayúscula como en minúscula)
    const sanitizedText = inputText.replace(/[^a-zA-ZñÑ\s]/g, '');

    // Actualizar el valor del input con el texto sanitizado
    event.target.value = sanitizedText;
  }

  function validarCorreo(event) {
    const inputValue = event.target.value;

    // Expresión regular para validar que haya al menos un carácter alfanumérico, seguido de "@", seguido de al menos un carácter alfanumérico, seguido de ".", seguido de al menos un carácter alfanumérico.
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

    setReferenciaValida(regex.test(inputValue));
  }

  const agregarCliente = async () => {

    // Verificar que todos los campos sean llenados
    if (
      tipoDocumento === '' ||
      cedula === '' ||
      nombre === '' ||
      direccion === '' ||
      telefono === '' ||
      email === '' ||
      tipoDocumentoCod === '' ||
      cedulaCodeudor === '' ||
      nombreCodeudor === '' ||
      telefonoCodeudor === ''
    ) {
      swal({
        title: "Campos vacíos",
        text: "Todos los campos son obligatorios",
        icon: "warning",
        button: "Aceptar"
      });
      return;
    }

    const nuevoCliente = {
      tipoDocumento,
      cedula,
      nombre,
      direccion,
      telefono,
      email,
      grupo,
      tipoDocumentoCod,
      cedulaCodeudor,
      nombreCodeudor,
      telefonoCodeudor,
    };

    try {
      const response = await fetch('http://localhost:4000/api/cliente/agregarCliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoCliente)
      });

      const data = await response.json();


      if (response.ok) {

        swal({
          title: "Cliente Creado Correctamente",
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
        }).then((value) => {
          if (value) {
            window.location.href = "/admin/listaclientes";
          }
        });
      } else {
        if (data.msg) {
          throw new Error(data.msg);
        } else {
          throw new Error(data.error);
        }

      }
    } catch (error) {

      swal({
        text: "",
        icon: "warning",
        button: "Aceptar"
      })
    }
  };

  return (
    <>
      <section className="d-flex">
        <MenuLateral></MenuLateral>

        <main className="d-flex flex-column  border border-primary m-3 rounded">
          <h3 className="text-center py-0 pt-3 my-0">CREAR CLIENTE</h3>
          <br />
          <form className="formulario" action="">
            <div className="contenedores d-flex justify-content-center flex-lg-row flex-column flex-sm-column mx-5 gap-5">
              <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100">
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Tipo documento</label>
                  <select className="form-select" required value={tipoDocumento} onChange={(e) => { setTipoDocumento(e.target.value) }}>
                    <option value="">Seleccionar</option>
                    <option value="Cedula">Cédula</option>
                    <option value="Nit">Nit</option>
                  </select>
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Nombre</label>
                  <input type="text" className="form-control" id="nombre" placeholder="Nombre" required onInput={validarTexto} value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Teléfono</label>
                  <input type="text" className="form-control" placeholder="Teléfono" required onKeyDown={validarNumericos} value={telefono} onChange={(e) => { setTelefono(e.target.value) }} />
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Grupo</label>
                  <input type="text" className="form-control" placeholder="Grupo" required onInput={validarTexto} value={grupo} onChange={(e) => { setGrupo(e.target.value) }} />
                </div>
                <h2>Datos codeudor</h2>
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Tipo documento Codeudor</label>
                  <select id="cliente" className="form-select" required value={tipoDocumentoCod} onChange={(e) => { setTipoDocumentoCod(e.target.value) }}>
                    <option value="">Seleccionar</option>
                    <option value="Cedula">Cédula</option>
                    <option value="Nit">Nit</option>
                  </select>
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Nombre Codeudor</label>
                  <input type="text" className="form-control" placeholder="Nombre Codeudor" required onInput={validarTexto} value={nombreCodeudor} onChange={(e) => { setNombreCodeudor(e.target.value) }} />
                </div>

              </div>
              <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0 w-100">
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Cédula</label>
                  <input type="text" className="form-control" id="cedula" placeholder="Cédula" maxLength={10} minLength={6} required onKeyDown={validarNumericos} value={cedula} onChange={(e) => { setCedula(e.target.value) }} />
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
            </div>
            <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5">
              <div className="d-flex justify-content-center w-100">
                <div className="div_botones ms-sm-0 w-100 d-flex justify-content-center">
                  <button type="button" className="btn btn-dark btn-styles" onClick={agregarCliente}>Guardar</button>
                </div>
              </div>
              <div className="d-flex justify-content-center w-100">
                <div className="div_botones me-sm-0 w-100 d-flex justify-content-center">
                  <button type="button" className="btn btn-dark btn-styles" onClick={handleCancelar}>Cancelar</button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </section>
    </>
  )
}

export default CrearCliente