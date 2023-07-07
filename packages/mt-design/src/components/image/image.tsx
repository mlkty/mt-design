import {c, isString} from '@mlkty/mt-shared-utils';
import {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
    useEffect,
    type CSSProperties,
    type ReactElement,
    type ImgHTMLAttributes,
    type HTMLAttributes,
} from 'react';

import {useConfigContext} from '../config-provider';
import {LazyDetector} from './lazy-detector';
import {isValidImage} from './utils';

type ImageStatus = 'normal' | 'loading' | 'error' | 'success';

type ImageProps =
& Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder' | 'onLoad' | 'onError'>
& {
    width?: string | number;
    height?: string | number;
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    lazy?: boolean;

    rootClassName?: string;
    rootStyle?: CSSProperties;
    fallback?: ReactElement | string;
    placeholder?: ReactElement | string | boolean;

    onLoad?: () => void;
    onError?: () => void;
};


interface ImageRef {
    nativeElement: HTMLDivElement;
}

const Image = forwardRef<ImageRef, ImageProps>((props, ref) => {
    const {
        src: imgSrc,

        // intermediate
        placeholder = true,
        fallback,

        // style
        rootClassName,
        rootStyle,
        className,
        style,
        width,
        height,
        fit = 'fill',
        lazy = false,

        // events
        onLoad,
        onError,
        ...restProps
    } = props;

    const domRef = useRef<HTMLDivElement>(null!);
    const prevSrcRef = useRef<ImageProps['src']>();

    const [initialize, setInitialize] = useState(!lazy);
    const [status, setStatus] = useState<ImageStatus>('normal');
    const loadAndErrorRef = useRef<{onLoad: () => void, onError: () => void}>({} as any);

    const {getPrefixCls} = useConfigContext();

    const prefixCls = getPrefixCls('image');

    const rootCls = c(prefixCls, rootClassName);
    const cls = c(`${prefixCls}-img`, className);

    loadAndErrorRef.current.onLoad = () => {
        setStatus('success');
        onLoad?.();
    };

    loadAndErrorRef.current.onError = () => {
        setStatus('error');
        onError?.();
    };

    useEffect(() => {
        if (initialize && prevSrcRef.current !== imgSrc) {
            isValidImage(imgSrc || '').then(valid => {
                // 防止图片快速切换后，多次触发 load
                if (imgSrc !== prevSrcRef.current) {
                    return;
                }
                if (valid) {
                    setStatus('success');
                    loadAndErrorRef.current.onLoad();
                } else {
                    setStatus('error');
                    loadAndErrorRef.current.onError();
                }
            });
            prevSrcRef.current = imgSrc;
            setStatus('loading');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imgSrc, initialize]);

    useImperativeHandle(ref, () => ({
        nativeElement: domRef.current,
    }), []);

    // ========== render ==========
    const wrapStyle = {
        ...rootStyle,
        width,
        height,
    };

    const imgStyle = {
        ...style,
        'object-fit': fit,
        height, // to compat img default placeholder
    };

    const isError = status === 'error';
    const isSuccess = status === 'success';
    const isLoading = status === 'loading';

    const src = initialize && isSuccess ? imgSrc : '';

    const renderIntermediate = (
        intermediate: ReactElement | string | boolean,
        attrs?: HTMLAttributes<HTMLDivElement>
    ) => {
        if (intermediate === false) {
            return null;
        }
        return (
            <div className={`${prefixCls}-intermediate`} {...attrs}>
                {
                    isString(intermediate)
                        ? <img src={intermediate} alt="intermediate" />
                        : intermediate
                }
            </div>
        );
    };

    return (
        <div ref={domRef} className={rootCls} style={wrapStyle}>
            {
                lazy && !initialize && (
                    <LazyDetector
                        onActive={() => {
                            setInitialize(true);
                        }}
                    />
                )
            }
            {
                fallback && isError
                    ? renderIntermediate(fallback, {role: 'fallback'})
                    : (
                        <img
                            role="image"
                            {...restProps}
                            src={src}
                            style={imgStyle}
                            width={width}
                            height={height}
                            className={cls}
                        />
                    )
            }
            {
                isLoading
                && placeholder
                && renderIntermediate(placeholder, {role: 'placeholder'})
            }
        </div>
    );
});


export {
    Image,
};

export type {
    ImageProps,
    ImageRef,
};
