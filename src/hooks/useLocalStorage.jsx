import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState();

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) setValue(JSON.parse(item));
      else setValue(initialValue);
    } catch (e) {
      setValue(initialValue);
      console.log(e);
    }
  }, []);

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

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
