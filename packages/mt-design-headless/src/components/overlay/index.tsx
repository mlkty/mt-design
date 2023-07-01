import {c, Transition, type TransitionProps, type TransitionStatus} from '@mlkty/mt-shared-utils';
import {forwardRef, HTMLAttributes, useRef, useImperativeHandle} from 'react';

interface OverlayRef {
    nativeElement: HTMLDivElement | null;
}

type OverlayProps =
& Omit<HTMLAttributes<HTMLDivElement>, keyof TransitionProps>
& Omit<TransitionProps<HTMLDivElement>, 'nodeRef'>
& {
    prefixCls?: string;

    zIndex?: number;

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
        classNames = 'mth-fade',
        duration = 0.3,
        mountOnEnter,
        unmountOnExit,
        onTransition,

        lockScroll,
        getContainer,
        className,
        zIndex,
        prefixCls = 'mth-overlay',
        ...restProps
    } = props;

    const domRef = useRef<HTMLDivElement>(null);

    const cls = c(prefixCls, className);

    useImperativeHandle(ref, () => ({
        nativeElement: domRef.current,
    }));

    return (
        <Transition
            visible={visible}
            mountOnEnter
            unmountOnExit
            classNames={classNames}
            nodeRef={domRef}
            duration={duration}
            onTransition={onTransition}
        >
            <div {...restProps} className={cls} ref={domRef}></div>
        </Transition>
    );
});

export {
    Overlay,
};

export type {
    OverlayProps,
    OverlayRef,
    TransitionStatus,
};
