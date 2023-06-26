import { type ChangeEvent, forwardRef } from 'react';

import { c, useControlled } from '@mlkty/mt-shared-utils';

interface CheckBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  prefixCls?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>((props, ref) => {
  const {
    prefixCls = 'mth-checkbox',
    type = 'checkbox',
    disabled,
    className,
    style,
    checked,
    defaultChecked,
    children,
    onChange,
    role = 'checkbox',
    ...inputProps
  } = props;

  const [value, setValue] = useControlled(false, {
    defaultValue: defaultChecked,
    value: checked,
  });

  const cls = c(prefixCls, className, {
    [`${prefixCls}--checked`]: value,
    [`${prefixCls}--disabled`]: disabled,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (disabled) {
      return;
    }
    const checked = e.target.checked;
    setValue(e.target.checked);
    onChange?.(checked, e);
  };

  return (
    <label className={cls} style={style} role={role}>
      <input
        {...inputProps}
        checked={value}
        ref={ref}
        type={type}
        onChange={handleChange}
      />
      {children}
    </label>
  );
});

export type { CheckBoxProps };

export { CheckBox };
