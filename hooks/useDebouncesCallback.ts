import { MutableRefObject, useCallback, useRef } from 'react';

export const useDebouncedCallback = (
  func: (...args: any[]) => void,
  wait: number
) => {
  const timeout: MutableRefObject<undefined | ReturnType<typeof setTimeout>> =
    useRef();

  return useCallback(
    (...args: any) => {
      const later = () => {
        clearTimeout(timeout.current);
        func(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    },
    [func, wait]
  );
};
