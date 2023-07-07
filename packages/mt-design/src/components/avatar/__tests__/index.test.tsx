import {UserOutlined} from '@ant-design/icons';

import {Avatar} from '..';
import {customRender, screen} from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';

const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC';

describe('Avatar', () => {
    mountTest(Avatar);

    beforeAll(() => {
        let src = '';
        Object.defineProperty(global.Image.prototype, 'src', {
            get() {
                return src;
            },
            set(_src) {
                src = _src;
                if (src.includes(LOAD_SUCCESS_SRC)) {
                    setTimeout(() => this.onload(), 200);
                } else {
                    setTimeout(() => this.onerror?.(new Error()), 200);
                }
            },
        });
    });

    it('render avatar by empty src', async () => {
        const {container} = customRender(<Avatar />);
        expect(container).toMatchSnapshot();
    });

    it('render avatar by src', async () => {
        const {container} = customRender(<Avatar src="LOAD_SUCCESS_SRC" />);
        expect(container).toMatchSnapshot();
    });

    it('render avatar by icon', async () => {
        const {container} = customRender(<Avatar icon={<UserOutlined />} />);
        expect(container.querySelector('svg')).toBeInTheDocument();
        expect(container.querySelector('img')).not.toBeInTheDocument();
    });

    it('render avatar by text', async () => {
        const {container} = customRender(<Avatar>U</Avatar>);
        expect(container.firstChild).toHaveTextContent('U');
    });

    // =========== style ==========
    const map = {
        small: 18,
        middle: 24,
        large: 32,
        '64': 64,
    };

    Object.entries(map).forEach(([size, value]: [any, number]) => {
        it(`render avatar size: ${size}`, async () => {
            const props: Record<string, any> = {};
            if (size !== 'middle') {
                props[size] = size;
            }
            customRender(<Avatar size={size}>U</Avatar>);
            expect(screen.getByRole('avatar')).toHaveStyle({fontSize: value});
        });
    });
});
