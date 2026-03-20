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
