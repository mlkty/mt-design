import {Radio as InnerRadio, type RadioProps, type RadioValue} from './radio';
import {RadioGroup, RadioGroupProps} from './radio-group';

type RadioFunctionComponent = typeof InnerRadio & {
  Group: typeof RadioGroup;
};

const Radio = InnerRadio as RadioFunctionComponent;

Radio.Group = RadioGroup;

export {Radio};

export type {RadioValue, RadioProps, RadioGroupProps};
