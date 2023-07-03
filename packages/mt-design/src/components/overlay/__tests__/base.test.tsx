import {Overlay} from '..';
import {customRender} from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';

describe('Overlay', () => {
    mountTest(Overlay);

    it('render correctly', () => {
        const {container} = customRender(<Overlay />);
        expect(container).toBeEmptyDOMElement();
        expect(container).toMatchSnapshot();
    });
});
