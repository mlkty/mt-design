import assignWith from 'lodash.assignwith';

function customizer(objValue: any, srcValue: any) {
    return srcValue === undefined ? objValue : srcValue;
}

export function mergeProps<A, B>(a: A, b: B): B & A;
export function mergeProps<A, B, C>(a: A, b: B, c: C): C & B & A;
export function mergeProps(...items: any[]) {
    let target = {...items[0]};

    for (let i = 1; i < items.length; i++) {
        target = assignWith(target, items[i], customizer);
    }
    return target;
}
