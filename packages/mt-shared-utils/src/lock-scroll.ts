import {resolveScrollContainer, type ScrollTargetType} from './resolve-scroll-container';

type LockFunction = (element: HTMLElement) => void;

class LockScroll {
    name: string;
    targets = new Map<Element, number>();

    constructor(name: string = 'default') {
        this.name = name;
    }

    bind(target?: ScrollTargetType) {
        const container = resolveScrollContainer(target);
        if (container) {
            const len = this.targets.get(container) || 0;
            this.targets.set(container, len + 1);
            if (len === 0) {
                const name = container.dataset.lockScroll || '';
                container.dataset.lockScroll = `${name} ${this.name}`;
            }
        }
    }

    unbind(target?: ScrollTargetType) {
        const container = resolveScrollContainer(target);
        if (!container) {
            return;
        }

        const len = this.targets.get(container) || 0;
        if (len > 1) {
            this.targets.set(container, len - 1);
            return;
        }

        this.targets.delete(container);

        if (container.dataset.lockScroll === undefined) {
            return;
        }

        const str = container.dataset.lockScroll.replace(` ${this.name}`, '');
        if (str.length === 0) {
            delete container.dataset.lockScroll;
        } else {
            container.dataset.lockScroll = str;
        }
    }
}

export {
    LockScroll,
};

export type {
    LockFunction,
};
