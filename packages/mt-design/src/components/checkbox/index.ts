import './index.scss';
import {InnerCheckbox, type InnerCheckboxProps as CheckboxProps} from './checkbox';
import {CheckboxGroup} from './checkbox-group';

type CheckboxFunctionComponent = typeof InnerCheckbox & {
    Group: typeof CheckboxGroup;
};

const Checkbox = InnerCheckbox as CheckboxFunctionComponent;

Checkbox.Group = CheckboxGroup;

export {
    Checkbox,
};

export type {
    CheckboxProps,
};
