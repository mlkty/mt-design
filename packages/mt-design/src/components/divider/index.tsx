import './index.scss';

import { type NativeProps, withNativeProps, c } from '@mlkty/mt-shared-utils';
import { useConfigContext } from '../../contexts/config-provider';

type DividerProps = NativeProps & {
  align?: 'left' | 'center' | 'right';
  type?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
};

function Divider(props: DividerProps) {
  const { getPrefixCls } = useConfigContext();
  const {
    type = 'horizontal',
    children,
    align = 'center',
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('divider');
  const hasChildren = !!children;
  const isVertical = type === 'vertical';

  const cls = c(prefixCls, `${prefixCls}--${type}`, {
    [`${prefixCls}--${align}`]: !isVertical,
    [`${prefixCls}--with-text`]: hasChildren,
  });

  return withNativeProps(
    restProps,
    <div className={cls} role="separator">
      {hasChildren && type !== 'vertical' && (
        <span className={`${prefixCls}-text`}>{children}</span>
      )}
    </div>,
  );
}

export { Divider };

export type { DividerProps };
