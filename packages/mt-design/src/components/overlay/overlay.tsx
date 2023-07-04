import {forwardRef, useEffect} from 'react';
import {Overlay, OverlayProps, OverlayRef} from '@mlkty/mt-design-headless';
import {withMergeProps, type MergeProps, mergeProps, c, LockScroll} from '@mlkty/mt-shared-utils';
import {useConfigContext} from '../config-provider';

type InnerOverlayProps =
& MergeProps<'--background-color' | '--duration' | '--z-index'>
& Omit<OverlayProps, 'prefixCls'>
& {
    /**
     * Whether to lock the scroll of node, the default node is body.
     * @default true
     */
    lockScroll?: boolean | HTMLElement | (() => HTMLElement);

    /**
     * 是否展示首屏动画
     * @default {true}
     */
    firstAnimation?: boolean;
    zIndex?: number;
};

const defaultProps = {
    zIndex: 10,
    duration: 300,
};


const lock = new LockScroll('overlay');

const InnerOverlay = forwardRef<OverlayRef, InnerOverlayProps>((p, ref) => {
    const {
        zIndex,
        classNames,
        duration,
        forceRender,
        firstAnimation = true,
        visible,
        lockScroll,
        ...restProps
    } = mergeProps(defaultProps, p);
    const {getPrefixCls} = useConfigContext();

    const prefixCls = getPrefixCls('overlay');

    const style: InnerOverlayProps['style'] = {
        '--duration': `${duration / 1000}s`,
        '--z-index': `${zIndex}`,
    };

    const cls = c({
        [`${prefixCls}--force`]: firstAnimation,
    });

    useEffect(() => {
        if (visible) {
            lock.bind(lockScroll);
        }

        return () => {
            visible && lock.unbind(lockScroll);
        };
    }, [visible, lockScroll]);

    return withMergeProps(
        restProps,
        <Overlay
            prefixCls={prefixCls}
            ref={ref}
            visible={visible}
            style={style}
            duration={duration}
            forceRender={forceRender}
            className={cls}
            classNames={classNames || `${prefixCls}-fade`}
        />
    );
});

export type {
    InnerOverlayProps,
};

export default InnerOverlay;
