import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Home from '../components/pages/Home'
import LoginForm from '../components/pages/LoginForm'
import SignUpForm from '../components/pages/SignUpForm'
import Album from '../components/pages/Album'
import Intercambio from '../components/pages/Intercambio'
import Perfil from '../components/pages/Perfil'

const StyledContainer = styled.div`
    background: #004643;
    min-height: 100vh;
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
          <Route path='/home' element={<Home/>} >
            <Route path='album' element={<Album/>}/>
            <Route path='intercambio' element={<Intercambio/>}/>
            <Route path='perfil' element={<Perfil/>}/>
          </Route>
          <Route path='*' element={<div>Not Found</div>}/>
        </Routes>
    </StyledContainer>
  )
}

export default Main