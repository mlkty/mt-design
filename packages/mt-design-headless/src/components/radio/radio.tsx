import { mergeProps } from '@mlkty/mt-shared-utils';
import { CheckBox, type CheckBoxProps } from '../checkbox';
import { useRadioGroupContext } from './context';

export type RadioValue = string | number;

export type RadioProps = CheckBoxProps & {
  value?: RadioValue;
};

const defaultProps = {
  prefixCls: 'mt-radio',
  type: 'radio',
};

export function Radio(p: RadioProps) {
  const props = mergeProps(defaultProps, p);

  let { checked, value, onChange } = props;

  const context = useRadioGroupContext();

  if (context) {
    checked = context.value === value;
    onChange = (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
      context.onChange(value || '', e);
      props.onChange?.(checked, e);
    };
  }

  return <CheckBox {...props} checked={checked} onChange={onChange} />;
}
