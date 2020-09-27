import React, { useEffect, useState } from 'react';

type Options = {
  observableElement: React.RefObject<HTMLElement>,
  rootMargin?: string,
  threshold?: number | number[],
  rootElement: null | HTMLElement
}
export const useObserver = (options: Options) => {
  const {
    observableElement,
    rootMargin,
    threshold,
    rootElement
  } = options;
  
  const [isInViewport, setIsInViewport] = useState(true);

  useEffect(() => {
    const observHandler = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInViewport(true)
        } else {
          setIsInViewport(false)
        }
      })
    };

    const observer = new IntersectionObserver(observHandler, {
      root: rootElement,
      rootMargin: rootMargin,
      threshold: threshold
    });
    if (observableElement.current) {
      observer.observe(observableElement.current)
    }
  }, []);

  return {
    isInViewport
  }
}