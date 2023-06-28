import {Button} from '..';
import {customRender} from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';

describe('Button', () => {
    mountTest(Button);

    it('render children correctly', () => {
        const {container} = customRender(<Button>Follow</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('render loading correctly', () => {
        const {container} = customRender(<Button loading>button</Button>);
        expect(container.firstChild).toHaveClass('mt-button');
        expect(container.firstChild).toHaveClass('mt-button--disabled');
    });

    it('render disabled correctly', () => {
        const {container} = customRender(<Button disabled>button</Button>);
        expect(container.firstChild).toHaveClass('mt-button');
        expect(container.firstChild).toHaveClass('mt-button--disabled');
    });
});
