import {customRender} from '../../../../tests/utils';
import {useConfigContext, ConfigProvider} from '..';

describe('ConfigProvider', () => {
    const CustomComponent = (props: {name?: string, customPrefixCls?: string}) => {
        const {getPrefixCls} = useConfigContext();
        const prefixCls = getPrefixCls(props.name || 'custom', props.customPrefixCls);
        return (<div className={prefixCls} role="container"></div>);
    };

    it('config provider prefixCls render', () => {
        const {container, rerender} = customRender(<CustomComponent />);
        expect(container.querySelector('.mt-custom')).not.toBeNull();

        rerender(
            <ConfigProvider>
                <CustomComponent />
            </ConfigProvider>
        );
        expect(container.querySelector('.mt-custom')).not.toBeNull();

        rerender(<CustomComponent customPrefixCls="so-custom" />);
        expect(container.querySelector('.so-custom')).not.toBeNull();
    });

    it('render component in config provider', () => {
        const {container, rerender} = customRender(
            <ConfigProvider prefixCls="so">
                <CustomComponent />
            </ConfigProvider>
        );

        expect(container.querySelector('.so-custom')).not.toBeNull();

        rerender(
            <ConfigProvider prefixCls="so">
                <CustomComponent customPrefixCls="bep-custom" />
            </ConfigProvider>
        );
        expect(container.querySelector('.bep-custom')).not.toBeNull();
    });
});
