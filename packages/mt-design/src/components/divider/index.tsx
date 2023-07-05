import './index.scss';

import {c} from '@mlkty/mt-shared-utils';
import {HTMLAttributes} from 'react';
import {useConfigContext} from '../config-provider';

type DividerProps = HTMLAttributes<HTMLDivElement> & {
  align?: 'left' | 'center' | 'right';
  direction?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
};

function Divider(props: DividerProps) {
    const {getPrefixCls} = useConfigContext();
    const {
        direction = 'horizontal',
        children,
        align = 'center',
        className,
        ...restProps
    } = props;

    const prefixCls = getPrefixCls('divider');
    const hasChildren = !!children;

    const isNotVerticalMode = hasChildren && direction !== 'vertical';

    const cls = c(prefixCls, `${prefixCls}--${direction}`, {
        [`${prefixCls}--${align}`]: isNotVerticalMode,
        [`${prefixCls}--with-text`]: isNotVerticalMode,
    }, className);

    return (
        <div role="separator" {...restProps} className={cls}>
            {isNotVerticalMode && (
                <span className={`${prefixCls}-text`}>{children}</span>
            )}
        </div>
    );
}

export {Divider};

export type {DividerProps};
