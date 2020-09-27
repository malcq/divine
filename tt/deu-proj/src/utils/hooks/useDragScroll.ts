import { useEffect, useState, useCallback, Dispatch, SetStateAction } from 'react';

export const useDragScroll = (
  ref: React.RefObject<HTMLElement>,
  axis: 'x' | 'y',
  ) => {
  const [isDragOpen, setIsDragOpen] = useState(false);

  const onMouseMoveHandler = (e: any) => {
    if (!isDragOpen) {
      e.preventDefault()
      return
    };
    if (ref.current) {
      if (axis === 'x') {
        const leftScroll = ref.current?.scrollLeft + -e.movementX;
        ref.current.scrollTo({
          left: leftScroll
        });
      }

      if (axis === 'y') {
        const topScroll = ref.current?.scrollTop + -e.movementY;
        ref.current.scrollTo({
          top: topScroll
        })
      }
    }
  };

  const onMouseDownHandler = useCallback((e: any) => {
    setIsDragOpen(true);
  }, []);

  const onMouseUpHandler = useCallback(() => {
    setIsDragOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUpHandler)
    return () => {
      window.removeEventListener('mouseup', onMouseUpHandler)
    }
  }, [])

  return {
    onMouseMoveHandler,
    onMouseDownHandler,
    onMouseUpHandler,
  }
}