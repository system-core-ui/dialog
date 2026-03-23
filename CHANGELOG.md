# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.2](https://github.com/qthan1004/react-lib-workspace/compare/v0.0.2-alpha.0...v0.0.2) (2026-03-23)

### 0.0.2-alpha.0 (2026-03-23)


### ⚠ BREAKING CHANGES

* **dialog:** add Popover component with dismiss isolation for Modal and nested Popovers

### Features

* **dialog:** add built-in close button for Modal and Drawer ([148c690](https://github.com/qthan1004/react-lib-workspace/commit/148c6900d1d57265d40a6f5743b3c429f8a9f7d6))
* **dialog:** add Popover component with dismiss isolation for Modal and nested Popovers ([1a56e47](https://github.com/qthan1004/react-lib-workspace/commit/1a56e475f00268475fc7f99cf8afa5440609a140))
* **dialog:** add Tooltip and Drawer components ([a348478](https://github.com/qthan1004/react-lib-workspace/commit/a348478ea282ccb9e8427203d1010c0124389d77))
* **dialog:** initial commit ([b08e3d0](https://github.com/qthan1004/react-lib-workspace/commit/b08e3d0121afb50d247849d2d014c17d4ebf7747))
* **stories:** add Playground stories for Drawer and Tooltip, fix Placements slide animation ([5c9eef1](https://github.com/qthan1004/react-lib-workspace/commit/5c9eef166d49773c8c537d6f4af3b85f3b2ba4ac))


### Bug Fixes

* add --passWithNoTests to vitest prerelease hook ([21dcedd](https://github.com/qthan1004/react-lib-workspace/commit/21dcedd78a55cfbd8946e17f1c3d39b197ab1244))
* add all peer deps to devDependencies for CI ([6733d1a](https://github.com/qthan1004/react-lib-workspace/commit/6733d1a415f5821728e5d9d282247d30200a8e26))
* add devDependencies for standalone CI builds ([bf839ec](https://github.com/qthan1004/react-lib-workspace/commit/bf839ec615e6baae4284f1097d11faa6a9a086f1))
* add missing test dependencies for CI ([8f4f918](https://github.com/qthan1004/react-lib-workspace/commit/8f4f9186d588293015dc0c1e5f4b3d4d8f5b959d))
* button mock renders real button elements for test compatibility ([e01fcb3](https://github.com/qthan1004/react-lib-workspace/commit/e01fcb38ffc3a417dc0eb167825d2a2a21d4ce5f))
* **dialog:** WCAG 2.2 compliance - Popover displayName, Tooltip hoverable content ([4580a4a](https://github.com/qthan1004/react-lib-workspace/commit/4580a4af37bfd8ba081c6d1a6189a9f5fa1bdfa2))
* externalize [@thanh-libs](https://github.com/thanh-libs) packages in vitest config for CI ([2e52d3e](https://github.com/qthan1004/react-lib-workspace/commit/2e52d3e4582460b12afba8801978a0a8d20d5756))
* mock @thanh-libs/button in test setup for CI compatibility ([8d8193b](https://github.com/qthan1004/react-lib-workspace/commit/8d8193bacf039ac8ef12483f3bb7569947d374f5))
* standalone tsconfig, add jsdom and passWithNoTests for CI ([2926145](https://github.com/qthan1004/react-lib-workspace/commit/2926145230e746ef95cbe0cc408d6fad518add72))
* standalone tsconfig.storybook for CI ([007c783](https://github.com/qthan1004/react-lib-workspace/commit/007c783ffd773268358103569e0411987f4acdc4))
* use server.deps.external for vitest jsdom environment ([b7f47ef](https://github.com/qthan1004/react-lib-workspace/commit/b7f47ef13d61502b970353c57bfeae91358cb9cb))
* use vitest alias for @thanh-libs/button mock in CI ([afd1701](https://github.com/qthan1004/react-lib-workspace/commit/afd17017be486d0e10dd93346233944e5e8e8e0e))
* use wildcard versions for internal [@thanh-libs](https://github.com/thanh-libs) packages ([9aa567d](https://github.com/qthan1004/react-lib-workspace/commit/9aa567d3e2c47402c8775b715f1b05b1621bcae6))
