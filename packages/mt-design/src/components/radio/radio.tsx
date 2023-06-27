import {
    Radio as MTRadio,
    RadioProps as MTRadioProps,
} from '@mlkty/mt-design-headless';
import {withMergeProps} from '@mlkty/mt-shared-utils';
import {useConfigContext} from '../../contexts/config-provider';

type RadioProps = MTRadioProps;

function Radio(props: RadioProps) {
    const {children, ...restProps} = props;

    const {getPrefixCls} = useConfigContext();

    const prefixCls = getPrefixCls('radio');

    return withMergeProps(
        restProps,
        <MTRadio role="radio" prefixCls={prefixCls}>
            <span className="mt-radio-input"></span>
            <span className="mt-radio-inner">{children}</span>
        </MTRadio>
    );
}

export type {RadioProps};

export {Radio};
