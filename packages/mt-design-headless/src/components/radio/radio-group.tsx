import {useControlled, useEvent} from '@mlkty/mt-shared-utils';
import {type ReactNode, useMemo} from 'react';
import {RadioGroupContextProvider} from './context';
import {type RadioValue} from './radio';

export interface RadioGroupProps<T extends RadioValue = RadioValue> {
  value?: T;
  defaultValue?: T;
  name?: string;
  children?: ReactNode;
  onChange?: (
    value: T,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export const RadioGroup = <T extends RadioValue = RadioValue>(props: RadioGroupProps<T>) => {
    const {value, name, defaultValue, onChange, children} = props;

    const [rawValue, setRawValue] = useControlled<T>('' as T, {
        defaultValue,
        value,
    });

    const handleChange = useEvent(
        (value: T, e: React.ChangeEvent<HTMLInputElement>) => {
            setRawValue(value);
            onChange?.(value, e);
        }
    );

    const contextValue = useMemo(
        () => ({
            name,
            value: rawValue,
            onChange: handleChange,
        }),
        [rawValue, name, handleChange]
    );

    return (
        <RadioGroupContextProvider value={contextValue}>
            {children}
        </RadioGroupContextProvider>
    );
};
