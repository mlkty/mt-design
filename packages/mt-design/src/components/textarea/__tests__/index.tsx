import {createRef} from 'react';
import {Textarea} from '..';
import {act, customRender, waitFor, fireEvent} from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';
import {TextareaRef} from '../Textarea';

describe('Textarea', () => {
    mountTest(Textarea);

    it('render single textarea', async () => {
        const {container} = customRender(<Textarea />);
        expect(container).toMatchSnapshot();
    });

    it('render autoSize textarea', async () => {
        const {container} = customRender(<Textarea autoSize />);
        expect(container).toMatchSnapshot();
    });

    it('render rows property', async () => {
        const {container} = customRender(<Textarea rows={5} />);
        expect(container.querySelector('textarea')).toHaveAttribute('rows', '5');
    });

    it('render disabled property', async () => {
        const {container} = customRender(<Textarea disabled />);
        expect(container.querySelector('textarea')).toHaveAttribute('disabled');
        expect(container.firstChild).toHaveClass('mt-textarea--disabled');
    });

    it('render showCount property', async () => {
        const {container} = customRender(<Textarea showCount defaultValue="12345" />);
        expect(container.querySelector('.mt-textarea-count')).toHaveTextContent('5');
    });

    it('render hover status', async () => {
        const {container} = customRender(<Textarea />);
        fireEvent.mouseEnter(container.querySelector('textarea')!);
        expect(container.firstChild).toHaveClass('mt-textarea--hover');
        fireEvent.mouseLeave(container.querySelector('textarea')!);
        expect(container.firstChild).not.toHaveClass('mt-textarea--hover');
    });

    it('render focus status', async () => {
        const {container} = customRender(<Textarea />);
        fireEvent.focus(container.querySelector('textarea')!);
        expect(container.firstChild).toHaveClass('mt-textarea--focus');
        fireEvent.blur(container.querySelector('textarea')!);
        expect(container.firstChild).not.toHaveClass('mt-textarea--focus');
    });

    it('render composition status', async () => {
        const text = '123456789101112';
        const {container} = customRender(<Textarea maxLength={10} />);
        fireEvent.compositionStart(container.querySelector('textarea')!);
        fireEvent.change(container.querySelector('textarea')!, {
            target: {value: text},
        });
        expect(container.querySelector('textarea')).toHaveValue(text);
        fireEvent.compositionEnd(container.querySelector('textarea')!);
        expect(container.querySelector('textarea')).toHaveValue(text.slice(0, 10));
    });

    it('render maxLength', async () => {
        const text = '123456789101112';
        const {container} = customRender(<Textarea maxLength={10} />);
        fireEvent.change(container.querySelector('textarea')!, {
            target: {value: text},
        });
        expect(container.querySelector('textarea')).toHaveValue(text.slice(0, 10));
    });

    it('render showCount & maxLength property', async () => {
        const {container} = customRender(<Textarea showCount maxLength={100} defaultValue="12345" />);
        expect(container.querySelector('.mt-textarea-count')).toHaveTextContent('5 / 100');
    });

    it('using ref', async () => {
        const ref = createRef<TextareaRef>();
        const {container} = customRender(<Textarea ref={ref} defaultValue="12345" />);

        act(() => ref.current?.focus());
        waitFor(() => expect(container.firstChild).toHaveClass('mt-textarea--focus'));

        act(() => ref.current?.blur());
        waitFor(() => expect(container.firstChild).not.toHaveClass('mt-textarea--focus'));

        act(() => ref.current?.clear());
        waitFor(() => expect(ref.current?.nativeElement).toHaveTextContent(''));
    });

    it('render autoSize property', async () => {
        const {container} = customRender(<Textarea defaultValue={'1\n2\n3\n4\n5\n6'} style={{lineHeight: 24}} autoSize={{minRows: 2, maxRows: 3}} />);
        // @TODO 理应 72px
        expect(container.querySelector('textarea')).toHaveStyle('height: 48px');
    });

    it('render onChange events', async () => {
        const onChange = jest.fn();
        const {container} = customRender(<Textarea value="1" onChange={onChange} />);
        fireEvent.change(container.querySelector('textarea')!, {
            target: {value: 'abc'},
        });
        expect(onChange).toBeCalledTimes(1);
        expect(onChange).toBeCalledWith('abc', '1');
    });
});
