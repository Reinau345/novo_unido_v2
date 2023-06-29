

const Alerta = ({ alerta }) => {
    return (
      <div className={`${alerta.error ? 'alert alert-danger' : 'alert alert-success'}`} role="alert">
        {alerta.msg}
      </div>
    )
  }
  
  export default Alerta