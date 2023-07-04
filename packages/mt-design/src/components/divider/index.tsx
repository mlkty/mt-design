import './index.scss';

import {type MergeProps, withMergeProps, c} from '@mlkty/mt-shared-utils';
import {useConfigContext} from '../config-provider';

type DividerProps = MergeProps & {
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
        ...restProps
    } = props;

    const prefixCls = getPrefixCls('divider');
    const hasChildren = !!children;

    const isNotVerticalMode = hasChildren && direction !== 'vertical';

    const cls = c(prefixCls, `${prefixCls}--${direction}`, {
        [`${prefixCls}--${align}`]: isNotVerticalMode,
        [`${prefixCls}--with-text`]: isNotVerticalMode,
    });

    return withMergeProps(
        restProps,
        <div className={cls} role="separator">
            {isNotVerticalMode && (
                <span className={`${prefixCls}-text`}>{children}</span>
            )}
        </div>
    );
}

export {Divider};

export type {DividerProps};
