import {isDomEnv} from './is-dom-env';
import {isFunction} from './is-type';
import type {MutableRefObject} from 'react';

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

export function resolveTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
    if (!isDomEnv()) {
        return undefined;
    }

    if (!target) {
        return defaultElement;
    }

    // eslint-disable-next-line @typescript-eslint/init-declarations
    let targetElement: TargetValue<T>;

    if (isFunction(target)) {
        targetElement = target();
    } else if ('current' in target) {
        targetElement = target.current;
    } else {
        targetElement = target;
    }

    return targetElement;
}
