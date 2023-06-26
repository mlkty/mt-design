# @mlkty/mt-shared-utils

这是 `@mlkty` 下的工具库提供了一系例的基础能力。

目前提供的能力如下:

- `isDomEnv`
- `isType`
  - `isUndefined`
  - `isNull`
  - `isString`
  - `isArray`
  - `isBool`
  - `isFunction`
- `mergeProps`
- `withNativeProps`
- `useControlled`
- `useEvent`
- `useLayoutEffect`

## 使用方式

```ts
import { isDomEnv } from '@mlkty/mt-shared-utils';

isDomEnv(); // 是否含有 DOM 环境
// ...
```
