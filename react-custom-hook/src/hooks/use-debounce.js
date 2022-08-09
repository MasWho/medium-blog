import { useEffect, useState } from "react"

const useDebounce = () => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return () => {
      if(timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const debounce = (callback, delay) => {
    if(timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      callback();
    }, delay);
    
    setTimer(newTimer);
  };

  return {
    debounce,
  };
};