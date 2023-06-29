import {Checkbox} from '..';
import {customRender, userEvent, fireEvent} from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';


describe('CheckboxGroup', () => {
    mountTest(Checkbox.Group);

    it('render defaultValue group', async () => {
        const {container} = customRender(
            <Checkbox.Group defaultValue={['1']}>
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
            </Checkbox.Group>
        );

        const [checkbox1, checkbox2] = Array.from(container.querySelectorAll('.mt-checkbox'));
        expect(checkbox1).toHaveClass('mt-checkbox mt-checkbox--checked', {exact: true});
        expect(checkbox2).toHaveClass('mt-checkbox', {exact: true});
    });

    it('render disabled group', async () => {
        const {container} = customRender(
            <Checkbox.Group disabled value={['1']}>
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
            </Checkbox.Group>
        );

        const [checkbox1, checkbox2] = Array.from(container.querySelectorAll('.mt-checkbox'));
        await userEvent.click(checkbox2);
        fireEvent.click(checkbox2);
        expect(checkbox1).toHaveClass('mt-checkbox mt-checkbox--checked mt-checkbox--disabled', {exact: true});
        expect(checkbox2).toHaveClass('mt-checkbox mt-checkbox--disabled', {exact: true});
    });

    it('render name property of group', async () => {
        const {container} = customRender(
            <Checkbox.Group name="id" disabled value={['1']}>
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
            </Checkbox.Group>
        );

        const [checkbox1, checkbox2] = Array.from(container.querySelectorAll('.mt-checkbox'));
        expect(checkbox1.querySelector('input')!).toHaveAttribute('name', 'id');
        expect(checkbox2.querySelector('input')!).toHaveAttribute('name', 'id');
    });

    it('render onChange of group', async () => {

        const onChangeGroup = jest.fn();
        const onChange1 = jest.fn();
        const onChange2 = jest.fn();

        const {container} = customRender(
            <Checkbox.Group name="id" onChange={onChangeGroup}>
                <Checkbox onChange={onChange1} value="1">1</Checkbox>
                <Checkbox onChange={onChange2} value="2">2</Checkbox>
            </Checkbox.Group>
        );

        fireEvent.click(container.querySelectorAll('.mt-checkbox-input')[0]);
        expect(onChange1).toHaveBeenCalledWith(true, expect.anything());
        expect(onChangeGroup).toHaveBeenCalledWith(['1'], expect.anything());

        fireEvent.click(container.querySelectorAll('.mt-checkbox-input')[1]);
        expect(onChange2).toHaveBeenCalledWith(true, expect.anything());
        expect(onChangeGroup).toHaveBeenCalledWith(['1', '2'], expect.anything());

        fireEvent.click(container.querySelectorAll('.mt-checkbox-input')[1]);
        expect(onChange2).toHaveBeenCalledWith(false, expect.anything());
        expect(onChangeGroup).toHaveBeenCalledWith(['1'], expect.anything());

        fireEvent.click(container.querySelectorAll('.mt-checkbox-input')[0]);
        expect(onChange1).toHaveBeenCalledWith(false, expect.anything());
        expect(onChangeGroup).toHaveBeenCalledWith([], expect.anything());
    });
});
