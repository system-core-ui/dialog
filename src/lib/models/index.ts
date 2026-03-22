import type { ReactNode, ReactElement, HTMLAttributes, CSSProperties } from 'react';
import type { Placement } from '@floating-ui/react';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

export interface PortalProps {
  children: ReactNode;
  /** Container element to render portal into (default: document.body) */
  container?: Element | null;
}

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether modal is visible */
  open: boolean;
  /** Called when modal requests to close (ESC key, backdrop click) */
  onClose?: () => void;
  /** Modal content */
  children?: ReactNode;
  /** Preset size (default: 'sm') */
  size?: ModalSize;
  /** Custom width — overrides size preset width */
  width?: string | number;
  /** Custom height — overrides size preset height */
  height?: string | number;
  /** Disable backdrop click to close */
  disableBackdropClick?: boolean;
  /** Disable ESC key to close */
  disableEscapeKey?: boolean;
  /** Custom z-index (default: theme.zIndex.modal ?? 1300) */
  zIndex?: number;
  /** Keep modal mounted when closed (for transition preservation) */
  keepMounted?: boolean;
  /** Portal container */
  container?: Element | null;
}

export interface PopoverProps {
  /** Trigger element that opens the popover (required) */
  trigger: ReactElement;
  /** Popover content */
  children: ReactNode;

  // ─── Controlled / Uncontrolled ─────────────────────────
  /** Controlled: whether popover is open */
  open?: boolean;
  /** Uncontrolled: initial open state (default: false) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;

  // ─── Positioning ───────────────────────────────────────
  /** Placement relative to trigger (default: 'bottom') */
  placement?: Placement;
  /** Spacing between trigger and popover (default: 8) */
  offset?: number;
  /** Auto-flip when viewport overflows (default: true) */
  flip?: boolean;
  /** Show arrow pointing to trigger (default: false) */
  arrow?: boolean;
  /** Arrow fill color — defaults to 'currentColor' (inherits from content) */
  arrowFill?: string;
  /** Fixed width for popover — omit for auto */
  width?: number | string;
  /** Fixed height for popover — omit for auto */
  height?: number | string;

  // ─── Styling (pure wrapper) ────────────────────────────
  /** CSS class for popover wrapper */
  className?: string;
  /** Inline styles for popover wrapper */
  style?: CSSProperties;

  // ─── Behavior ──────────────────────────────────────────
  /** Dismiss on click outside (default: true) */
  dismissOnOutsidePress?: boolean;
  /** Dismiss on ESC key (default: true) */
  dismissOnEsc?: boolean;
  /** Custom z-index — should be higher than parent context (default: 1400) */
  zIndex?: number;
}

export interface TooltipProps {
  /** Trigger element that shows the tooltip on hover/focus (required) */
  trigger: ReactElement;
  /** Tooltip content — text or rich content */
  children: ReactNode;

  // ─── Controlled / Uncontrolled ─────────────────────────
  /** Controlled: whether tooltip is visible */
  open?: boolean;
  /** Uncontrolled: initial visibility (default: false) */
  defaultOpen?: boolean;
  /** Callback when visibility changes */
  onOpenChange?: (open: boolean) => void;

  // ─── Positioning ───────────────────────────────────────
  /** Placement relative to trigger (default: 'top') */
  placement?: Placement;
  /** Spacing between trigger and tooltip in px (default: 6) */
  offset?: number;
  /** Auto-flip when viewport overflows (default: true) */
  flip?: boolean;
  /** Show arrow pointing to trigger (default: true) */
  arrow?: boolean;
  /** Arrow fill color (default: 'currentColor') */
  arrowFill?: string;
  /** Fixed width for tooltip — omit for auto */
  width?: number | string;

  // ─── Styling (pure wrapper) ────────────────────────────
  /** CSS class for tooltip wrapper */
  className?: string;
  /** Inline styles for tooltip wrapper */
  style?: CSSProperties;

  // ─── Behavior ──────────────────────────────────────────
  /** Delay before showing (ms, default: 300) */
  openDelay?: number;
  /** Delay before hiding (ms, default: 150) */
  closeDelay?: number;
  /** Custom z-index (default: 1500) */
  zIndex?: number;
}

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether drawer is visible */
  open: boolean;
  /** Called when drawer requests to close (ESC key, backdrop click) */
  onClose?: () => void;
  /** Drawer content */
  children?: ReactNode;
  /** Side to slide in from (default: 'left') */
  placement?: DrawerPlacement;
  /** Drawer width — applies to left/right placement (default: 320) */
  width?: string | number;
  /** Drawer height — applies to top/bottom placement (default: 320) */
  height?: string | number;
  /** Disable backdrop click to close */
  disableBackdropClick?: boolean;
  /** Disable ESC key to close */
  disableEscapeKey?: boolean;
  /** Custom z-index (default: theme.zIndex.drawer ?? 1200) */
  zIndex?: number;
  /** Portal container */
  container?: Element | null;
}
