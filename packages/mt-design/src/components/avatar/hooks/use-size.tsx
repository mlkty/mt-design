
export type Size = 'small' | 'middle' | 'large' | number;

const sizeMap: Record<string, number> = {
    small: 24,
    middle: 32,
    large: 40,
};

export const useSize = (size: Size) => {
    if (sizeMap[size]) {
        return sizeMap[size];
    }

    return size as number | string;
};
