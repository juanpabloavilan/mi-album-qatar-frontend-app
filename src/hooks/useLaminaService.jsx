import React, { useState } from 'react'
import useLocalStorage from './useLocalStorage'
import { laminaRefSeccion } from '../data/laminasRefSeccion'

const useLaminaService = () => {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [getDiccionarioAlbum, setDiccionarioAlbum] = useLocalStorage('album')
  const [getUser] = useLocalStorage('user')

  const userId = getUser().user?._id

  const postLamina = async(numero) => {
    setLoading(true)
    try{
        console.log('posting new lamina')
        const res = await fetch(`${process.env.REACT_APP_API_URL}/lamina/`, {
            method: 'POST',
            cache: 'no-cache',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ownerId: userId,
                numero: numero
            })
        })

        console.log(await res.json())
        const newDiccionario = {...getDiccionarioAlbum(), ...getDiccionarioAlbum()[numero].cantidad=1}
        console.log(newDiccionario);
        setDiccionarioAlbum(newDiccionario) 
    }catch(e){
        console.log('error at postLamina ', e);
        setError(e)
    }finally{
        setLoading(false)
    }
  }
  const increaseLaminaQuantity = async(numero) =>{
    setLoading(true)
    try{
        console.log('patch increasing lamina quantity')
        const res = await fetch(`${process.env.REACT_APP_API_URL}/lamina/increase/${numero}/${userId}`,{
            method: 'PATCH',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(await res.json())
        const newDiccionario = {...getDiccionarioAlbum(), ...getDiccionarioAlbum()[numero].cantidad+=1}
        setDiccionarioAlbum(newDiccionario)

    }catch(e){
        console.log('error at increaseLaminaQuantity  ', e);
        setError(e)
    }finally{
        setLoading(false)
    }
    
  }
  const decreaseLaminaQuantity = async(numero, id)=>{
    setLoading(true)
    try{
        console.log('patch decreasing lamina quantity')
        const res = await fetch(`${process.env.REACT_APP_API_URL}/lamina/decrease/${numero}/${userId}`,{
            method: 'PATCH',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(await res.json())
        setDiccionarioAlbum({...getDiccionarioAlbum(), ...getDiccionarioAlbum()[numero].cantidad-=1})
    }catch(e){
        console.log('error at decreaseLaminaQuantity  ', e);
        setError(e)
    }finally{
        setLoading(false)
    }
  }

  const getLaminaQuantity = (numero) => {
    setLoading(true)
    try{
        const cantidad = getDiccionarioAlbum()[numero].cantidad
        return cantidad
    }catch(e){
        console.log('error at decreaseLaminaQuantity  ', e);
        setError(e)
    }finally{
        setLoading(false)
    }
  }

  return {getLaminaQuantity, postLamina, increaseLaminaQuantity, decreaseLaminaQuantity, error, loading}
}

export default useLaminaService