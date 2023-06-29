import {createContext, useContext} from 'react';
import {RadioValue} from './radio';

export interface IRadioGroupContext {
  value: RadioValue;
  onChange: (value: RadioValue, e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroupContext = createContext<IRadioGroupContext | null>(null);

export const RadioGroupContextProvider = RadioGroupContext.Provider;

export const useRadioGroupContext = () => useContext(RadioGroupContext);
