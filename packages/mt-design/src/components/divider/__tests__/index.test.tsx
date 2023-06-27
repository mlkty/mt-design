import {Divider} from '..';
import {customRender} from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';

describe('Divider', () => {
    mountTest(Divider);

    it('render horizontal correctly', () => {
        const {container} = customRender(<Divider />);
        expect(container.firstChild).toHaveClass('mt-divider mt-divider--horizontal', {exact: true});
    });

    it('render horizontal text correctly', () => {
        const {container, rerender} = customRender(<Divider>Text</Divider>);

        // classname
        const cls = (...args: string[]) =>
            args.concat(['mt-divider', 'mt-divider--horizontal', 'mt-divider--with-text']).join(' ');
        expect(container.firstChild).toHaveClass(cls('mt-divider--center'), {exact: true});
        rerender(<Divider align="left">Text</Divider>);
        expect(container.firstChild).toHaveClass(cls('mt-divider--left'), {exact: true});
        rerender(<Divider align="right">Text</Divider>);
        expect(container.firstChild).toHaveClass(cls('mt-divider--right'), {exact: true});
        rerender(<Divider align="center">Text</Divider>);
        expect(container.firstChild).toHaveClass(cls('mt-divider--center'), {exact: true});

        // text
        expect(container.firstChild).toHaveTextContent('Text');
    });

    it('render vertical correctly', () => {
        const {container} = customRender(<Divider direction="vertical">Text</Divider>);

        // classname
        const cls = (...args: string[]) => args.concat(['mt-divider', 'mt-divider--vertical']).join(' ');
        expect(container.firstChild).toHaveClass(cls(), {exact: true});

        // empty even if has children.
        expect(container.firstChild).toBeEmptyDOMElement();
    });
});
