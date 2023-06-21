import { useControlled, useEvent } from '@mlkty/mt-shared-utils';
import { useMemo } from 'react';
import { type HTMLAttributes, forwardRef } from 'react';
import { RadioGroupContextProvider } from './context';
import { type RadioValue } from './radio';

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  value?: RadioValue;
  defaultValue?: RadioValue;
  onChange?: (
    value: RadioValue,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(props, ref) {
    const { value, defaultValue, onChange, children, ...restProps } = props;

    const [rawValue, setRawValue] = useControlled('', {
      defaultValue,
      value,
    });

    const handleChange = useEvent(
      (value: RadioValue, e: React.ChangeEvent<HTMLInputElement>) => {
        setRawValue(value);
        onChange?.(value, e);
      },
    );

    const contextValue = useMemo(
      () => ({
        value: rawValue,
        onChange: handleChange,
      }),
      [rawValue, handleChange],
    );

    return (
      <div ref={ref} {...restProps}>
        <RadioGroupContextProvider value={contextValue}>
          {children}
        </RadioGroupContextProvider>
      </div>
    );
  },
);
