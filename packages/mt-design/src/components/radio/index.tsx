import './index.scss';
import {Radio as MTRadio} from '@mlkty/mt-design-headless';
import {Radio as InnerRadio, type RadioProps} from './radio';

type RadioFunctionComponent = typeof InnerRadio & {
  Group: typeof MTRadio.Group;
};

const Radio = InnerRadio as RadioFunctionComponent;

Radio.Group = MTRadio.Group;

export {Radio};

export type {RadioProps};
