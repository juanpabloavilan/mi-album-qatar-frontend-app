import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import useFetchLaminas from "../../hooks/useFetchLaminas";
import useLaminaService from "../../hooks/useLaminaService";
import useLocalStorage from "../../hooks/useLocalStorage";
import { secciones, tiposDeLaminas } from "../../data/enums";
import Dropdown from "../Dropdown";

const StyledContainer = styled.div`
    margin: 0;
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem 2rem 1.5rem;
    background: #f9f9f9;
    min-height: 100vh;
    width: 100%;
`

const Album = () => {
  const [seccion, setSeccion] = useState("Especiales")
  const [fetchLaminasRef, loading, error] = useFetchLaminas(seccion)
  const [laminas, setLaminas] = useState()

  const [getDiccionarioLaminas] = useLocalStorage('album')

  useEffect(()=>{
    //console.log("Buscando laminas de referencia", seccion)
    const fetchLaminas = async() =>{
      const laminas = await fetchLaminasRef(seccion)
      setLaminas(laminas)
    } 
    fetchLaminas()
  }, [seccion])

  const cambiarSeccion = (seccion)=>{
    setSeccion(seccion)
  }
  
  return(
    <StyledContainer>
      <h1>Album</h1>
      <Dropdown list={secciones} cambiarSeccion={cambiarSeccion}/>
      <StyledContainer>
        <h1>{seccion}</h1>
        <div className="laminas-grid">
          {laminas?.map((lamina)=>{
            const numero = lamina.numero
            return (<Lamina key={numero} {...getDiccionarioLaminas()[numero]}/>)
          })}
        </div>
      </StyledContainer>
    </StyledContainer>
  );
};


const Lamina = ({numero, equipo, nombre, tipo, imgUrl, cantidad: cantidadInicial=0})=>{
  const [cantidad, setCantidad] = useState(cantidadInicial)
  const {
    getLaminaQuantity,
    decreaseLaminaQuantity,
    increaseLaminaQuantity,
    postLamina,
    error, 
    loading
  } = useLaminaService()

  const reducer = (state, action) =>{
    let nuevaCuenta
    switch (action.type){
      case 'increment':
        increaseLaminaQuantity(numero) //llamada api
        nuevaCuenta = state.count +1
        setCantidad(nuevaCuenta)
        return {count: nuevaCuenta}
      case 'decrement':
        if(action.cantidad <= 1) return {count: state.count}
        decreaseLaminaQuantity(numero) //llamada api
        nuevaCuenta = state.count -1
        setCantidad(nuevaCuenta)
        return {count: nuevaCuenta}
      case 'create':
        if(action.cantidad !== 0) return
        postLamina(numero) 
        setCantidad(1)
        return {count: 1}
      case 'consult':
        const cantidad = getLaminaQuantity(numero) //llamada api
        return {count: cantidad ? cantidad: 0}
       default:
        throw new Error('not a valid reducer method') 
    }
  }
  
  return (
    <StyledLamina tipo={tipo} cantidad={cantidad}>
      <p>{numero}</p>
      <p className="bold">{nombre}</p>
      <p>{tipo}</p>
      {error && <p>{error}</p>}
      {loading && <p>{loading}</p>}
      <IncreaseDecreaseInput numero={numero} initialValue={{count: cantidad}} reducer={reducer}/> 
    </StyledLamina>
  )
}

const IncreaseDecreaseInput = ({initialValue, reducer})=>{
  const [state, dispatch] = useReducer(reducer, initialValue)
  

  useEffect(()=>{
    dispatch({type: 'consult'})
  }, [])

  if(state.count === 0){
    return (
      <button className="" onClick={()=> dispatch({type: 'create', cantidad: state.count})}>
        Añadir lamina
      </button>
    )
  }
  return (
    <div className="controller-increase-decrease">
      <button className="red-bg" onClick={()=> dispatch({type: 'decrement', cantidad: state.count})}> - </button>
      <p>{state.count}</p>
      <button className="green-bg" onClick={()=> dispatch({type:'increment', cantidad: state.count})}>+</button>
    </div>
  )
}

export default Album;

const StyledLamina = styled.div`
  border: ${props => {
   return props.tipo === 'especial' ?  '2px solid #3da9fc' :
   props.tipo ==='escudo' ? '2px solid #f9bc60' : 
   props.tipo === 'jugador' ? '2px solid #e8ecef' :
   props.tipo === 'museo' ? '2px solid #e16162' :
   ''
  }};
  background-color: ${props => {
   return props.cantidad > 0 ?  
   props.tipo ==='escudo' ? '#f9bc60' : 
   props.tipo === 'jugador' ? '#e8ecef' :
   props.tipo === 'especial' ? '#3da9fc' : 
   props.tipo === 'museo' ? '#e16162' :''
   : 'none'
  }} ;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  height: 350px;
  padding: 1rem;
  text-align: center;
  
`


