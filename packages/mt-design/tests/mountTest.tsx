import { render } from './utils';

export default function mountTest(Component: React.ComponentType<any>) {
    describe('mount and unmount', () => {
        it('component could be updated and unmounted without errors', () => {
            const { unmount, rerender } = render(<Component />);
            expect(() => {
                rerender(<Component />);
                unmount();
            }).not.toThrow();
        });
    });
}
