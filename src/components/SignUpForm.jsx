import React from 'react'
import {useForm} from 'react-hook-form'
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup'
import '../styles.css'
import { signUpFormValidationSchema } from '../utils/validationSchemas'

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

const SignUpForm = () => {
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(signUpFormValidationSchema)
  })

  const onSubmitForm = (data)=>{
    console.log(data)
  }
  return (
    <StyledFormContainer>
        <h1>Mi album Qatar 2022</h1>
        <h2>Registro</h2>
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <input className={errors.name && 'inputError'} type="text" placeholder="Nombre" {...register('name')}/>
            <p className='error'>{errors.name?.message}</p>
            <input className={errors.lastname && 'inputError'} type="text" placeholder="Apellido" {...register('lastname')}/>
            <p className='error'>{errors.lastname?.message}</p>
            <input className={errors.email && 'inputError'} type="text" placeholder="Correo electronico" {...register('email')}/>
            <p className='error'>{errors.email?.message}</p>
            <input className={errors.username && 'inputError'} type="text" placeholder="Usuario" {...register('username')}/>
            <p className='error'>{errors.username?.message}</p>
            <input className={errors.password && 'inputError'} type="password" placeholder="Contraseña" {...register('password')}/>
            <p className='error'>{errors.password?.message}</p>
            <input className={errors.confirmPassword && 'inputError'} type="password" placeholder="Confirmar contraseña" {...register('confirmPassword')}/>
            <p className='error'>{errors.confirmPassword && "Contraseñas no coinciden"}</p>
            <input className="primaryButton" type="submit" value="Registrarse"/>
        </form>
    </StyledFormContainer>
  )
}

export default SignUpForm