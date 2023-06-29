import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const CrearCliente = () => {
  // Hooks  
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [nombreCodeudor, setNombreCodeudor] = useState('');
  const [cedulaCodeudor, setCedulaCodeudor] = useState('');
  const [telefonoCodeudor, setTelefonoCodeudor] = useState('');
  const [direccionCodeudor, setDireccionCodeudor] = useState('');
  const [grupo, setGrupo] = useState('');
  const [estado, setEstado] = useState('');
  const { auth } = useAuth()

  function validarNumericos(event) {
    const charCode = event.keyCode || event.which;
    const char = String.fromCharCode(charCode);

    // Permitir la tecla de retroceso (backspace) y la tecla de suprimir (delete)
    if (charCode === 8 || charCode === 46) {
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
    const charCode = event.keyCode || event.which;
    const char = String.fromCharCode(charCode);

    // Permitir la tecla de retroceso (backspace) y la tecla de suprimir (delete)
    if (charCode === 8 || charCode === 46) {
      return;
    }

    // Verificar si el carácter es un carácter especial
    if (/[^A-Za-z0-9\s]/.test(char)) {
      event.preventDefault();
    }
  }

  const agregarCliente = async () => {

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
      direccionCodeudor === '' ||
      grupo === '' ||
      estado === ''
    ) {
      // Mostrar un mensaje de error o realizar alguna acción apropiada
      console.error('Todos los campos son obligatorios');
      return;
    }

    //Continuar con el proceso 
    const nuevoCliente = {
      cedula,
      nombre,
      direccion,
      telefono,
      email,
      nombreCodeudor,
      cedulaCodeudor,
      telefonoCodeudor,
      direccionCodeudor,
      grupo,
      estado,
    };

    try {
      const response = await fetch('http://localhost:4000/api/cliente/agregarCliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoCliente)
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Cliente agregado correctamente
      } else {
        throw new Error('Error al agregar el cliente');
      }
    } catch (error) {
      console.error(error);
      // Maneja el error de alguna forma (por ejemplo, muestra un mensaje de error en el formulario)
    }
  };

  return (
    <>
      <section className="d-flex">
        <aside className="">
          <ul className="d-flex flex-column justify-content-start w-100 px-0 my-0 mx-0">
            <div className="d-flex justify-content-start align-items-center px-3 py-2">
              <i className="py-3">
                <img className="rounded-circle" src="https://e7.pngegg.com/pngimages/164/153/png-clipart-donut-the-simpsons-tapped-out-doughnut-homer-simpson-bart-simpson-krusty-the-clown-donut-food-bagel.png" alt="batman " title="batman" width="40" height="40" />
              </i>
              <p className="mb-0 mx-3 text-icon-menu">{auth.nombre} {auth.apellido}</p>
            </div>
            <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="/admin/usuarios">
              <div className="d-flex align-items-center">
                <i className="icon-menu fa-solid fa-user-tie mx-4" title="Usuarios"></i>
                <p className="text-icon-menu my-0">Usuarios</p>
              </div>
            </Link>
            <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="/admin/listaclientes">
              <div className="d-flex align-items-center">
                <i className="icon-menu fa-solid fa-user mx-4" title="Clientes"></i>
                <p className="text-icon-menu my-0">Clientes</p>
              </div>
            </Link>
            <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="/listaproductos">
              <div className="d-flex align-items-center">
                <i className="icon-menu fa-solid fa-box-open mx-4" title="Productos"></i>
                <p className="text-icon-menu my-0">Productos</p>
              </div>
            </Link>
            <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="/listanegociaciones">
              <div className="d-flex align-items-center">
                <i className="icon-menu fa-solid fa-sack-dollar mx-4" title="Negociaciones"></i>
                <p className="text-icon-menu my-0">Negociaciones</p>
              </div>
            </Link>
            <Link className="d-flex justify-content-between py-2 border-bottom border-dark" to="/listaplandepago">
              <div className="d-flex align-items-center">
                <i className="icon-menu fa-solid fa-money-bill-1-wave mx-4" title="Planes de pago"></i>
                <p className="text-icon-menu my-0">Planes de pago</p>
              </div>
            </Link>
            {/* <Link className="d-flex justify-content-between py-2 border-bottom border-dark" to="listar.html">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-book-open mx-4" title="Catálogo"></i>
                                <p className="text-icon-menu my-0">Catálogo de productos</p>
                            </div>
                        </Link> */}
          </ul>
        </aside>
        
        <main className="d-flex flex-column">
          <h1 className="text-center py-0 pt-5 my-0">CREAR CLIENTE</h1>
          <Link to="/admin/listaclientes" style={{ color: 'black', textDecoration: 'none' }}>
            <div className="controles d-flex align-items-center">
              <i className="icon-menu fa-solid fa-angles-left"> Volver </i>
            </div>
          </Link>
          <form className="formulario" action="">
            <div className="contenedores d-flex justify-content-center flex-lg-row flex-column flex-sm-column mx-5 gap-5">
              <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100">
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Cédula</label>
                  <input type="text" className="form-control" id="cedula" placeholder="Cédula" required onKeyDown={validarNumericos} value={cedula} onChange={(e) => { setCedula(e.target.value) }} />
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Nombre</label>
                  <input type="text" className="form-control" id="nombre" placeholder="Nombre" required onKeyDown={validarTexto} value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Dirección</label>
                  <input type="text" className="form-control" placeholder="Dirección" required value={direccion} onChange={(e) => { setDireccion(e.target.value) }} />
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Teléfono</label>
                  <input type="text" className="form-control" placeholder="Teléfono" required onKeyDown={validarNumericos} value={telefono} onChange={(e) => { setTelefono(e.target.value) }} />
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Email</label>
                  <input type="text" className="form-control" placeholder="Email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Nombre Codeudor</label>
                  <input type="text" className="form-control" placeholder="Nombre Codeudor" required onKeyDown={validarTexto} value={nombreCodeudor} onChange={(e) => { setNombreCodeudor(e.target.value) }} />
                </div>
              </div>
              <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0 w-100">
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Cédula Codeudor</label>
                  <input type="text" className="form-control" placeholder="Cédula Codeudor" required onKeyDown={validarNumericos} value={cedulaCodeudor} onChange={(e) => { setCedulaCodeudor(e.target.value) }} />
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Teléfono Codeudor</label>
                  <input type="text" className="form-control" placeholder="Teléfono Codeudor" required onKeyDown={validarNumericos} value={telefonoCodeudor} onChange={(e) => { setTelefonoCodeudor(e.target.value) }} />
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Dirección Codeudor</label>
                  <input type="text" className="form-control" placeholder="Dirección Codeudor" required value={direccionCodeudor} onChange={(e) => { setDireccionCodeudor(e.target.value) }} />
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Grupo</label>
                  <input type="text" className="form-control" placeholder="Grupo" required onKeyDown={validarTexto} value={grupo} onChange={(e) => { setGrupo(e.target.value) }} />
                </div>
                <div className="mb-3 w-100">
                  <label className="form-label fw-bold">Estado</label>
                  <select className="form-select" value={estado} onChange={(e) => { setEstado(e.target.value) }}>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5">
              <div className="d-flex justify-content-center w-100">
                <div className="div_botones ms-sm-0 w-100">
                  <button type="submit" className="btn btn-dark w-100 btn-styles" onClick={agregarCliente}>Guardar</button>
                </div>
              </div>
              <div className="d-flex justify-content-center w-100">
                <div className="div_botones me-sm-0 w-100">
                  <button type="reset" className="btn btn-dark w-100 btn-styles">Limpiar</button>
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