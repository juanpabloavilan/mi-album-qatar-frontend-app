import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useSignUp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState()
  const navigate = useNavigate()

  const fetchSignUp = async (data) => {
      
      setError(null)
      setLoading(true)
      //Enviar request de registrar
      try{
          const res = await fetch('http://localhost:9090/usuario/signup',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          const response = await res.json()      
          if(response?.error){
              setError(response.error)
              return
          } 
          setData(response)
          navigate('/')

      }catch(e){
        console.log(e)
      }finally{
        setLoading(false)
      }


          
  }

  return {fetchSignUp, error, loading, data}
}

export default useSignUp