import { useEffect } from 'react';

// calculation a component height for cards animations, need to know 
// max component height
export const useViewHeight = (
  ref: React.RefObject<HTMLElement> | null,
  callback: (h: number) => void,
  dep?: any[]
) => {

  useEffect(() => {
    if (ref) {
      const height = ref.current?.offsetHeight;
      if (height) {
        callback(height)
      }
    }
  }, dep);
};