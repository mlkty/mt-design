import c from 'classnames';
import {cloneElement} from 'react';
import assignWith from 'lodash.assignwith';

import type {AriaAttributes, CSSProperties, ReactElement} from 'react';

export type MergeProps<S extends string = never> = {
  className?: string;
  style?: CSSProperties & Partial<Record<S, string>>;
} & AriaAttributes;

function customizer(objValue: any, srcValue: any) {
    return srcValue === undefined ? objValue : srcValue;
}

export function mergeProps<A, B>(a: A, b: B): B & A;
export function mergeProps<A, B, C>(a: A, b: B, c: C): C & B & A;
export function mergeProps(...items: any[]) {
    let target = {...items[0]};

    for (let i = 1; i < items.length; i++) {
        target = assignWith(target, items[i], customizer);
    }
    return target;
}

export function withMergeProps<P extends MergeProps>(
    props: P,
    element: ReactElement
) {
    const p = {
        ...element.props,
        ...props,
    };

    if (props.className) {
        p.className = c(element.props.className, props.className);
    }

    if (props.style) {
        p.style = {
            ...p.style,
            ...props.style,
        };
    }
    return cloneElement(element, p);
}
