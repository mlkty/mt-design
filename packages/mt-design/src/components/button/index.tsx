import './index.scss';

import {forwardRef} from 'react';
import {c} from '@mlkty/mt-shared-utils';

import {useConfigContext} from '../../contexts/config-provider';

type NativeButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

interface ButtonProps extends NativeButtonProps {
    loading?: boolean;
    children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {getPrefixCls} = useConfigContext();
    const prefixCls = getPrefixCls('button');

    const {disabled, loading, className, children, ...restProps} = props;

    const cls = c(
        prefixCls,
        {
            [`${prefixCls}--disabled`]: disabled || loading,
        },
        className
    );

    return (
        <button role="button" className={cls} {...restProps} ref={ref}>
            {children}
        </button>
    );
});

export {Button};

export type {ButtonProps};
