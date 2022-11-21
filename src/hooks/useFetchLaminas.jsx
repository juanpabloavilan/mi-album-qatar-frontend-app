import React, { useEffect, useState } from 'react'
import { laminaRefSeccion } from '../data/laminasRefSeccion'
import useLocalStorage from './useLocalStorage'

const useFetchLaminas = ({seccion}) => {
  const [error, setError] = useState()
  const [loading, setLoading] = useState()
  const [laminas, setLaminas] = useState()
  const [getUsuario] = useLocalStorage('user')
  const [getDiccionarioAlbum, setDiccionarioAlbum] = useLocalStorage('album')
  const diccionarioAlbum = getDiccionarioAlbum()
  const userId = getUsuario()?.user._id
  
  const fetchLaminas = async(seccion)=>{
    console.log('fetching laminas desde hook ', seccion);
    const res = await fetch(`http://localhost:9090/album/equipo/${seccion}/${userId}`)
    const data = await res.json()
    const diccionarioLaminasSeccion = {}

    const laminas = data?.map(lamina => {
      const numero = lamina.laminaRef.numero
      const mappedLamina = { ...lamina.laminaRef, cantidad: lamina.cantidad }
      diccionarioLaminasSeccion[numero] = mappedLamina

      return mappedLamina
    });

    console.log(diccionarioLaminasSeccion);
    setDiccionarioAlbum({...diccionarioAlbum, ...diccionarioLaminasSeccion})
    return laminas
  }

  return [fetchLaminas, error, loading]
}

export default useFetchLaminas