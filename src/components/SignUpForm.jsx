import React from 'react'
import {useForm} from 'react-hook-form'
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup'
import '../styles.css'

const StyledFormContainer = styled.div`
    background-color: #e8e4e6;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 500px;
    padding: 10px;
`

const SignUpForm = () => {
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver()
  })
  return (
    <StyledFormContainer>
        <h1>Mi album Qatar 2022</h1>
        <h2>Registro</h2>
        <form></form>
    </StyledFormContainer>
  )
}

export default SignUpForm