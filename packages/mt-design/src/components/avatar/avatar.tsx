import {type ReactNode, forwardRef} from 'react';
import {c, isString} from '@mlkty/mt-shared-utils';
import {Image, type ImageProps, type ImageRef} from '../image';
import {useConfigContext} from '../config-provider';
import {useSize} from './hooks/use-size';

type AvatarRef = ImageRef;

type Size = 'small' | 'middle' | 'large' | number;

interface AvatarProps extends Omit<ImageProps, 'rootClassName' | 'rootStyle'> {
    shape?: 'square' | 'circle';
    size?: Size;
    icon?: ReactNode;
}

const Avatar = forwardRef<AvatarRef, AvatarProps>((props, ref) => {
    const {
        shape = 'circle',
        fit = 'contain',
        size: rawSize = 'middle',
        className,
        icon,
        src,
        children,
        style,
        ...restProps
    } = props;

    const size = useSize(rawSize);

    const {getPrefixCls} = useConfigContext();

    const prefixCls = getPrefixCls('avatar');

    const cls = c(prefixCls, `${prefixCls}--${shape}`, className);

    const rootStyle = {
        ...style,
        // @TODO 需要考虑带单位的情况
        fontSize: icon ? parseInt(size as string, 10) / 2 : 18,
    };

    let childrenToRender = null;

    if (isString(src)) {
        childrenToRender = null;
    } else if (icon) {
        childrenToRender = icon;
    } else if (children) {
        childrenToRender = children;
    }

    return (
        <Image
            role="avatar"
            {...restProps}
            src={src}
            ref={ref}
            width={size}
            height={size}
            rootClassName={cls}
            rootStyle={rootStyle}
            fit={fit}
        >
            {childrenToRender}
        </Image>
    );
});

export {
    Avatar,
};

export type {
    AvatarProps,
    AvatarRef,
};
