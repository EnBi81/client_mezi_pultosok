import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export const useAppState = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const event = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        setCounter((prev) => prev + 1);
      }
    });

    return () => event.remove();
  }, []);

  return {
    onFocusCounter: counter,
  };
};
