import {c, resolveContainer} from '@mlkty/mt-shared-utils';
import {forwardRef, HTMLAttributes, useRef, useImperativeHandle, useEffect} from 'react';

import {createPortal} from 'react-dom';
import {Transition, type TransitionProps, type TransitionStatus} from '../transition';

interface OverlayRef {
    nativeElement: HTMLDivElement | null;
}

type OverlayProps =
& Omit<HTMLAttributes<HTMLDivElement>, keyof TransitionProps>
& Omit<TransitionProps<HTMLDivElement>, 'appear' | 'nodeRef' | 'mountOnEnter' | 'unmountOnExit'>
& {
    prefixCls?: string;

    forceRender?: boolean;
    destroyOnHide?: boolean;

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
        duration = 300,
        onTransition,

        forceRender = false,
        destroyOnHide = true,

        // functional
        getContainer,

        // style
        className,
        prefixCls = 'mth-overlay',
        ...restProps
    } = props;

    const domRef = useRef<HTMLDivElement>(null);
    const firstRenderRef = useRef(true);

    useImperativeHandle(ref, () => ({
        nativeElement: domRef.current,
    }));

    useEffect(() => {
        if (forceRender && firstRenderRef.current && visible) {
            firstRenderRef.current = false;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    const container = resolveContainer(getContainer);
    const cls = c(prefixCls, className);

    const contentNode = <div {...restProps} className={cls} ref={domRef}></div>;

    let node = null;

    if (forceRender && firstRenderRef.current && !visible) {
        node = contentNode;
    } else {
        // when both the firstRender and the visible are true, it will render.
        const appear = forceRender || (visible && firstRenderRef.current);
        node = (
            <Transition
                visible={visible}
                appear={appear}
                unmountOnExit={destroyOnHide}
                classNames={classNames}
                nodeRef={domRef}
                duration={duration}
                onTransition={onTransition}
            >
                {contentNode}
            </Transition>
        );
    }

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
