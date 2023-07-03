import {c, resolveContainer} from '@mlkty/mt-shared-utils';
import {forwardRef, HTMLAttributes, useRef, useImperativeHandle} from 'react';

import {createPortal} from 'react-dom';
import {Transition, type TransitionProps, type TransitionStatus} from '../transition';

interface OverlayRef {
    nativeElement: HTMLDivElement | null;
}

type OverlayProps =
& Omit<HTMLAttributes<HTMLDivElement>, keyof TransitionProps>
& Omit<TransitionProps<HTMLDivElement>, 'nodeRef'>
& {
    prefixCls?: string;

    /**
     * Whether to lock the scroll of node, the default node is body.
     * @default true
     */
    lockScroll?: boolean | HTMLElement | (() => HTMLElement);

    /**
     * if `getContainer` is set to null, the overlay will be appended to current node.
     * @default null
     */
    getContainer?: HTMLElement | (() => HTMLElement) | null;
};

const Overlay = forwardRef<OverlayRef, OverlayProps>((props, ref) => {
    const {
        // transition props
        visible = false,
        appear = false,
        classNames = 'mth-fade',
        duration = 300,
        // DOM nodes are usually expected to be removed.
        mountOnEnter = true,
        unmountOnExit = true,
        onTransition,

        // functional
        getContainer,
        lockScroll,

        // style
        className,
        prefixCls = 'mth-overlay',
        ...restProps
    } = props;

    const domRef = useRef<HTMLDivElement>(null);

    const cls = c(prefixCls, className);

    const container = resolveContainer(getContainer);

    useImperativeHandle(ref, () => ({
        nativeElement: domRef.current,
    }));

    let node = (
        <Transition
            visible={visible}
            appear={appear}
            mountOnEnter={mountOnEnter}
            unmountOnExit={unmountOnExit}
            classNames={classNames}
            nodeRef={domRef}
            duration={duration}
            onTransition={onTransition}
        >
            <div {...restProps} className={cls} ref={domRef}></div>
        </Transition>
    );

    if (container) {
        node = createPortal(node, container);
    }

    return node;
});

export {
    Overlay,
};

export type {
    OverlayProps,
    OverlayRef,
    TransitionStatus,
};
