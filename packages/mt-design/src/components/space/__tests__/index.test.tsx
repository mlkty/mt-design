import {Space, type SpaceProps} from '..';
import {Divider} from '../../divider';
import {customRender, screen} from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';

type SpaceElement = HTMLElement & {style: SpaceProps['style']};

describe('Space', () => {
    mountTest(Space);

    it('render empty children', async () => {
        customRender(<Space />);
        const element = screen.getByRole('space');
        expect(element.children.length).toBe(0);
    });

    it('render size snapshot', () => {
        const {container} = customRender((
            <>
                <Space>
                    <span key="custom-key-1">1</span>
                    <span key="custom-key-2">2</span>
                    no element
                </Space>
                <Space size="middle">
                    <span>1</span>
                    <span>2</span>
                </Space>
                <Space size="large">
                    <span>1</span>
                    <span>2</span>
                </Space>
                <Space size={12}>
                    <span>1</span>
                    <span>2</span>
                </Space>
            </>
        ));
        expect(container.children).toMatchSnapshot();
    });

    it('should render size gap style', () => {
        const {rerender} = customRender(
            <Space>
                <span>1</span>
                <span>2</span>
            </Space>
        );

        const container = screen.getByRole<SpaceElement>('space');

        expect(container).toHaveStyle({'--size': '8px'});

        rerender(
            <Space size="middle">
                <span>1</span>
                <span>2</span>
            </Space>
        );
        expect(container).toHaveStyle({'--size': '16px'});

        rerender(
            <Space size="large">
                <span>1</span>
                <span>2</span>
            </Space>
        );
        expect(container).toHaveStyle({'--size': '24px'});

        rerender(
            <Space size={30}>
                <span>1</span>
                <span>2</span>
            </Space>
        );
        expect(container).toHaveStyle({'--size': '30px'});

        rerender(
            // @ts-expect-error set a unrecognized string will return 0;
            <Space size="error">
                <span>1</span>
                <span>2</span>
            </Space>
        );
        expect(container).toHaveStyle({'--size': '0px'});
    });

    it('should exact classnames', () => {
        const {rerender} = customRender(<Space />);

        const container = screen.getByRole<SpaceElement>('space');
        expect(container).toHaveClass('mt-space mt-space--horizontal mt-space--align-center', {exact: true});

        rerender(<Space block />);
        expect(container).toHaveClass('mt-space--block');

        rerender(<Space block direction="vertical" />);
        expect(container).toHaveClass('mt-space--vertical');

        rerender(<Space block direction="vertical" wrap />);
        expect(container).toHaveClass('mt-space--vertical', 'mt-space--wrap');
    });

    it('should render split by divier', () => {
        customRender(
            <Space split={<Divider direction="vertical" />}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
            </Space>
        );

        const container = screen.getByRole<SpaceElement>('space');
        const splitElements = screen.getAllByRole('space-split');

        expect(splitElements.length).toBe(2);
        expect(container.children).toMatchSnapshot();
    });
});
