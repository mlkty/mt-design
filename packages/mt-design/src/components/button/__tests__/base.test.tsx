import { useContext, createContext, version } from 'react';
import { version as domVersion } from 'react-dom';
import { render } from '@testing-library/react';

const Context = createContext<any>(null);

const Button = (props: any) => {
  const a = useContext(Context);
  if (a) {
    console.info('a', a);
  }
  return <button>{props.children}</button>;
};

describe('Button', () => {
  it('renders with context', () => {
    console.info('version', version, domVersion);
    const contextValue = 'Test value';
    render(
      <Context.Provider value={contextValue}>
        <Button />
      </Context.Provider>,
    );
    // ... add your assertions here
  });
});
