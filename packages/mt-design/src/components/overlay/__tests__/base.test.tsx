/* eslint-disable max-len */
import {Overlay} from '..';
import {customRender, sleep} from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';

describe('Overlay', () => {
    mountTest(Overlay);

    it('render snapshot when visible correctly', () => {
        const {container} = customRender(<Overlay visible />);
        expect(container).toMatchSnapshot();
    });

    it('render classnames correctly througn invisible to visible', async () => {
        const {container, rerender} = customRender(<Overlay />);
        rerender(<Overlay visible />);
        expect(container.firstChild).toHaveClass('mt-overlay-fade-enter mt-overlay-fade-enter-active');
        await sleep(350);
        expect(container.firstChild).toHaveClass('mt-overlay-fade-enter-done');
    });

    it('render classnames correctly througn visible to invisible', async () => {
        const {container, rerender} = customRender(<Overlay visible />);
        expect(container.firstChild).toHaveClass('mt-overlay-fade-appear mt-overlay-fade-appear-active');
        rerender(<Overlay />);
        expect(container.firstChild).toHaveClass('mt-overlay-fade-exit mt-overlay-fade-exit-active');
        await sleep(350);
        expect(container).toBeEmptyDOMElement();
    });

    it('initialize have dom', () => {
        const {container} = customRender(<Overlay forceRender />);
        expect(container.firstChild).toHaveClass('mt-overlay');
    });

    it('unmounted keep dom', () => {
        const {container, rerender} = customRender(<Overlay visible />);
        rerender(<Overlay destroyOnHide={false} />);
        expect(container.children.length).toBe(1);
    });
});
