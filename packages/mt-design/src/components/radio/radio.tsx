import {
  Radio as MTRadio,
  RadioProps as MTRadioProps,
} from '@mlkty/mt-design-headless';
import { useConfigContext } from '@mlkty/mt-design/contexts/config-provider';

type RadioProps = MTRadioProps;

function Radio(props: RadioProps) {
  const { children, ...restProps } = props;

  const { getPrefixCls } = useConfigContext();

  const prefixCls = getPrefixCls('radio');

  return (
    <MTRadio {...restProps} prefixCls={prefixCls}>
      <span className="mt-radio-input"></span>
      <span className="mt-radio-inner">{children}</span>
    </MTRadio>
  );
}

export type { RadioProps };

export { Radio };
