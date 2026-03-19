# @thanhdq/dialog

Modal and Portal components for System Core UI.

## Installation

```bash
yarn add @thanhdq/dialog
```

## Usage

```tsx
import { Modal } from '@thanhdq/dialog';
import type { ModalSize } from '@thanhdq/dialog';

<Modal open={isOpen} onClose={handleClose} size="md">
  <div>Modal content</div>
</Modal>
```

## Size Presets

| Size | Width | Max Height |
|------|-------|------------|
| xs | 360px | 80dvh |
| sm (default) | 480px | 80dvh |
| md | 640px | 85dvh |
| lg | 800px | 90dvh |
| xl | 1024px | 90dvh |
| fullscreen | 100dvw | 100dvh |

Custom dimensions: use `width` and `height` props to override presets.

## Running unit tests

Run `nx test @thanhdq/dialog` to execute the unit tests via [Vitest](https://vitest.dev/).
