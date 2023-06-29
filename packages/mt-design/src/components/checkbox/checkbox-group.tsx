
import {useMemo, type ReactNode, type ChangeEvent} from 'react';
import {useControlled, useEvent} from '@mlkty/mt-shared-utils';
import {CheckboxGroupContextProvider, ICheckboxGroupContext} from './context';
import {type CheckboxValue} from './checkbox';

interface CheckboxGroupProps {
    name?: string;
    disabled?: boolean;
    defaultValue?: CheckboxValue[];
    value?: CheckboxValue[];
    onChange?: (value: CheckboxValue[], e: ChangeEvent<HTMLInputElement>) => void;
    children?: ReactNode;
}

const CheckboxGroup = (props: CheckboxGroupProps) => {
    const {name, disabled, defaultValue, value, children, onChange} = props;

    const [rawValue, setRawValue] = useControlled<CheckboxValue[]>([], {
        defaultValue,
        value,
    });

    const handleChange = useEvent<Required<ICheckboxGroupContext>['onChange']>(
        (result, e: React.ChangeEvent<HTMLInputElement>) => {
            const {value, checked} = result;

            let newValue = rawValue;

            if (value) {
                newValue = checked
                    ? [...rawValue, value]
                    : rawValue.filter(v => v !== value);

                setRawValue(newValue);
            }

            onChange && onChange(newValue, e);
        }
    );

    const contextValue = useMemo(() => ({
        name,
        disabled,
        value: rawValue,
        onChange: handleChange,
    }), [name, disabled, rawValue, handleChange]);

    return (
        <CheckboxGroupContextProvider value={contextValue}>
            {children}
        </CheckboxGroupContextProvider>
    );
};

export {
    CheckboxGroup,
};

export type {
    CheckboxGroupProps,
};
