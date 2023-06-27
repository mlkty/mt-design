import {Radio} from '..';
import {customRender, userEvent, screen} from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';

describe('Radio', () => {
    mountTest(Radio);

    it('render radio correctly', async () => {
        const {container} = customRender(<Radio />);
        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass('mt-radio', {exact: true});
        // wait radio render.
        await userEvent.click(element);
        expect(element).toHaveClass('mt-radio mt-radio--checked', {exact: true});
        expect(element.querySelector('input')).toBeChecked();
    });

    it('render disabled correctly', async () => {
        const {container} = customRender(<Radio disabled />);
        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass('mt-radio--disabled');
        // wait radio render.
        await userEvent.click(element);
        expect(element).not.toHaveClass('mt-radio--checked');
        expect(element.querySelector('input')).not.toBeChecked();
    });

    it('render group correctly', async () => {
        customRender(
            <Radio.Group>
                <Radio value="1" role="radio1" />
                <Radio value="2" disabled role="radio2" />
                <Radio value="3" role="radio3" />
            </Radio.Group>
        );

        await userEvent.click(screen.getByRole('radio1'));
        expect(screen.getByRole('radio1')).toHaveClass('mt-radio--checked');
        await userEvent.click(screen.getByRole('radio2'));
        expect(screen.getByRole('radio1')).toHaveClass('mt-radio--checked');
        expect(screen.getByRole('radio2')).not.toHaveClass('mt-radio--checked');
        await userEvent.click(screen.getByRole('radio3'));
        expect(screen.getByRole('radio3')).toHaveClass('mt-radio--checked');
    });
});
