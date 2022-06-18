## 创建过程

+ `npm create vite@latest`，选择react-ts
+ [Tailwindcss按照cra的配置就行](https://tailwindcss.com/docs/guides/create-react-app)
  [我的习惯是把预设样式关掉](https://tailwindcss.com/docs/preflight#disabling-preflight)
+ `npm install sass`
+ 将react18降为react17

  ```
  npm uninstall react react-dom @types/react @types/react-dom --save
  npm install react@17 react-dom@17 @types/react@17 @types/react-dom@17 --save
  ```
  修改 `main.tsx`

  ```tsx
  import React from 'react'
  import ReactDOM from 'react-dom'
  import App from './App'
  import './index.css'

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')!
  )
  ```
+ `npm install @fluentui/react`
+ `npm install react-router-dom@6`
+ 安装axios、mockjs并封装，具体代码在 `src/api/index.ts`下，方便在写接口的时候顺便把mock数据也写了
+ 在 `vite.config.ts`中配置代理服务器
+ 集中式路由写在 `router/index`下
+ 权限判断组件放在 `utils/AccessControl.tsx`中
+ 安装recoil，把用户登录状态写在 `userState.ts`中
+ 2 b continued……
