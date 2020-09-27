import { useEffect, useState, useCallback } from 'react';

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  const sreenWitdhListener = useCallback(() => {
    if (window) {
      setScreenWidth(window.innerWidth)
    }
  }, []);

  useEffect(() => {
    sreenWitdhListener()
    window.addEventListener('resize', sreenWitdhListener);
    return () => {
      window.removeEventListener('resize', sreenWitdhListener);
    }
  }, []);

  return {
    screenWidth
  }
};