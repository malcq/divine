import { useEffect, useState, useCallback, useMemo } from 'react';
import { SERVER_ERRORS } from './constants';
import { ErrorObj } from '@models/common';

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) => {
  const handleClick = (ev: MouseEvent) => {
    if (!ref.current) { return; }
    const target = ev.target;

    if (!ref.current.contains(target as Node | null)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

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
/**
 * 🧙‍♂️ Magic for sticky node rerendering.
 * When user clicks on mobile widget preview, it will be expanded with different height
 * To recalculate positions, we should trigger changing scroll position!
 */
export const useMobileWidgetRerender = (
  mobileSearchActivated: boolean,
) => {
  useEffect(() => {
    window.scrollTo(0, window.scrollY + 1);
  }, [mobileSearchActivated]);
}

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
      } , 100)
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

export const useScrollToTopPage = (dep: any[]) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, dep)
};
/**
 * 
 * @param ref Refference for animation element
 * @param onAnimationEnd Callback for actions after animation complite 
 * @param animationIn State which will trigger the animation
 * 
 * Will animate element max-height;
 */
export const useCollapseAnimation = (
  options: {
    ref: React.RefObject<HTMLElement>,
    animationIn: boolean,
    minHeight?: number,
  },
  //  It will be later >>>>
  // additionalStylesForAnimate?: {
  //   property: keyof CSSStyleDeclaration,
  //   value: string,
  // },
  onAnimationEnd?: () => void,
  dep?: any[],
) => {
  const dependence = dep ?? [];
  const { animationIn, ref, minHeight } = options;
  useEffect(() => {
    if (ref.current) {
      const elem = ref.current;

      const animationHandler = (e: TransitionEvent) => {
        if (onAnimationEnd && e.propertyName === 'max-height') {
          onAnimationEnd();
          elem.removeEventListener('transitionend', animationHandler)
        }
      };
      if (animationIn) {
        elem.style.maxHeight = elem.scrollHeight + 'px';
        elem.style.opacity = '1';
        elem.style.transform = 'translateY(0)';
      } else {
        elem.style.maxHeight = `${minHeight ? minHeight : 0}px`;
        elem.style.opacity = '0.1';
        if (onAnimationEnd) {
          elem.addEventListener('transitionend', animationHandler)
        }

      }
    }
  }, [animationIn, ...dependence])

};

export const useBoxHeight = (ref: React.RefObject<HTMLElement>) => {
  const [viewHeight, setViewHeight] = useState<number>(0);
  useEffect(() => {
    if (!ref.current) return;
    const height  = ref.current.offsetHeight
    setViewHeight(height);
  }, [ref]);

  return {
    viewHeight
  }
};

export const useDragScroll = (ref: React.RefObject<HTMLElement>, axis: 'x' | 'y') => {
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
        })
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
    onMouseUpHandler
  }
}

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


export const useErrorHandler = (err: ErrorObj) => {
  const result: {
    showErrorPage: boolean,
    showEmptyStatePage: boolean,
  } = useMemo(() => {
    let showErrorPage = false;
    let showEmptyStatePage = false;
    if (err.status) {
      if (err.message !== SERVER_ERRORS.STOP_NOT_FOUND && err.message !== SERVER_ERRORS.INVALID_TIME) {
        showErrorPage = true;
      }
      if (err.message === SERVER_ERRORS.STOP_NOT_FOUND || err.message === SERVER_ERRORS.INVALID_TIME) {
        showEmptyStatePage = true;
      }
    } else {
      showEmptyStatePage = false;
      showErrorPage = false;
    }

    return {
      showEmptyStatePage,
      showErrorPage,
    }
  }, [err]);

  return result;
}
