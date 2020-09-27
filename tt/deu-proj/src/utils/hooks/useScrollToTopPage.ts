import {useEffect} from 'react';

export const useScrollToTopPage = (dep: any[]) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, dep)
};