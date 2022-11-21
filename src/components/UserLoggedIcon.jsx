import useLocalStorage from "../hooks/useLocalStorage"
import {CgProfile} from 'react-icons/cg'
const UserLoggedIcon = () =>{
    const [user] = useLocalStorage('user')
    const username = user?.user?.username
    return(
        <div className='UserLoggedIcon'>
            <CgProfile style={{fontSize: "2.5rem", color: "#abd1c6"}}/>
            <h4 style={{color:"#abd1c6"}}>{username}</h4>
        </div>
    )
}

export default UserLoggedIcon