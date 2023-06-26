import { useCallback, useRef } from 'react';

type noop = (this: any, ...args: any[]) => any;

export function useEvent<T extends noop>(callback?: T): T {
  const fnRef = useRef<any>();
  fnRef.current = callback;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoFn = useCallback<T>(
    ((...args: any) => fnRef.current?.(...args)) as any,
    [],
  );

  return memoFn;
}
