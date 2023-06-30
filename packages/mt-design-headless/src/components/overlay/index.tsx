import {type ReactNode, forwardRef, HTMLAttributes} from 'react';

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
    visible?: boolean;
    zIndex?: number;

    /**
     * animation duration, default 0.3s。
     * By setting 0 to ban animation.
     * @default 0.3
     */
    duration?: number;

    children?: ReactNode;

    /**
     * whether to render the component when it is not visible.
     * @default false
     */
    forceRender?: boolean;

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
}

const Overlay = forwardRef<HTMLDivElement, OverlayProps>((props, ref) => {
    const {
        visible,
        zIndex,
        duration,
        forceRender,
        lockScroll,
        getContainer,
        ...restProps
    } = props;

    return (
        <div {...restProps} ref={ref}></div>
    );
});

export {
    Overlay,
};
