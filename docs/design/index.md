---
title: 介绍
order: 0
nav:
    title: 设计
---

# 背景
为了解决 SO 方向上组件库不统一问题，并提供一系列专属解决方案而衍生的组件库。

# CSS 变量方案

我们采用 css 变量的方式构建组件。因此，设置如下 babel 配置,为了最大兼容性, 为 iOS Safari `>= 10` 和 Chrome `>= 49`：
```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "chrome": "49",
                    "ios": "10"
                }
            }
        ]
    ]
}
```

# 设计资源

待补充

# 前端实现
我们参与 [React](https://react.dev/) 方式实现。

# 如何贡献
我们欢迎任何形式的贡献，有任何建议或意见，请给我们。
