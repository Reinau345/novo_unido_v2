import { useState, useEffect, createContext } from 'react'

const NegociacionContext = createContext();

const NegociacionProvider = ({ children }) => {

    const [negociaciones, setNegociaciones] = useState({})

    useEffect(() => {
        const obtenerNegociacion = async () => {
            fetch('http://localhost:4000/api/negociacion/obtenerNegociaciones')
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Error al obtener los datos de la negociación');
                    }
                    return res.json();
                })
                .then((data) => {
                    setNegociaciones(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        obtenerNegociacion()
    },[])

    return(
        <NegociacionContext.Provider
            value={{
                negociaciones,
                setNegociaciones
            }}
        >
            {children}
        </NegociacionContext.Provider>
    )
}

export {
    NegociacionProvider
}

export default NegociacionContext;