import { RefObject, useEffect, useState } from "react";

export function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export function useClickOutside (ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return;
      }
      handler(e);
    }
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    }
  }, [ref, handler]);
}
