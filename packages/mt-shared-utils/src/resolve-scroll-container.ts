import {isFunction} from './is-type';

export type ScrollTargetType = boolean | HTMLElement | (() => HTMLElement);

export function resolveScrollContainer(target?: ScrollTargetType) {
    if (target === true) {
        return document.body;
    }

    if (target instanceof Element) {
        return target;
    }

    if (isFunction(target)) {
        return target();
    }

    return null;
}
