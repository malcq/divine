import { useEffect } from 'react';

export const useDeactivetedWidget = (
  dispatch: () => void,
  state: boolean
) => {

  useEffect(() => {
    let start = 0;
    let stop = 0;
    const deactivetedOnScroll = () => {
      start = scrollY;
      const id = setInterval(() => {
        stop = scrollY;
        clearInterval(id)
      }, 100)
      const leftShift = start - stop;
      const rightShift = stop - start;
      if (Math.abs(leftShift) > 3 || Math.abs(rightShift) > 3) {
        dispatch()
      }
    };
    if (state) {
      window.addEventListener('scroll', deactivetedOnScroll)
    }
    return () => {
      window.removeEventListener('scroll', deactivetedOnScroll)
    }
  }, [state]);

};