import {useControlled, useEvent} from '@mlkty/mt-shared-utils';
import {type ReactNode, useMemo} from 'react';
import {RadioGroupContextProvider} from './context';
import {type RadioValue} from './radio';

export interface RadioGroupProps {
  value?: RadioValue;
  defaultValue?: RadioValue;
  name?: string;
  children?: ReactNode;
  onChange?: (
    value: RadioValue,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export const RadioGroup = (props: RadioGroupProps) => {
    const {value, name, defaultValue, onChange, children} = props;

    const [rawValue, setRawValue] = useControlled('', {
        defaultValue,
        value,
    });

    const handleChange = useEvent(
        (value: RadioValue, e: React.ChangeEvent<HTMLInputElement>) => {
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
