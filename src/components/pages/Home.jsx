import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import UserLoggedIcon from '../UserLoggedIcon'
import NavBar from '../NavBar'


const StyledContainer = styled.div`
    background: #f9f9f9;
    min-height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
`
const Home = () => {
  return (
    <StyledContainer>
        <NavBar/>
        <UserLoggedIcon/>   
        <Outlet/>
    </StyledContainer>
  )
}
export default Home