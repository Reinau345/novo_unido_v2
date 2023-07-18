import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListarClientes from "../paginas/ListarClientes";
import FormCrearCliente from "../paginas/FormCrearCliente";
import FormEditarCliente from '../paginas/FormEditarCliente';
import ListarPlanesdepago from '../paginas/ListarPlanesdepago';
import FormCrearPlandepago from '../paginas/FormCrearPlandepago';
import FormEditarPlandepago from '../paginas/FormEditarPlandepago';
import ListarProductos from '../paginas/ListarProductos';
import FormCrearProducto from '../paginas/FormCrearProducto';
import FormEditarProducto from '../paginas/FormEditarProducto';
import ListarNegociaciones from '../paginas/ListarNegociaciones';
import FormCrearNegociacion from "../paginas/FormCrearNegociacion";
import FormEditarNegociacion from '../paginas/FormEditarNegociacion';
import AuthLayout from '../layout/AuthLayout'
import AdminLayout from '../layout/AdminLayout'

import Login from '../paginas/Login'
import Registrar from '../paginas/Registrar'
import ConfirmarCuenta from '../paginas/ConfirmarCuenta'
import OlvidePassword from '../paginas/OlvidePassword'
import Admin from '../paginas/Admin'
import NuevoPassword from '../paginas/NuevoPassword'
import EditarPerfil from '../paginas/perfil/EditarPerfilCarga'
import CambiarPasswordCarga from '../paginas/usuarios/CambiarPasswordCarga'
import UsuariosBotones from '../paginas/usuarios/UsuariosBotones'


import { AuthProvider } from '../context/AuthProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Clientes */}
          {/* <Route path="/listaclientes" element={<ListarClientes />}></Route> */}
          {/* <Route path="/crearcliente" element={<FormCrearCliente />}></Route> */}
          {/* <Route path="/editarcliente/:id" element={<FormEditarCliente />}></Route> */}
          {/* Planes de pago */}
          {/* <Route path="/listaplandepago" element={<ListarPlanesdepago />}></Route> */}
          {/* <Route path="/crearplandepago" element={<FormCrearPlandepago />}></Route> */}
          {/* <Route path="/editarplandepago/:id" element={<FormEditarPlandepago />}></Route> */}
          {/* Productos */}
          {/* <Route path="/listaproductos" element={<ListarProductos />}></Route> */}
          {/* <Route path="/crearproducto" element={<FormCrearProducto />}></Route> */}
          {/* <Route path="/editarproducto/:id" element={<FormEditarProducto />}></Route> */}
          {/* Negociaciones */}
          {/* <Route path="/listanegociaciones" element={<ListarNegociaciones />}></Route> */}
          {/* <Route path="/crearnegociacion" element={<FormCrearNegociacion />}></Route> */}
          {/* <Route path="/editarnegociacion/:id" element={<FormEditarNegociacion />}></Route> */}
          {/* Usuarios */}
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='olvide-password' element={<OlvidePassword />} />
            <Route path='olvide-password/:token' element={<NuevoPassword />} />
            <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
          </Route>

          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path='perfil' element={<EditarPerfil/>}/>
            <Route path='registrar' element={<Registrar />} />
            <Route path='cambiar-password' element={<CambiarPasswordCarga/>}/>
            <Route path='usuarios' element={<UsuariosBotones/>}/>

            {/* Clientes */}
            <Route path="listaclientes" element={<ListarClientes />}></Route>
            <Route path="crearcliente" element={<FormCrearCliente />}></Route>
            <Route path="editarcliente/:id" element={<FormEditarCliente />}></Route>
            
            {/* Planes de pago */}
            <Route path="listaplandepago" element={<ListarPlanesdepago />}></Route>
            <Route path="crearplandepago" element={<FormCrearPlandepago />}></Route>
            <Route path="editarplandepago/:id" element={<FormEditarPlandepago />}></Route>

            {/* Productos */}
            <Route path="listaproductos" element={<ListarProductos />}></Route>
            <Route path="crearproducto" element={<FormCrearProducto />}></Route>
            <Route path="editarproducto/:id" element={<FormEditarProducto />}></Route>

            {/* Negociaciones */}
            <Route path="listanegociaciones" element={<ListarNegociaciones />}></Route>
            <Route path="crearnegociacion" element={<FormCrearNegociacion />}></Route>
            <Route path="editarnegociacion/:id" element={<FormEditarNegociacion />}></Route>
       
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
