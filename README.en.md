# React Frame

[简体中文](README.md)

A React frontend engineering learning project for exploring build, routing, state management, and test configuration. Dependencies include React 18, TypeScript, Webpack, Tailwind CSS, Jotai, MUI, and Web3 libraries.

> **Status: learning project.** Existing configuration is not evidence of a verified reusable template. This update documents source configuration only; installation, build, and tests were not run.

## Quick start

Prepare Node.js and npm. The repository does not pin a Node.js version; minimum compatibility is unverified.

```bash
git clone https://github.com/weiAX95/react-frame.git
cd react-frame
npm install
npm run client:serve
```

The development configuration uses port **3001**, hot reload, and history fallback. Page features may require additional application configuration; build scripts alone do not establish a ready-to-use product.

## Engineering details

- The [Webpack entry](webpack.config.js) merges development or production configuration according to `--mode`, with asset processing, CSS/PostCSS, and path aliases.
- [Development configuration](config/webpack.development.js) uses `src/index-dev.html`; [production configuration](config/webpack.production.js) uses `src/index-prod.html` and configures content hashes, code splitting, and minification.
- The compilation chain includes `ts-loader` and `swc-loader`. Jest is configured for tests; Cypress and BackstopJS are configured for end-to-end and visual regression experiments.
- Source directories include `components`, `hooks`, `pages`, `routes`, `states`, and `connectors`, with Web3 connection experiments.

## Verification

These scripts exist in `package.json`; their results were not verified during this update:

| Command | Purpose |
| --- | --- |
| `npm run client:dev` | Development compilation |
| `npm run client:serve` | Development server |
| `npm run client:prod` | Production build into dist |
| `npm run lint` | Source lint |
| `npm test` | Jest tests |
| `npm run test:coverage` | Coverage report |
| `npm run test:e2e:open` | Open Cypress |
| `npm run test:uidiff` | BackstopJS visual regression |

Inspect the page and browser console, then build artifacts and test reports. Test configuration does not establish passing tests.

## Known limitations

- `test:e2e:ci` references missing `dev` and `cypress:run` scripts and relies on `start-server-and-test`, which is not directly declared. It is not currently documented as a working CI command.
- Webpack CSS behavior depends on `NODE_ENV`, while configuration selection depends on `--mode`. Check their consistency before production builds.
- Dependencies, application environment variables, and wallet connection configuration need further review. Wallet operations and external services were not tested during this update.
- Package metadata states ISC. This document introduces no new license or production-readiness claims.

## Next steps

Clarify the example's use case, verify development/production configuration consistency, correct test scripts, and add a repeatable page demonstration.
