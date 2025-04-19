import { useEffect, useRef, useState } from "react";

type TWO_ITEM_ARRAY_TYPE<T, U> = [T, U];
type CUSTOM_DISPATCH_CALLBACK_TYPE<T> = (curState: T) => T;
type COMPARATOR_CALLBACK_TYPE<T> = (prevState: T, curState: T) => boolean;

function isCustomDispatchCb<T>(
  arg: any,
): arg is CUSTOM_DISPATCH_CALLBACK_TYPE<T> {
  return typeof arg === "function";
}

export const useStateMemo = function <T>(
  value: T,
  comparator: COMPARATOR_CALLBACK_TYPE<T>,
) {
  const prevStateRef = useRef<T>(value);
  const [state, dispatch] = useState(value);

  function customDispatch(arg: T | CUSTOM_DISPATCH_CALLBACK_TYPE<T>) {
    if (isCustomDispatchCb<T>(arg)) {
      const newVal = arg(state);

      if (comparator(prevStateRef.current, newVal)) {
        dispatch(newVal);
      }
    } else {
      const newVal = arg;

      if (comparator(prevStateRef.current, newVal)) {
        dispatch(newVal);
      }
    }
  }

  useEffect(() => {
    prevStateRef.current = state;
  }, [state]);

  return [state, customDispatch] as TWO_ITEM_ARRAY_TYPE<
    typeof state,
    typeof customDispatch
  >;
};
