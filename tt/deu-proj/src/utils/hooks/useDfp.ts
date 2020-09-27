import { useEffect } from 'react';

export type DfpOptions = {
  path: string,
  sizes: [number, number][],
  id: string,
}

export const useDfp = (options: DfpOptions) => {
  const {
    id,
    path,
    sizes
  } = options;
  useEffect(() => {
    const adsHandler = () => {
      const googleTag = (window as any).googletag || {cmd: []};
      googleTag.cmd.push(() => {
        googleTag.defineSlot(path, sizes, id).addService(googleTag.pubads());
        googleTag.pubads().enableSingleRequest();
        googleTag.enableServices();
      });
      googleTag.cmd.push(function() {
        googleTag.display(id);
      });
    };
    window.addEventListener('load', adsHandler);
    return () => {
      window.removeEventListener('load', adsHandler)
    }
  },[id, path, sizes])
};