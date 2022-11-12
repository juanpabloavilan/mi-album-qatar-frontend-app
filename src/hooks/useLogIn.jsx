import { useState } from "react";
import { useNavigate } from "react-router-dom";


const useLogIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate()

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
          console.log(response)
          navigate('/home')
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return {fetchLogin, loading, error};
};

export default useLogIn;
