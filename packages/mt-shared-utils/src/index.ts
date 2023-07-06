import {HTMLAttributes, type CSSProperties} from 'react';

export {default as c} from 'classnames';
export * from './is-type';
export * from './is-dom-env';
export * from './lock-scroll';
export * from './merge-props';
export * from './resolve-container';
export * from './resolve-scroll-container';
export * from './use-controlled';
export * from './use-event';
export * from './use-layout-effect';

export {default as CSSTransition} from 'react-transition-group/CSSTransition';
export type {CSSTransitionProps} from 'react-transition-group/CSSTransition';

export type DefineProps<E extends HTMLElement = HTMLElement, S extends string = never> = HTMLAttributes<E> & {
    style?: CSSProperties & Partial<Record<S, string>>;
};
