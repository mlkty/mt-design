import { Button } from '..';
import { ConfigProvider } from '../../../contexts/config-provider';
import { render } from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';

describe('Button', () => {
    mountTest(Button);

    it('render children correctly', () => {
        const { container } = render(<Button>Follow</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('render loading correctly', () => {
        const { container } = render(<Button loading>button</Button>);
        expect(container.firstChild).toHaveClass('mt-button');
        expect(container.firstChild).toHaveClass('mt-button--disabled');
    });

    it('render disabled correctly', () => {
        const { container } = render(<Button disabled>button</Button>);
        expect(container.firstChild).toHaveClass('mt-button');
        expect(container.firstChild).toHaveClass('mt-button--disabled');
    });

    it('render context correctly', () => {
        const { container } = render(
            <ConfigProvider prefixCls="custom">
                <Button disabled>button</Button>
            </ConfigProvider>,
        );

        expect(container.firstChild).toHaveClass('custom-button');
        expect(container.firstChild).toHaveClass('custom-button--disabled');
    });
});
