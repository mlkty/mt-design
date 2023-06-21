/**
 * 专门用来处理受控和非受控双状态的 hook
 */

import { useState } from 'react';
import { isUndefined, isFunction } from './is-type';
import { useEvent } from './use-event';
import { useLayoutUpdateEffect } from './use-layout-effect';

export interface ControlledOptions<T> {
  /**
   * be setted default outer state.
   */
  defaultValue?: T | (() => T);

  /**
   * be setted outer state.
   */
  value?: T;

  onChange?: (value: T, prevValue: T) => void;
}

/**
 * @function manager-state
 * @param {T | (() => T)} defaultStateValue inner default state.
 * @param {ControlledOptions} options
 */
export function useControlled<T>(
  defaultStateValue: T | (() => T),
  options?: ControlledOptions<T>,
) {
  const { defaultValue, value, onChange } = options || {};

  // ============ init ============
  const [innerValue, setInnerValue] = useState<T>(() => {
    // controlled state.
    if (!isUndefined(value)) {
      return value;
    }

    if (!isUndefined(defaultValue)) {
      return isFunction(defaultValue) ? defaultValue() : defaultValue;
    }

    return isFunction(defaultStateValue)
      ? defaultStateValue()
      : defaultStateValue;
  });

  // if it's controlled, it'll use outer value.
  const mergedValue = isUndefined(value) ? innerValue : value;

  // ============ Change ===========
  const onChangeFn = useEvent(onChange);
  const [prevValue, setPrevValue] = useState([mergedValue]);

  useLayoutUpdateEffect(() => {
    if (!isUndefined(value)) {
      setInnerValue(value);
    }
  }, [value]);

  useLayoutUpdateEffect(() => {
    const prev = prevValue[0];
    if (innerValue !== prev) {
      onChangeFn(innerValue, prev);
    }
  }, [prevValue]);

  // ============ Toggle ============
  const setMergedValue = useEvent((newValue: T) => {
    setInnerValue(newValue);
    setPrevValue([mergedValue]);
  });

  return [mergedValue, setMergedValue] as const;
}
