import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { loginFormValidationSchema } from '../../utils/validationSchemas'
import {yupResolver} from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import useLogIn from '../../hooks/useLogIn'
import '../../styles.css'



const StyledFormContainer = styled.div`
    background-color: #e8e4e6;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
    padding: 10px;
`


const LoginForm = () => {
  const {handleSubmit, register, formState:{errors}} = useForm({
    resolver: yupResolver(loginFormValidationSchema)
  })
  const {fetchLogin, loading, error} = useLogIn()

  const onSubmitFormLogin = async(data)=>{
    await fetchLogin(data)
  }
  return (
    <StyledFormContainer>
      <h1>Mi albúm Qatar 2022</h1>
      <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit(onSubmitFormLogin)}>
          
            <input className={errors.email && 'inputError'} type="text" placeholder='email' {...register("email")}/>
            <p className='error'>{errors.email?.message}</p>
          

            <input className={errors.password && 'inputError'} type="password" placeholder='password'{...register("password")}/>
            <p className='error'>{errors.password?.message}</p>

          <input className="primaryButton" type="submit" value="Enviar"/>
        </form>
        <Link className='underscoredGrayLink' to='/signup'> Haz clic aquí para registrarte</Link>
        {loading && <p>cargando</p>}
        {error && <p className='error'>{error}</p>}
    </StyledFormContainer>
  )
}

export default LoginForm