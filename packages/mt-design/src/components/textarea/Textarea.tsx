import {c, useControlled, useLayoutEffect} from '@mlkty/mt-shared-utils';
import {CSSProperties, ForwardedRef, forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {useConfigContext} from '../config-provider';

export type TextareaProps = React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> & {
    rows?: number;
    /**
     * 响应式撑高。默认高度为 rows。
     */
    autoSize?: boolean | {minRows?: number, maxRows?: number};
    disabled?: boolean;
    showCount?: boolean;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    maxLength?: number;
    onChange?: (val: string, prev: string) => void;

    rootClassName?: string;
    rootStyle?: CSSProperties;
    className?: string;
    style?: CSSProperties;
};

export interface TextareaRef {
    clear: () => void;
    focus: () => void;
    blur: () => void;
    nativeElement: HTMLTextAreaElement | null;
}

const Textarea = forwardRef((props: TextareaProps, ref: ForwardedRef<TextareaRef>) => {
    const {
        rows = 2,
        placeholder,
        showCount,
        maxLength,
        autoSize,
        disabled,

        // events
        onChange,
        onFocus,
        onBlur,
        onCompositionStart,
        onCompositionEnd,

        // value
        defaultValue: outerDefaultValue,
        value: outerValue,

        // style
        rootClassName,
        rootStyle: outerRootStyle,
        className,
        style: outerStyle,

        ...restProps
    } = props;

    const {getPrefixCls} = useConfigContext();
    const nativeTextAreaRef = useRef<HTMLTextAreaElement>(null);
    const hiddenTextAreaRef = useRef<HTMLTextAreaElement>(null);
    const compositingRef = useRef(false);
    const heightRef = useRef<string>('auto');
    const [height, setHeight] = useState<string>('auto');
    const [isFocus, setIsFocus] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const [value, setValue] = useControlled('', {
        defaultValue: outerDefaultValue,
        value: outerValue,
        onChange,
    });

    useImperativeHandle(ref, () => ({
        clear: () => {
            setValue('');
        },
        focus: () => {
            nativeTextAreaRef.current?.focus();
        },
        blur: () => {
            nativeTextAreaRef.current?.blur();
        },
        get nativeElement() {
            return nativeTextAreaRef.current;
        },
    }));

    useLayoutEffect(() => {
        if (!autoSize) {
            return;
        }
        const textArea = nativeTextAreaRef.current;
        const hiddenTextArea = hiddenTextAreaRef.current;
        if (!textArea || !hiddenTextArea) {
            setHeight('auto');
            return;
        }
        let height = hiddenTextArea.scrollHeight;
        if (typeof autoSize === 'object') {
            const computedStyle = window.getComputedStyle(textArea);
            const lineHeight = parseFloat(computedStyle.lineHeight);
            if (autoSize.minRows) {
                height = Math.max(height, autoSize.minRows * lineHeight);
            }
            if (autoSize.maxRows) {
                height = Math.min(height, autoSize.maxRows * lineHeight);
            }
        }
        // @NOTE 需要继续探究一下为什么存在 2px 误差。
        heightRef.current = `${height}px`;
        setHeight(heightRef.current);
    }, [value, autoSize]);

    const prefixCls = getPrefixCls('textarea');


    const rootCls = c(prefixCls, {
        [`${prefixCls}--focus`]: isFocus,
        [`${prefixCls}--hover`]: isHover,
        [`${prefixCls}--disabled`]: disabled,
    }, rootClassName);

    const rootStyle = {
        ...outerRootStyle,
    };

    const cls = c(`${prefixCls}-element`, className);

    const style = {
        height,
        ...outerStyle,
    };

    const renderCount = () => {
        if (!showCount) {
            return null;
        }

        let text = '';

        if (showCount) {
            text += value.length;
        }

        if (maxLength) {
            text += ` / ${maxLength}`;
        }
        return <div className={`${prefixCls}-count`}>{text}</div>;
    };

    return (
        <div className={rootCls} style={rootStyle}>
            <textarea
                {...restProps}
                key="text-area"
                ref={nativeTextAreaRef}
                className={cls}
                style={style}
                value={value}
                onChange={e => {
                    let v = e.target.value;
                    if (maxLength && !compositingRef.current) {
                        v = [...v].slice(0, maxLength).join('');
                    }
                    setValue(v);
                }}
                onFocus={e => {
                    setIsFocus(true);
                    props.onFocus?.(e);
                }}
                onBlur={e => {
                    setIsFocus(false);
                    props.onBlur?.(e);
                }}
                onMouseEnter={e => {
                    setIsHover(true);
                    props.onMouseEnter?.(e);
                }}
                onMouseLeave={e => {
                    setIsHover(false);
                    props.onMouseLeave?.(e);
                }}
                onCompositionStart={e => {
                    compositingRef.current = true;
                    props.onCompositionStart?.(e);
                }}
                onCompositionEnd={e => {
                    compositingRef.current = false;
                    if (maxLength) {
                        const v = (e.target as HTMLTextAreaElement).value;
                        setValue([...v].slice(0, maxLength).join(''));
                    }
                    props.onCompositionEnd?.(e);
                }}
                autoComplete={props.autoComplete}
                autoFocus={props.autoFocus}
                disabled={props.disabled}
                readOnly={props.readOnly}
                name={props.name}
                onClick={props.onClick}
                placeholder={placeholder}
                id={props.id}
                rows={rows}
            />
            {renderCount()}
            {autoSize && (
                <textarea
                    ref={hiddenTextAreaRef}
                    className={`${prefixCls}-element ${prefixCls}-element--hidden`}
                    value={value}
                    rows={props.rows}
                    aria-hidden
                    readOnly
                />
            )}
        </div>
    );
});

export default Textarea;
