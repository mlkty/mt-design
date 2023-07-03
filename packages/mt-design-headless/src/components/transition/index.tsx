import {type Ref, type ReactNode} from 'react';
import {CSSTransition, type CSSTransitionProps} from '@mlkty/mt-shared-utils';

type TransitionStatus =
| 'enter'
| 'entering'
| 'entered'
| 'exit'
| 'exiting'
| 'exited';

type NativeTransitionProps<T extends HTMLElement> = Pick<CSSTransitionProps<T>,
| 'mountOnEnter'
| 'unmountOnExit'
| 'classNames'
>;

type TransitionProps<T extends HTMLElement = HTMLElement> = NativeTransitionProps<T> & {
    appear?: boolean;
    visible?: boolean;
    duration?: number;
    onTransition?: (state: TransitionStatus) => void;
    children?: ReactNode;
    /**
     * the `nodeRef` must be set to the element.
     * React18 will be deparecating the `findDOMNode` API.
     */
    nodeRef: Ref<T>;
};

function Transition<T extends HTMLElement>(props: TransitionProps<T>) {
    const {
        visible,
        onTransition,
        duration = 300,
        children,
        ...restProps
    } = props;

    // eslint-disable-next-line
    let onEnter, onEntering, onEntered, onExit, onExiting, onExited;

    if (onTransition) {
        onEnter = () => onTransition('enter');
        onEntering = () => onTransition('entering');
        onEntered = () => onTransition('entered');
        onExit = () => onTransition('exit');
        onExiting = () => onTransition('exiting');
        onExited = () => onTransition('exited');
    }

    return (
        <CSSTransition
            {...restProps}
            appear
            in={visible}
            timeout={duration}
            onEnter={onEnter}
            onEntering={onEntering}
            onEntered={onEntered}
            onExit={onExit}
            onExiting={onExiting}
            onExited={onExited}
        >
            {children}
        </CSSTransition>
    );
}

export {
    Transition,
};

export type {
    TransitionProps,
    TransitionStatus,
};
