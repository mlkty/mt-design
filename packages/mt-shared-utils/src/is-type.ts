/**
 * 常用类型判断
 */
export const isUndefined = (obj: any): obj is undefined =>
  typeof obj === 'undefined';
export const isNull = (obj: any): obj is null => obj === null;
export const isString = (obj: any): obj is string => typeof obj === 'string';
export const isArray = Array.isArray;
export const isBool = (obj: any): obj is string => typeof obj === 'boolean';
export const isFunction = (value: any): value is (...args: any[]) => any =>
  typeof value === 'function';
