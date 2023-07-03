import {forwardRef} from 'react';
import {Overlay, OverlayProps, OverlayRef} from '@mlkty/mt-design-headless';
import {useConfigContext} from '@mlkty/mt-design/contexts/config-provider';
import {withMergeProps, type MergeProps, mergeProps} from '@mlkty/mt-shared-utils';

type InnerOverlayProps =
& MergeProps<'--background-color' | '--duration' | '--z-index'>
& Omit<OverlayProps, 'prefixCls'>
& {
    zIndex?: number;
};

const defaultProps = {
    zIndex: 10,
    duration: 300,
};

const InnerOverlay = forwardRef<OverlayRef, InnerOverlayProps>((p, ref) => {
    const {zIndex, classNames, duration, ...restProps} = mergeProps(defaultProps, p);
    const {getPrefixCls} = useConfigContext();

    const prefixCls = getPrefixCls('overlay');

    const style: InnerOverlayProps['style'] = {
        '--duration': `${duration / 1000}s`,
        '--z-index': `${zIndex}`,
    };

    return withMergeProps(
        restProps,
        <Overlay
            prefixCls={prefixCls}
            ref={ref}
            style={style}
            duration={duration}
            classNames={classNames || `${prefixCls}-fade`}
        />
    );
});

export type {
    InnerOverlayProps,
};

export default InnerOverlay;
