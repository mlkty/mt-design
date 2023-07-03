
export type ResolveContainerType = (() => HTMLElement) | HTMLElement | null;

export function resolveContainer(container?: ResolveContainerType) {
    if (container instanceof Element) {
        return container;
    }
    if (typeof container === 'function') {
        return container();
    }
    return null;
}
