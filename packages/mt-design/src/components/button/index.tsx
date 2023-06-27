import './index.scss';

import {forwardRef} from 'react';
import {type MergeProps, c, withMergeProps} from '@mlkty/mt-shared-utils';

import {useConfigContext} from '../../contexts/config-provider';

type NativeButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

type ButtonProps = MergeProps & NativeButtonProps & {
    loading?: boolean;
    children?: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {getPrefixCls} = useConfigContext();
    const prefixCls = getPrefixCls('button');

    const {disabled, loading, children, ...restProps} = props;

    const cls = c(
        prefixCls,
        {
            [`${prefixCls}--disabled`]: disabled || loading,
        }
    );

    return withMergeProps(
        restProps,
        <button role="button" className={cls} ref={ref}>
            {children}
        </button>
    );
});

export {Button};

export type {ButtonProps};
