import React, { useEffect, useState } from 'react'
import { laminaRefSeccion } from '../data/laminasRefSeccion'
import useLocalStorage from './useLocalStorage'

const useFetchLaminas = ({seccion}) => {
  const [error, setError] = useState()
  const [loading, setLoading] = useState()
  const [laminas, setLaminas] = useState()
  const [diccionarioAlbum, setDiccionarioAlbum] = useLocalStorage('album')
  
  const fetchLaminas = async(seccion)=>{
    console.log('fetching laminas desde hook ', seccion);
    const res = await fetch(`http://localhost:9090/album/equipo/${seccion}`)
    const data = await res.json()
    const diccionarioLaminas = {}
    const laminas = data?.map(lamina => {
      const numero = lamina.refLamina.numero
      const mappedLamina = { cantidad: lamina.quantity, ...lamina.refLamina  }
      diccionarioLaminas[numero] = mappedLamina 
      return mappedLamina
    });
    console.log(diccionarioLaminas);
    setDiccionarioAlbum({...diccionarioAlbum, ...diccionarioLaminas})
    return laminas
  }

  return [fetchLaminas, error, loading]
}

export default useFetchLaminas