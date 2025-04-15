import { useEffect, useRef } from "react";

export const useInit = (cb: Function, ...args: any) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      cb(...args);
    }
  }, [mounted, cb, args]);
};
