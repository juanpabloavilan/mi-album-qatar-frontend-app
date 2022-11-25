import { Link,  useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {BsFillStickiesFill} from 'react-icons/bs'
import {CgArrowsExchange, CgProfile} from 'react-icons/cg'
import {VscSignOut} from 'react-icons/vsc'
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
                <NavBarTab icon={<VscSignOut/>} text="Cerrar sesión" to='/'/>
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
    border-left:  ${props => props.selected ? 'solid #abd1c6 3px' : 'none'};
    
`

const NavBarTab = ({icon, text, to}) => {
    const location = useLocation();
    const isSelected = location.pathname.endsWith(to)
    
    return(
        <StyledNavBarTab selected={isSelected}>
            <div style={{color: isSelected && '#abd1c6' }}>
                {icon}
            </div>
            <Link to={to} className='title' style={{color: isSelected && '#abd1c6' }}>{text}</Link>
        </StyledNavBarTab>
    )
}

export default NavBar