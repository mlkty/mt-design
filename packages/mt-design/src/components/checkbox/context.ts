import {createContext, useContext, type ChangeEvent} from 'react';
import type {CheckboxValue} from './checkbox';

interface Result {
    checked: boolean;
    value?: CheckboxValue;
}

export interface ICheckboxGroupContext {
    value: CheckboxValue[];
    name?: string;
    disabled?: boolean;
    onChange?: (result: Result, e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxGroupContext = createContext<ICheckboxGroupContext | null>(null);

export const CheckboxGroupContextProvider = CheckboxGroupContext.Provider;

export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);
