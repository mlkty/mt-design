import 'intersection-observer';

import {resolveTargetElement} from '@mlkty/mt-shared-utils';
import {FC, useEffect, useRef} from 'react';


interface Props {
  onActive: () => void;
  options?: IntersectionObserverInit;
}

export const LazyDetector: FC<Props> = props => {
    const ref = useRef<HTMLDivElement>(null);
    const onActiveRef = useRef(props.onActive);
    const optionsRef = useRef(props.options);
    onActiveRef.current = props.onActive;
    optionsRef.current = props.options;

    useEffect(() => {
        const target = resolveTargetElement(ref);
        if (!target) {
            return;
        }
        const observer = new IntersectionObserver(
            entries => {
                for (const entry of entries) {
                    entry.isIntersecting && onActiveRef.current();
                }
            },
            {
                root: document,
                ...optionsRef.current,
            }
        );
        observer.observe(target);
        return () => {
            observer.disconnect();
        };
    }, []);

    return <div ref={ref} />;
};
