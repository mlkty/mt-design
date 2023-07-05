import {
    Radio as MTRadio,
    RadioProps as MTRadioProps,
} from '@mlkty/mt-design-headless';
import {useConfigContext} from '../config-provider';

type RadioProps = MTRadioProps;

function Radio(props: RadioProps) {
    const {children, ...restProps} = props;

    const {getPrefixCls} = useConfigContext();

    const prefixCls = getPrefixCls('radio');

    return (
        <MTRadio role="radio" prefixCls={prefixCls} {...restProps}>
            <span className={`${prefixCls}-input`}></span>
            <span className={`${prefixCls}-inner`}>{children}</span>
        </MTRadio>
    );
}

export type {RadioProps};

export {Radio};
