import {Checkbox} from '..';
import {customRender, userEvent} from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';

describe('Checkbox', () => {
    mountTest(Checkbox);

    it('render checkbox correctly', async () => {
        const {container} = customRender(<Checkbox />);

        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass('mt-checkbox', {exact: true});
        await userEvent.click(element);
        expect(element).toHaveClass('mt-checkbox mt-checkbox--checked', {exact: true});
    });

    it('render disabled checkbox', async () => {
        const {container} = customRender(<Checkbox disabled />);
        const element = container.firstChild as HTMLElement;

        expect(element).toHaveClass('mt-checkbox mt-checkbox--disabled', {exact: true});
        await userEvent.click(element);
        expect(element).toHaveClass('mt-checkbox mt-checkbox--disabled', {exact: true});
    });

    it('render disabled checked checkbox', async () => {
        const {container} = customRender(<Checkbox defaultChecked disabled />);
        const element = container.firstChild as HTMLElement;

        expect(element).toHaveClass('mt-checkbox mt-checkbox--checked mt-checkbox--disabled', {exact: true});
        await userEvent.click(element);
        expect(element).toHaveClass('mt-checkbox mt-checkbox--checked mt-checkbox--disabled', {exact: true});
    });

    it('render onChange checkbox', async () => {
        const onChange = jest.fn();

        const {container} = customRender(<Checkbox onChange={onChange} />);
        const element = container.firstChild as HTMLElement;

        await userEvent.click(element);
        expect(onChange).toBeCalledWith(true, expect.anything());
    });
});
