import { useEffect, useContext, useState } from 'react';
import { SettingsContext } from '@contexts/Settings';

export const useDfpInitialize = () => {
  const { reqType } = useContext(SettingsContext);
  const [isShowAd, setIsShowAd] = useState(() => reqType === 'user');

  useEffect(() => {
    if (reqType === 'user') return;
    const adsInitializeHandler = () => {
        setIsShowAd(true);
    };

    window.addEventListener('scroll', adsInitializeHandler);
    return () => {
      window.removeEventListener('scroll', adsInitializeHandler);
    }
  }, []);

  return {
    isShowAd
  }
}