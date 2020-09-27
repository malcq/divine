import { useEffect } from 'react';
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