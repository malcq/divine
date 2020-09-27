import { useEffect } from 'react';

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