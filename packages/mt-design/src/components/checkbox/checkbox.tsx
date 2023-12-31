import {forwardRef} from 'react';
import {Checkbox, CheckboxProps} from '@mlkty/mt-design-headless';
import {type MergeProps, withMergeProps} from '@mlkty/mt-shared-utils';
import {useConfigContext} from '../../contexts/config-provider';
import {useCheckboxGroupContext} from './context';

type CheckboxValue = string | number;

type InnerCheckboxProps = MergeProps & Omit<CheckboxProps, 'prefixCls'> & {
    value?: CheckboxValue;
};

const InnerCheckbox = forwardRef<HTMLInputElement, InnerCheckboxProps>((props, ref) => {
    const {children, ...restProps} = props;

    const {getPrefixCls} = useConfigContext();

    const context = useCheckboxGroupContext();

    const prefixCls = getPrefixCls('checkbox');

    if (context) {
        const originOnChange = restProps.onChange;

        restProps.name = context.name ?? restProps.name;
        restProps.disabled = context.disabled ?? restProps.disabled;
        restProps.checked = context.value.includes(restProps.value!);
        restProps.onChange = (checked, e) => {
            context.onChange && context.onChange({value: restProps.value, checked}, e);
            originOnChange && originOnChange(checked, e);
        };
    }

    return withMergeProps(
        restProps,
        <Checkbox ref={ref} prefixCls={prefixCls}>
            <span className={`${prefixCls}-input`}></span>
            <span className={`${prefixCls}-inner`}>{children}</span>
        </Checkbox>
    );
});

export {
    InnerCheckbox,
};

export type {
    CheckboxValue,
    InnerCheckboxProps,
};
