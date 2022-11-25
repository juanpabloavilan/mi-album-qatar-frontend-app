import React, { useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage'

const useIntercambioService = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [error, setError] = useState()
  const URL = `${process.env.API_URL}/mesaDeIntercambio`
  const [getUser] = useLocalStorage('user')
  const currentUserId = getUser().user?._id

  const consultarIntercambio = async(otherUserEmail) => {
    setLoading(true)
    try{
      const req = await fetch(`${URL}/intercambio/${currentUserId}/${otherUserEmail}`)
      const res = await req.json()
      console.log(res);
      if(res){
        const listaLaminasParaIntercambiar = res.map((item)=>{
          return item.lamina
        }) 
        setData(listaLaminasParaIntercambiar)
        return listaLaminasParaIntercambiar
      }
    }catch(e){
      setError("Ooops! Something bad happened")
    }finally{
      setLoading(false)
    }
  }

  const recibirLamina = async(numero, otherUserEmail) =>{
    setLoading(true)
    try{
      const req = await fetch(`${URL}/intercambio/`, {
        method: "POST",
        cache: 'no-cache',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          currentUserId: currentUserId,
          otherUserEmail: otherUserEmail,
          numero: numero
        })
      })
      const res = await req.json()
      console.log(res);
      return res
    }catch(e){
      setError("Ooops! Something bad happened")
    }finally{
      setLoading(false)
    }
  }

  return {loading, error, data, consultarIntercambio, recibirLamina}
}

export default useIntercambioService