import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useIntercambioService from '../../hooks/useConsultarIntercambioService';
import { exchangeLaminaFormValidationSchema } from '../../utils/validationSchemas';

const StyledContainer = styled.div`
    background: #f9f9f9;
    min-height: 100vh;
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    padding: 4rem;
`
const Intercambio = () => {
  const [listaLaminas, setListaLaminas] = useState();
  const {consultarIntercambio, recibirLamina} = useIntercambioService()
  const [otherUserEmail, setOtherUserEmail] = useState();

  const consultarLaminas = ({email})=> {
    setOtherUserEmail(email)
    consultarIntercambio(email).then((lista)=>{
      setListaLaminas(lista)
    })
  }
  const recibirLaminaIntercambio = (numero)=>{
    recibirLamina(numero, otherUserEmail).then((res) => {console.log(res)})
    setListaLaminas(listaLaminas?.filter((lamina)=> lamina.numero !== numero))
  }

    return(
        <StyledContainer>
            <FormExchangeWith onSubmitForm={consultarLaminas}/> 
            <h2>Láminas de este usuario que te sirven</h2>
            <ListaLaminas listaLaminas={listaLaminas} recibirLamina={recibirLaminaIntercambio}/>
        </StyledContainer>
      );
}

const ListaLaminas = ({listaLaminas, recibirLamina})=>{
  return(<div className='laminas-grid'>
    {listaLaminas && listaLaminas?.map(lamina=>{
      return (<FichaDeIntercambio key={lamina.numero} numero={lamina.numero} recibirLamina={recibirLamina}/>)
    })}
  </div>);

}

const FormExchangeWith= ({onSubmitForm}) => {
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(exchangeLaminaFormValidationSchema)
  })

  return(
    <div>
      <h2>Intercambiar fichas con otros usuarios</h2>
      <p>Ingresa el email de un usuario registrado para saber cuales láminas puedes intercambiar</p>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <input className={errors.email && 'inputError'} type='text' placeholder='email' {...register('email')} />
        <p className='error'>{errors.email?.message}</p>
        <input type='submit' value='Buscar'/>
      </form>
    </div>
  )
}

const FichaDeIntercambio = ({numero, recibirLamina}) =>{
 return(<div className='lamina-container'>
    <h3>{numero}</h3>
    <button onClick={()=>{
      recibirLamina(numero)
    }}>Aceptar Lámina</button>
  </div>);
}

export default Intercambio