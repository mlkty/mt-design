import { useLayoutEffect as _useLayoutEffect, useEffect, useRef } from 'react';
import isDomEnv from './is-dom-env';

const useInternalLayoutEffect = isDomEnv() ? _useLayoutEffect : useEffect;

const useLayoutEffect = (
  callback: (mount: boolean) => void | VoidFunction,
  deps?: React.DependencyList,
) => {
  const firstMountRef = useRef(true);

  useInternalLayoutEffect(() => {
    return callback(firstMountRef.current);
  }, deps);

  // We tell react that first mount has passed
  useInternalLayoutEffect(() => {
    firstMountRef.current = false;
    return () => {
      firstMountRef.current = true;
    };
  }, []);
};

export const useLayoutUpdateEffect: typeof useEffect = (callback, deps) => {
  useLayoutEffect((firstMount) => {
    if (!firstMount) {
      return callback();
    }
  }, deps);
};

export default useLayoutEffect;
