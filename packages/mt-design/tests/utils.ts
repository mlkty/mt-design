import {StrictMode, ReactElement} from 'react';
import {
    render as pureRender,
    type RenderOptions,
} from '@testing-library/react';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    pureRender(ui, {wrapper: StrictMode, ...options});

export {pureRender, customRender};

export {default as userEvent} from '@testing-library/user-event';

export * from '@testing-library/react';
