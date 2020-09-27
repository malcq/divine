import { useState, useEffect } from 'react';

export const useBoxHeight = (ref: React.RefObject<HTMLElement>) => {
  const [viewHeight, setViewHeight] = useState<number>(0);
  useEffect(() => {
    if (!ref.current) return;
    const height = ref.current.offsetHeight
    setViewHeight(height);
  }, [ref]);

  return {
    viewHeight
  }
};