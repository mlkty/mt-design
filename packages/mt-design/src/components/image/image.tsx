import {c} from '@mlkty/mt-shared-utils';
import {
    forwardRef,
    useImperativeHandle,
    useRef,
    type CSSProperties,
    type ReactElement,
    type ImgHTMLAttributes,
    useState,
    useEffect,
    HTMLAttributes,
} from 'react';

import {useConfigContext} from '../config-provider';
import {isValidImage} from './utils';

type ImageStatus = 'loading' | 'error' | 'success';

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder' | 'onLoad' | 'onError'> & {
    width?: string | number;
    height?: string | number;

    rootClassName?: string;
    rootStyle?: CSSProperties;
    fallback?: ReactElement | string;
    placeholder?: ReactElement | string;

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
        placeholder,
        fallback,

        // style
        rootClassName,
        rootStyle,
        className,
        style,
        width,
        height,

        // events
        onLoad,
        onError,
        ...restProps
    } = props;

    const domRef = useRef<HTMLDivElement>(null!);
    const prevSrcRef = useRef<ImageProps['src']>();

    const [status, setStatus] = useState<ImageStatus>('loading');
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
        if (prevSrcRef.current !== imgSrc) {
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
    }, [imgSrc]);

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
        height, // to compat img default placeholder
    };

    const isError = status === 'error';
    const isSuccess = status === 'success';
    const isLoading = status === 'loading';

    const src = isSuccess ? imgSrc : '';

    const renderIntermediate = (intermediate: ReactElement | string, attrs?: HTMLAttributes<HTMLDivElement>) => {
        return (
            <div className={`${prefixCls}-intermediate`} {...attrs}>
                {
                    typeof intermediate === 'string'
                        ? <img src={intermediate} alt="intermediate" />
                        : intermediate
                }
            </div>
        );
    };

    return (
        <div ref={domRef} className={rootCls} style={wrapStyle}>
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
