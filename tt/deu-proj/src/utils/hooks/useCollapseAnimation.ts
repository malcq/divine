import { useEffect } from 'react';

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
    exitOpacity?: number | string,
    onAnimationInEnd?: () => void,
    onAnimationEnd?: () => void,
  },
  //  It will be later >>>>
  // additionalStylesForAnimate?: {
  //   property: keyof CSSStyleDeclaration,
  //   value: string,
  // },
  dep?: any[],
) => {
  const dependence = dep ?? [];
  const {
    animationIn,
    ref,
    minHeight,
    exitOpacity,
    onAnimationEnd
  } = options;
  useEffect(() => {
    if (ref.current) {
      const elem = ref.current;

      const animationHandler = (e: TransitionEvent) => {
        if (onAnimationEnd && e.propertyName === 'max-height') {
          onAnimationEnd();
          elem.removeEventListener('transitionend', animationHandler)
        }
      };

      const startAnimationHandler = (e: TransitionEvent) => {
        elem.style.overflow = 'unset';
        if (options.onAnimationInEnd) {
          options.onAnimationInEnd()
        }
        elem.removeEventListener('transitionend', startAnimationHandler)
      };
      if (animationIn) {
        const tmpCb = () => {
          elem.style.overflow = 'hidden';
          elem.style.maxHeight = elem.scrollHeight + 'px';
          elem.style.opacity = '1';
          elem.style.transform = 'translateY(0)';
        }
        window.requestAnimationFrame(tmpCb)
        elem.addEventListener('transitionend', startAnimationHandler)
      } else {
        elem.style.overflow = 'hidden';
        elem.style.maxHeight = `${minHeight ? minHeight : 0}px`;
        elem.style.opacity = `${exitOpacity ? exitOpacity : '0.1'}`;
        if (onAnimationEnd) {
          elem.addEventListener('transitionend', animationHandler)
        }

      }
    }
  }, [animationIn, ...dependence])

};