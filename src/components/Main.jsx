import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const StyledContainer = styled.div`
    background: #004643;
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Main = () => {
  return (
    <StyledContainer>
        <Routes>
          <Route path='/' element={<LoginForm/>}/>
          <Route path='/signup' element={<SignUpForm/>}/>
        </Routes>
    </StyledContainer>
  )
}

export default Main