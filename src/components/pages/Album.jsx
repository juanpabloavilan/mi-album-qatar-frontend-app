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

  const [diccionarioLaminas] = useLocalStorage('album')

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
        <h2>{seccion}</h2>
        <div className="laminas-grid">
          {laminas?.map((lamina)=>{
            const numero = lamina.numero
            return (<Lamina key={numero} {...diccionarioLaminas[numero]}/>)
          })}
        </div>
      </StyledContainer>
    </StyledContainer>
  );
};


const Lamina = ({numero, equipo, nombre, tipo, imgUrl, cantidad=0})=>{
  const [isBeingSelected, setBeingSelected] = useState(false)
  const {
    getLaminaQuantity,
    decreaseLaminaQuantity,
    increaseLaminaQuantity,
    postLamina,
    error, 
    loading
  } = useLaminaService()

  const reducer = (state, action) =>{
    switch (action.type){
      case 'increment':
        increaseLaminaQuantity(numero) //llamada api
        return {count: state.count +1}
      case 'decrement':
        if(action.cantidad <= 0) return
        decreaseLaminaQuantity(numero) //llamada api
        return {count: state.count -1}
      case 'create':
        if(action.cantidad!== 0) return
        postLamina(numero) 
        return {count: 1}
      case 'consult':
        const cantidad = getLaminaQuantity(numero) //llamada api
        return {count: cantidad ? cantidad: 0}
       default:
        throw new Error('not a valid reducer method') 
    }
  }
  
  return (
    <StyledLamina tipo={tipo} cantidad={cantidad} onMouseEnter={()=>setBeingSelected(true)} onMouseLeave={()=>setBeingSelected(false)}>
      <p>{numero}</p>
      {cantidad > 0 && 
        <>
        <p>{nombre}</p>
        <p>{tipo}</p>
        </>
      }
      {
        true && <IncreaseDecreaseInput numero={numero} initialValue={{count: cantidad}} reducer={reducer}/>
      }
        
    </StyledLamina>
  )
}

const IncreaseDecreaseInput = ({ numero, initialValue, reducer})=>{
  const [state, dispatch] = useReducer(reducer, initialValue)
  console.log(numero, state.count); 

  useEffect(()=>{
    dispatch({type: 'consult'})
  }, [])
  if(state.count === 0){
    return (
      <button className="" onClick={()=> reducer('create')}>
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
   return props.tipo === 'especial' ?  '' :
   props.tipo ==='escudo' ? '2px solid #f9bc60' : 
   props.tipo === 'jugador' ? '2px solid #e8ecef' :
   props.tipo === 'estadio' ? '2px solid #004643' : 
   props.tipo === 'museo' ? '2px solid #e16162' :
   ''
  }};
  background-color: ${props => {
   return props.cantidad > 0 ?  
   props.tipo ==='escudo' ? '#f9bc60' : 
   props.tipo === 'jugador' ? '#e8ecef' :
   props.tipo === 'estadio' ? '#004643' : 
   props.tipo === 'museo' ? '#e16162' :''
   : 'none'
  }} ;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  height: 300px;
  
`


