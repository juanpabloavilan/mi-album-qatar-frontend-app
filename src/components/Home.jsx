import React, { useContext } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {BsFillStickiesFill} from 'react-icons/bs'
import {CgArrowsExchange, CgProfile} from 'react-icons/cg'
import { userContext } from './context/UserContext'


const StyledContainer = styled.div`
    background: #f9f9f9;
    min-height: 100vh;
    min-width: 100vw;
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


const UserLoggedIcon = () =>{
    const {user} = useContext(userContext)
    console.log(user)
    const username = user?.user?.username
    return(
        <div className='UserLoggedIcon'>
            <CgProfile style={{fontSize: "2.5rem", color: "#abd1c6"}}/>
            <h4 style={{color:"#abd1c6"}}>{username}</h4>
        </div>
    )
}



const NavBar = ()=>{
    return(
        <div className="navbar">
            <div className='flexRow'>
                <img className='logo' src={require('../images/logo_fifa_world_cup.png')} alt="fifa logo world cup"/>
                <h3 className='title'>Mi album <br/>Qatar 2022</h3>
            </div>
            <div className='AppBarContainer'>
                <p className='secondaryText'>Menú</p>
                <NavBarTab icon={<BsFillStickiesFill/>} text="Album" to='album'/>
                <NavBarTab icon={<CgArrowsExchange/>} text="Intercambiar" to='intercambio'/>
                <NavBarTab icon={<CgProfile/>} text="Perfil" to='perfil'/>
            </div>
        </div>
    )
}

const StyledNavBarTab = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 100%;
    height: 2rem;
    padding-left: 1rem;
    align-items: center;
    border-right:  ${props => props.selected ? 'solid #abd1c6 3px' : 'none'};
`

const NavBarTab = ({icon, text, to}) => {
    const location = useLocation();
    console.log(location)
    console.log(location.pathname.includes(to))
    const isSelected = location.pathname.includes(to)
    
    return(
        <StyledNavBarTab selected={isSelected}>
            <div style={{color: isSelected && '#abd1c6' }}>
                {icon}
            </div>
            <Link to={to} className='title' style={{color: isSelected && '#abd1c6' }}>{text}</Link>
        </StyledNavBarTab>
    )
}

export default Home