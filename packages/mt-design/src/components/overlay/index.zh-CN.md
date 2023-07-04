---
title: Overlay
demo:
  cols: 2
group:
  title: 反馈组件
  order: 5
---

# Overlay 遮罩层

<code src="./demos/base.tsx">基本使用</code>
<code src="./demos/duration.tsx" description="通过 duration 属性控制时长">时长控制</code>
<code src="./demos/background.tsx" description="通过 css 属性定义背景色">自定义背景色</code>
<code src="./demos/mount-enter.tsx">默认dom节点渲染场景</code>
<code src="./demos/render-container.tsx">渲染到其他节点中</code>
<code src="./demos/z-index.tsx">设置 zIndex</code>
<code src="./demos/force-render.tsx" description="
场景1: `forceRender: true` & `visible: false`, 会先渲染节点。<br />
场景2: `forceRender: true` & `visible: true` 会无动画渲染，如果该场景需要首屏动画，则设置 `firstAnimation: true` 即可。
">强行渲染</code>
<code src="./demos/lock-scroll.tsx">禁止滚动</code>
