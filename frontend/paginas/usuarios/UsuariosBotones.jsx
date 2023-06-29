import React from 'react'

import Encabezado from '../../components/Encabezado'
import MenuLateral from '../../components/MenuLateral'
import Pie from '../../components/Pie'
import UsuariosBotonesComponente from '../../components/usuariosBotonesComponente'

const UsuariosBotones = () => {
  return (
    <>
      {/* <div>UsuariosBotones</div> */}

      <Encabezado></Encabezado>
      <MenuLateral componentePrincipal={<UsuariosBotonesComponente/>}>
      </MenuLateral>
      <Pie></Pie>

    </>
  )
}

export default UsuariosBotones