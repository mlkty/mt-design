import {Image} from '..';
import {customRender, sleep, screen, act} from '../../../../tests/utils';
import mountTest from '../../../../tests/mountTest';

const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC';

const getSuccessSrc = (() => {
    let index = 0;
    return () => `${LOAD_SUCCESS_SRC}${index++}`;
})();

describe('Image', () => {
    mountTest(Image);

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

    it('render image by empty src', async () => {
        const onError = jest.fn();
        customRender(<Image onError={onError} />);
        await sleep(200);
        expect(onError).not.toBeCalled();
    });

    it('render image by error src', async () => {
        const onError = jest.fn();
        customRender(<Image src="error" onError={onError} />);
        await sleep(200);
        expect(onError).toBeCalledTimes(1);
    });

    it('render image by success src', async () => {
        const onLoad = jest.fn();
        customRender(<Image src={getSuccessSrc()} onLoad={onLoad} />);
        await sleep(200);
        expect(onLoad).toBeCalledTimes(1);
    });

    it('render image by loading status', async () => {
        const onLoad = jest.fn();
        const {rerender} = customRender(<Image src={getSuccessSrc()} placeholder="loading" onLoad={onLoad} />);
        await sleep(50);
        expect(screen.getByRole('placeholder')).toBeInTheDocument();
        // custom placeholder
        rerender(<Image src={getSuccessSrc()} onLoad={onLoad} placeholder={<Image src={getSuccessSrc()} role="custom-placeholder" />} />);
        await sleep(50);
        expect(screen.getByRole('custom-placeholder')).toBeInTheDocument();
        await sleep(200);
        expect(onLoad).toBeCalledTimes(1);
    });

    it('render image by error status', async () => {
        const onError = jest.fn();
        const {rerender} = customRender(<Image src="error" fallback="error" onError={onError} />);
        await sleep(200);
        expect(screen.getByRole('fallback')).toBeInTheDocument();
        // custom error
        rerender(<Image src="error1" onError={onError} fallback={<Image src={getSuccessSrc()} role="custom-fallback" />} />);
        await sleep(200);
        expect(screen.getByRole('custom-fallback')).toBeInTheDocument();
        expect(onError).toBeCalledTimes(2);
    });

    it('not render show placeholder', async () => {
        const {container} = customRender(<Image src={getSuccessSrc()} placeholder={false} />);
        await sleep(50);
        expect(container.querySelector('[role=placeholder]')).not.toBeInTheDocument();
    });

    // lazy load
    it('render image by lazy load', async () => {
        const mockIntersectionObserver = jest.fn().mockReturnValue({
            observe: () => null,
            disconnect: () => null,
        });
        window.IntersectionObserver = mockIntersectionObserver;
        const {container} = customRender(<Image src={LOAD_SUCCESS_SRC} lazy />);
        const calls = mockIntersectionObserver.mock.calls;
        const [onChange] = calls[calls.length - 1];
        act(() => {
            onChange([
                {
                    isIntersecting: true,
                },
            ]);
        });

        await sleep(200);
        expect(container.querySelector('img')).toHaveAttribute('src', LOAD_SUCCESS_SRC);
    });
});
