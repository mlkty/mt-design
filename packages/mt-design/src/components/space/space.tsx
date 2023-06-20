import { Children, Fragment, type ReactElement } from 'react';
import { c, withNativeProps, type NativeProps } from '@mlkty/mt-shared-utils';
import { useConfigContext } from '../../contexts/config-provider';
import { SpaceItem } from './space-item';

type Size = 'small' | 'middle' | 'large' | number;

type SpaceProps = NativeProps<'--size'> & {
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
  return typeof size === 'string' ? sizeMap[size] : size || 0;
};

function Space(props: SpaceProps) {
  const size = useSpaceSize(props.size || 'small');
  const { getPrefixCls } = useConfigContext();

  const prefixCls = getPrefixCls('space');

  const children = Children.toArray(props.children).map((child, index, arr) => {
    const key = (child && (child as ReactElement).key) || index;

    return (
      <Fragment key={key}>
        <SpaceItem key={key}>{child}</SpaceItem>
        {index !== arr.length - 1 && props.split && (
          <div className={`${prefixCls}-split`} role="split">
            {props.split}
          </div>
        )}
      </Fragment>
    );
  });

  // ========== render ==========
  const cls = c(prefixCls, {
    [`${prefixCls}--block`]: props.block,
    [`${prefixCls}--vertical`]: props.direction === 'vertical',
    [`${prefixCls}--wrap`]: props.wrap,
  });

  const gapStyle: SpaceProps['style'] = {};

  if (size) {
    gapStyle['--size'] = `${size}px`;
  }

  return withNativeProps(
    props,
    <div className={cls} style={gapStyle}>
      {children}
    </div>,
  );
}

if (process.env.NODE_ENV !== 'production') {
  Space.displayName = 'Space';
}

export type { SpaceProps, Size };

export { Space };
