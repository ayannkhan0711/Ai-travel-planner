import { useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return storage.get(key, initialValue);
  });

  useEffect(() => {
    storage.set(key, value);
  }, [key, value]);

  return [value, setValue];
};
