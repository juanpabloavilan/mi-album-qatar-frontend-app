import React, { useState } from 'react'
import useLocalStorage from './useLocalStorage'
import { laminaRefSeccion } from '../data/laminasRefSeccion'

const useLaminaService = () => {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [diccionarioAlbum, setDiccionarioAlbum] = useLocalStorage('album')

  const postLamina = async(numero) => {
    setLoading(true)
    try{
        console.log('posting new lamina')
        const lamina = await fetch()
        const newDiccionario = {...diccionarioAlbum, numero:{lamina}}
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
        laminaRefSeccion.map((laminaRef)=> {
            if(laminaRef[numero] === numero){
                laminaRef.cantidad += 1
            }
        })
        const newDiccionario = {...diccionarioAlbum, ...diccionarioAlbum[numero].cantidad+=1}
        setDiccionarioAlbum(newDiccionario)

    }catch(e){
        console.log('error at increaseLaminaQuantity  ', e);
        setError(e)
    }finally{
        setLoading(false)
    }
    
  }
  const decreaseLaminaQuantity = (numero)=>{
    setLoading(true)
    try{
        console.log('patch decreasing lamina quantity')
        setDiccionarioAlbum({...diccionarioAlbum, ...diccionarioAlbum[numero].cantidad-=1})
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
        console.log('consulting lamina quantity')
        return diccionarioAlbum[numero].cantidad
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