import {c} from '@mlkty/mt-shared-utils';
import {AnchorHTMLAttributes, forwardRef} from 'react';
import {useConfigContext} from '../config-provider';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    type?: 'default' | 'primary';
    underline?: 'none' | 'hover' | 'always';
    disabled?: boolean;
    href?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    const {
        children,
        className,
        icon,
        underline = 'hover',
        disabled,
        type = 'default',
        ...restProps
    } = props;

    const {getPrefixCls} = useConfigContext();

    const prefixCls = getPrefixCls('link');

    const cls = c(prefixCls, `${prefixCls}--${type}`, {
        [`${prefixCls}--underline-${underline}`]: underline !== 'none',
        [`${prefixCls}--disabled`]: disabled,
    }, className);

    return (
        <a {...restProps} className={cls} ref={ref}>
            {icon}
            <span className={`${prefixCls}-inner`}>
                {children}
            </span>
        </a>
    );
});

export {
    Link,
};

export type {
    LinkProps,
};
