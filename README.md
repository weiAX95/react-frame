# React Frame

[English](README.en.md)

React 前端工程化学习项目，用于阅读和实验构建、路由、状态管理与测试配置。依赖包含 React 18、TypeScript、Webpack、Tailwind CSS、Jotai、MUI 与 Web3 相关库。

> **状态：学习项目。** 现有配置不代表已验证的通用模板。本次仅根据源码整理使用说明，未运行安装、构建或测试。

## 快速开始

准备 Node.js 与 npm；仓库未固定 Node.js 版本，最低兼容版本尚未验证。

```bash
git clone https://github.com/weiAX95/react-frame.git
cd react-frame
npm install
npm run client:serve
```

开发配置使用端口 **3001**，支持热更新与路由历史回退。页面功能可能需要额外业务配置，不能由构建脚本推断为可直接使用的成品。

## 工程细节

- [Webpack 入口](webpack.config.js) 根据 `--mode` 合并开发或生产配置，提供资源处理、CSS / PostCSS 与路径别名。
- [开发配置](config/webpack.development.js) 使用 `src/index-dev.html`；[生产配置](config/webpack.production.js) 使用 `src/index-prod.html`，包含内容哈希、代码分割和压缩配置。
- 编译链包含 `ts-loader` 与 `swc-loader`；Jest 配置用于测试，Cypress 与 BackstopJS 配置用于端到端和视觉回归实验。
- 源码按 `components`、`hooks`、`pages`、`routes`、`states`、`connectors` 等目录组织，包含 Web3 连接相关实验。

## 验证方式

以下脚本存在于 `package.json`，运行结果尚未在本次整理中验证：

| 命令 | 用途 |
| --- | --- |
| `npm run client:dev` | 开发模式编译 |
| `npm run client:serve` | 启动开发服务器 |
| `npm run client:prod` | 生产模式构建，输出到 dist |
| `npm run lint` | 源码检查 |
| `npm test` | Jest 测试 |
| `npm run test:coverage` | 覆盖率报告 |
| `npm run test:e2e:open` | 打开 Cypress |
| `npm run test:uidiff` | BackstopJS 视觉回归 |

检查页面与浏览器控制台，再核对构建产物和测试报告；测试配置的存在不代表测试通过。

## 已知限制

- `test:e2e:ci` 引用了未定义的 `dev` 与 `cypress:run` 脚本，并依赖未直接声明的 `start-server-and-test`；当前不能视为可用的 CI 命令。
- Webpack 的 CSS 开发 / 生产分支依据 `NODE_ENV`，模式选择依据 `--mode`；生产运行前需要检查两者是否一致。
- 部分依赖、业务环境变量和钱包连接配置仍需逐项核实。本次未验证钱包操作或外部服务。
- npm 包元信息标注 ISC；本文不新增许可证或生产可用声明。

## 后续改进

厘清项目示例用途，验证开发与生产配置一致性，修正测试脚本，并补充可重复的页面演示。
