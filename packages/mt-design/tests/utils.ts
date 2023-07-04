import {StrictMode, ReactElement} from 'react';
import {
    render as pureRender,
    type RenderOptions,
    act,
} from '@testing-library/react';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    pureRender(ui, {wrapper: StrictMode, ...options});

const sleep = async (timeout = 0) => {
    await act(async () => {
        await new Promise(resolve => {
            global.setTimeout(resolve, timeout);
        });
    });
};

export {pureRender, customRender, sleep};

export {default as userEvent} from '@testing-library/user-event';

export * from '@testing-library/react';
