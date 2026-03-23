# @thanh-libs/dialog

Overlay & floating UI components for React — **Modal**, **Drawer**, **Popover**, **Tooltip**, and **Portal**, powered by [Floating UI](https://floating-ui.com/) and Emotion.

## Installation

```bash
npm install @thanh-libs/dialog
```

### Peer dependencies

```bash
npm install react react-dom @emotion/react @emotion/styled @thanh-libs/theme @thanh-libs/button @floating-ui/react
```

---

## Components

### Modal

Centered overlay dialog with backdrop, ESC/click-outside dismiss, and preset sizes.

```tsx
import { Modal } from '@thanh-libs/dialog';

<Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
  <h2>Confirm action</h2>
  <p>Are you sure you want to continue?</p>
</Modal>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Whether the modal is visible |
| `onClose` | `() => void` | — | Called on ESC key or backdrop click |
| `size` | `ModalSize` | `'sm'` | Preset size (see table below) |
| `width` | `string \| number` | — | Custom width — overrides size preset |
| `height` | `string \| number` | — | Custom height — overrides size preset |
| `disableBackdropClick` | `boolean` | `false` | Prevent closing on backdrop click |
| `disableEscapeKey` | `boolean` | `false` | Prevent closing on ESC key |
| `hideCloseButton` | `boolean` | `false` | Hide the built-in close button |
| `keepMounted` | `boolean` | `false` | Keep DOM mounted when closed |
| `zIndex` | `number` | `1300` | Custom z-index |
| `container` | `Element \| null` | `document.body` | Portal mount target |

Also accepts all native `<div>` HTML attributes.

#### Size presets

| Size | Width | Max Height |
|------|-------|------------|
| `xs` | 360px | 80dvh |
| `sm` | 480px | 80dvh |
| `md` | 640px | 85dvh |
| `lg` | 800px | 90dvh |
| `xl` | 1024px | 90dvh |
| `fullscreen` | 100dvw | 100dvh |

---

### Drawer

Slide-in panel from any edge with backdrop dismiss and configurable close button.

```tsx
import { Drawer } from '@thanh-libs/dialog';

<Drawer open={isOpen} onClose={() => setIsOpen(false)} placement="right" width={400}>
  <nav>Sidebar content</nav>
</Drawer>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Whether the drawer is visible |
| `onClose` | `() => void` | — | Called on ESC key or backdrop click |
| `placement` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Slide-in direction |
| `width` | `string \| number` | `320` | Panel width (left/right placement) |
| `height` | `string \| number` | `320` | Panel height (top/bottom placement) |
| `disableBackdropClick` | `boolean` | `false` | Prevent closing on backdrop click |
| `disableEscapeKey` | `boolean` | `false` | Prevent closing on ESC key |
| `closeButtonPlacement` | `'inside' \| 'outside' \| 'none'` | `'inside'` | Close button position |
| `zIndex` | `number` | `1200` | Custom z-index |
| `container` | `Element \| null` | `document.body` | Portal mount target |

Also accepts all native `<div>` HTML attributes.

---

### Popover

Click-triggered floating content anchored to a trigger element, with optional arrow.

```tsx
import { Popover } from '@thanh-libs/dialog';

<Popover trigger={<button>Open menu</button>} placement="bottom-start" arrow>
  <ul>
    <li>Option A</li>
    <li>Option B</li>
  </ul>
</Popover>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `ReactElement` | **(required)** | Element that opens the popover on click |
| `children` | `ReactNode` | **(required)** | Popover content |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — | Open state change callback |
| `placement` | `Placement` | `'bottom'` | Floating UI placement |
| `offset` | `number` | `8` | Spacing from trigger (px) |
| `flip` | `boolean` | `true` | Auto-flip on viewport overflow |
| `arrow` | `boolean` | `false` | Show arrow pointing to trigger |
| `arrowFill` | `string` | `'currentColor'` | Arrow fill color |
| `width` | `number \| string` | auto | Fixed popover width |
| `height` | `number \| string` | auto | Fixed popover height |
| `dismissOnOutsidePress` | `boolean` | `true` | Close on outside click |
| `dismissOnEsc` | `boolean` | `true` | Close on ESC key |
| `zIndex` | `number` | `1400` | Custom z-index |
| `className` | `string` | — | CSS class for wrapper |
| `style` | `CSSProperties` | — | Inline styles for wrapper |

---

### Tooltip

Hover/focus-triggered floating label with configurable delay and arrow.

```tsx
import { Tooltip } from '@thanh-libs/dialog';

<Tooltip trigger={<button>Hover me</button>} placement="top">
  This is a helpful hint
</Tooltip>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `ReactElement` | **(required)** | Element that shows tooltip on hover/focus |
| `children` | `ReactNode` | **(required)** | Tooltip content |
| `open` | `boolean` | — | Controlled visibility |
| `defaultOpen` | `boolean` | `false` | Initial visibility (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — | Visibility change callback |
| `placement` | `Placement` | `'top'` | Floating UI placement |
| `offset` | `number` | `6` | Spacing from trigger (px) |
| `flip` | `boolean` | `true` | Auto-flip on viewport overflow |
| `arrow` | `boolean` | `true` | Show arrow pointing to trigger |
| `arrowFill` | `string` | `'currentColor'` | Arrow fill color |
| `width` | `number \| string` | auto | Fixed tooltip width |
| `openDelay` | `number` | `300` | Delay before showing (ms) |
| `closeDelay` | `number` | `150` | Delay before hiding (ms) |
| `zIndex` | `number` | `1500` | Custom z-index |
| `className` | `string` | — | CSS class for wrapper |
| `style` | `CSSProperties` | — | Inline styles for wrapper |

---

### Portal

Renders children into a DOM node outside the parent hierarchy.

```tsx
import { Portal } from '@thanh-libs/dialog';

<Portal container={document.getElementById('portal-root')}>
  <div>Rendered outside parent DOM tree</div>
</Portal>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **(required)** | Content to portal |
| `container` | `Element \| null` | `document.body` | Target DOM element |

---

## Hooks

### useFloatingPosition

Low-level positioning hook wrapping `@floating-ui/react`. Used internally by Popover and Tooltip — export it for custom floating components.

```tsx
import { useFloatingPosition } from '@thanh-libs/dialog';

const { setReference, setFloating, floatingStyles, arrowRef, context } = useFloatingPosition({
  open: isOpen,
  onOpenChange: setIsOpen,
  placement: 'bottom',
  offset: 12,
  arrow: true,
});

return (
  <>
    <button ref={setReference}>Anchor</button>
    {isOpen && (
      <div ref={setFloating} style={floatingStyles}>
        Floating content
      </div>
    )}
  </>
);
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `open` | `boolean` | — | Whether floating element is visible |
| `onOpenChange` | `(open: boolean) => void` | — | Open state callback |
| `placement` | `Placement` | `'bottom'` | Desired placement |
| `offset` | `number` | `8` | Spacing from reference (px) |
| `flip` | `boolean` | `true` | Auto-flip on overflow |
| `shift` | `boolean` | `true` | Auto-shift along cross axis |
| `shiftPadding` | `number` | `8` | Padding from viewport edge (px) |
| `arrow` | `boolean` | `false` | Enable arrow positioning |
| `width` | `number \| string` | auto | Fixed floating element width |
| `height` | `number \| string` | auto | Fixed floating element height |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `setReference` | `ref setter` | Attach to the trigger/anchor element |
| `setFloating` | `ref setter` | Attach to the floating element |
| `floatingStyles` | `CSSProperties` | Position styles for floating element |
| `arrowRef` | `RefObject<SVGSVGElement>` | Pass to `FloatingArrow` |
| `context` | `FloatingContext` | Floating UI context for interaction hooks |
| `placement` | `Placement` | Resolved placement after flip/shift |
| `isPositioned` | `boolean` | Whether positioning is computed |

## Theming

Wrap your app with `ThemeProvider` from `@thanh-libs/theme`:

```tsx
import { ThemeProvider } from '@thanh-libs/theme';
import { Modal, Drawer } from '@thanh-libs/dialog';

<ThemeProvider>
  <Modal open={open} onClose={onClose}>Content</Modal>
  <Drawer open={open} onClose={onClose}>Sidebar</Drawer>
</ThemeProvider>
```

## z-index layering

| Component | Default z-index |
|-----------|----------------|
| Drawer | 1200 |
| Modal | 1300 |
| Popover | 1400 |
| Tooltip | 1500 |

All components accept a `zIndex` prop to customize.

## License

MIT
