import React, { useEffect, useRef } from 'react';

type Options = {
  scrollElemRef: React.RefObject<HTMLElement>,
  topOffset: number,
  dependency: any[]
}
export const useSeparatedScroll = (opt: Options) => {

  const { scrollElemRef, topOffset } = opt;


  // useEffect(() => {
  //   const elem = scrollElemRef.current;
  //   const viewHeight = window.innerHeight;
  //   const fullHeight = document.body.scrollHeight;

  //   if (elem) {
  //     const elemHeight = elem.scrollHeight;
  //     if (elemHeight > fullHeight) {
  //       const shift = elemHeight - fullHeight;
  //       const topOffset = parseInt(getComputedStyle(elem).top);
  //       elem.style.top = (fullHeight - viewHeight) === 0 ? `${topOffset}px` : `${topOffset - shift}px`
  //       if (fullHeight - viewHeight > 0) {
  //         elem.style.maxHeight = `${fullHeight}px`
  //       }

  //     } else {
  //       const top = elemHeight - viewHeight;
  //       if (top > 0) {
  //         elem.style.top = `-${top}px`;
  //       } else {
  //         elem.style.top = `${topOffset}px`
  //       }
  //       elem.style.maxHeight = `${fullHeight - topOffset}px`
  //     }
  //   }

  // }, [topOffset, ...opt.dependency])

  useEffect(() => {
    let prevY = 0;
    if (!scrollElemRef.current) return;
    const scrollElem = scrollElemRef.current
    const scrollElemTop = scrollElem.getBoundingClientRect().top
    let maxElemScroll = scrollElem.scrollHeight - scrollElem.offsetHeight;
    const scrollStartPosition = scrollElemTop - topOffset;
    let endWindowPosition: number | null = null;

    const scrollHandler = () => {
      if (scrollElem) {
        const shift = window.scrollY - prevY;
        prevY = window.scrollY;

        if (maxElemScroll !== scrollElem.scrollHeight - scrollElem.offsetHeight) {
          maxElemScroll = scrollElem.scrollHeight - scrollElem.offsetHeight;
          endWindowPosition = maxElemScroll + scrollStartPosition;
        }

        if ((maxElemScroll === scrollElem.scrollTop) && !endWindowPosition) {
          endWindowPosition = maxElemScroll + scrollStartPosition;
        }

        if (shift > 0 && window.scrollY >= scrollStartPosition) {
          if (window.scrollY - shift < scrollStartPosition) {
            const tmpStartShift = window.scrollY - scrollStartPosition;
            scrollElem.scrollTo(0, (scrollElem.scrollTop + tmpStartShift))
          } else {
            // scrollElem.scrollTo(0, (scrollElem.scrollTop + shift))
            scrollElem.scrollTo({
              top: scrollElem.scrollTop + shift,
              behavior: 'auto'
            })
          }
        }
        if (endWindowPosition && window.scrollY > endWindowPosition) {
          scrollElem.style.overflow = 'auto';
        }
        if (endWindowPosition && window.scrollY < endWindowPosition) {
          scrollElem.style.overflow = 'hidden';
        }
        if (endWindowPosition && endWindowPosition > document.body.scrollHeight - window.innerHeight) {
          scrollElem.style.overflow = 'auto';
        }

        if (!endWindowPosition && shift < 0) {
          scrollElem.scrollTo(0, (scrollElem.scrollTop + shift))
        }

        if (endWindowPosition && (window.scrollY <= endWindowPosition) && shift < 0) {
          if (scrollElem.scrollTop === maxElemScroll) {
            const tmpShift = window.scrollY - endWindowPosition
            scrollElem.scrollTo(0, (maxElemScroll + tmpShift))
          } else {
            scrollElem.scrollTo(0, (scrollElem.scrollTop + shift))
          }
        }
      }
    }

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [topOffset, ...opt.dependency])

};
