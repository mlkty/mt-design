import {Children, Fragment, type ReactElement} from 'react';
import {c, withMergeProps, type MergeProps} from '@mlkty/mt-shared-utils';
import {useConfigContext} from '../../contexts/config-provider';

type Size = 'small' | 'middle' | 'large' | number;

type SpaceProps = MergeProps<'--size'> & {
  align?: 'start' | 'end' | 'center' | 'baseline';

  block?: boolean;

  direction?: 'horizontal' | 'vertical';

  split?: React.ReactNode;

  wrap?: boolean;

  size?: Size;

  children?: React.ReactNode;
};

const sizeMap: Record<Size, number> = {
    small: 8,
    middle: 16,
    large: 24,
};

const useSpaceSize = (size: Size) => {
    const num = (typeof size === 'string' ? sizeMap[size] : size) || 0;
    return `${num}px`;
};

function Space(props: SpaceProps) {
    const {
        size: rawSize,
        children: rawChildren,
        block,
        direction = 'horizontal',
        wrap,
        ...restProps
    } = props;
    const size = useSpaceSize(rawSize || 'small');
    const {getPrefixCls} = useConfigContext();

    const prefixCls = getPrefixCls('space');

    const children = Children.toArray(rawChildren).map((child, index, arr) => {
        const key = (child && (child as ReactElement).key) || index;
        return (
            <Fragment key={key}>
                <div className={`${prefixCls}-item`}>{child}</div>
                {index !== arr.length - 1 && props.split && (
                    <span className={`${prefixCls}-split`} role="space-split">
                        {props.split}
                    </span>
                )}
            </Fragment>
        );
    });

    // ========== render ==========
    const cls = c(prefixCls, `${prefixCls}--${direction}`, {
        [`${prefixCls}--block`]: block,
        [`${prefixCls}--wrap`]: wrap,
    });

    const gapStyle: SpaceProps['style'] = {
        '--size': size,
    };

    return withMergeProps(
        restProps,
        <div className={cls} style={gapStyle} role="space">
            {children}
        </div>
    );
}

if (process.env.NODE_ENV !== 'production') {
    Space.displayName = 'Space';
}

export type {SpaceProps, Size};

export {Space};
