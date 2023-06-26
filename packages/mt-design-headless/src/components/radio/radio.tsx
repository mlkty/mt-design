/* eslint-disable prefer-const */
import { CheckBox, type CheckBoxProps } from '../checkbox';
import { useRadioGroupContext } from './context';

export type RadioValue = string | number;

export type RadioProps = CheckBoxProps & {
  value?: RadioValue;
};

export function Radio(props: RadioProps) {
  let {
    prefixCls = 'mth-radio',
    type = 'radio',
    checked,
    value,
    onChange,
    ...restProps
  } = props;

  const context = useRadioGroupContext();

  if (context) {
    checked = context.value === value;
    onChange = (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
      context.onChange(value || '', e);
      props.onChange?.(checked, e);
    };
  }

  return (
    <CheckBox
      {...restProps}
      type={type}
      prefixCls={prefixCls}
      role="radio"
      checked={checked}
      onChange={onChange}
    />
  );
}
