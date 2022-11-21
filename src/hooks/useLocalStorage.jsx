import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState();

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item))
      } else{
        setValue(initialValue);
      }
    } catch (e) {
      setValue(initialValue);
      //console.log(e);
    }
  }, []);

  const getValue= ()=>{
    return JSON.parse(window.localStorage.getItem(key))
  }

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(undefined);
      window.localStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  return [getValue, setValue, removeValue];
};

export default useLocalStorage;
