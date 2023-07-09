import {Link} from '..';
import {customRender} from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';

describe('Link', () => {
    mountTest(Link);

    it('render empty link', async () => {
        const {container} = customRender(<Link />);
        expect(container).toMatchSnapshot();
    });

    it('render children', async () => {
        const {container} = customRender(<Link>link</Link>);
        expect(container).toHaveTextContent('link');
    });

    const types = ['default', 'primary'] as const;
    types.forEach(type => {
        it(`render type: ${type}`, async () => {
            const {container, rerender} = customRender(<Link type={type}>link</Link>);
            expect(container.firstChild).toHaveClass(`mt-link--${type}`);
            rerender(<Link type={type} disabled>link</Link>);

            expect(container.firstChild).toHaveClass('mt-link--disabled');
        });
    });
});
