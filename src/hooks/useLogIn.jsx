import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";


const useLogIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage('user', '')

  const fetchLogin = async (data) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:9090/usuario/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json()      
          if(response?.error){
              setError(response.error)
              return
          } 
          setUser(response)

          navigate('/home/album')
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return {fetchLogin, loading, error};
};

export default useLogIn;
