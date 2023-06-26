import { StrictMode, ReactElement } from 'react';
import {
  render as pureRender,
  type RenderOptions,
} from '@testing-library/react';

const render = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  pureRender(ui, { wrapper: StrictMode, ...options });

export { pureRender, render };
