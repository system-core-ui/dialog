import { useMemo, useRef } from 'react';

import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  arrow as arrowMiddleware,
  type Placement,
  type UseFloatingReturn,
  type Middleware,
} from '@floating-ui/react';

import { normalizeUnit } from '../helpers';

// ─── Types ───────────────────────────────────────────────

export interface UseFloatingPositionOptions {
  /** Whether the floating element is currently visible */
  open: boolean;
  /** Callback when open state should change */
  onOpenChange: (open: boolean) => void;

  /** Desired placement relative to reference (default: 'bottom') */
  placement?: Placement;

  /** Spacing between trigger and floating element in px (default: 8) */
  offset?: number;

  /**
   * Auto-flip to opposite side when not enough viewport space (default: true).
   * Set to `false` to lock the position.
   */
  flip?: boolean;

  /** Auto-shift along cross axis to stay in viewport (default: true) */
  shift?: boolean;

  /** Padding from viewport edge when shifting, in px (default: 8) */
  shiftPadding?: number;

  /** Enable arrow pointing to reference (default: false) */
  arrow?: boolean;

  /** Fixed width for floating element — omit for auto width */
  width?: number | string;

  /** Fixed height for floating element — omit for auto height */
  height?: number | string;
}

export interface UseFloatingPositionReturn {
  /** Ref setter for the trigger/reference element */
  setReference: UseFloatingReturn['refs']['setReference'];

  /** Ref setter for the floating element */
  setFloating: UseFloatingReturn['refs']['setFloating'];

  /** CSS styles to apply on the floating element (position, top, left, width?, height?) */
  floatingStyles: React.CSSProperties;

  /** Arrow ref — attach to FloatingArrow component */
  arrowRef: React.RefObject<SVGSVGElement | null>;

  /** Floating UI context — pass to interaction hooks (useClick, useHover, etc.) */
  context: UseFloatingReturn['context'];

  /** The actual resolved placement after flip/shift */
  placement: Placement;

  /** Whether the floating element is currently positioned */
  isPositioned: boolean;
}

// ─── Hook ────────────────────────────────────────────────

/**
 * Shared positioning hook for Popover and Tooltip.
 *
 * Wraps `@floating-ui/react` `useFloating` with a simplified API:
 * - Auto-flip when viewport overflows (disable with `flip: false`)
 * - Auto-shift along cross axis
 * - Arrow support
 * - Configurable offset (spacing from trigger)
 * - Optional fixed width/height
 * - Auto-update on scroll/resize
 *
 * @example
 * ```tsx
 * const { setReference, setFloating, floatingStyles, context } = useFloatingPosition({
 *   open: isOpen,
 *   onOpenChange: setIsOpen,
 *   placement: 'top',
 *   offset: 12,
 *   arrow: true,
 * });
 * ```
 */
export function useFloatingPosition(
  options: UseFloatingPositionOptions,
): UseFloatingPositionReturn {
  const {
    open,
    onOpenChange,
    placement: desiredPlacement = 'bottom',
    offset: offsetPx = 8,
    flip: enableFlip = true,
    shift: enableShift = true,
    shiftPadding = 8,
    arrow: enableArrow = false,
    width,
    height,
  } = options;

  const arrowRef = useRef<SVGSVGElement | null>(null);

  // Build middleware array based on options
  const middleware = useMemo<Middleware[]>(() => {
    const mw: Middleware[] = [];

    // Offset always first
    mw.push(offsetMiddleware(offsetPx));

    // Flip — auto reposition to opposite side when overflowing
    if (enableFlip) {
      mw.push(flipMiddleware());
    }

    // Shift — slide along cross axis to stay visible
    if (enableShift) {
      mw.push(shiftMiddleware({ padding: shiftPadding }));
    }

    // Arrow — track arrow position relative to reference
    if (enableArrow) {
      mw.push(arrowMiddleware({ element: arrowRef }));
    }

    return mw;
  }, [offsetPx, enableFlip, enableShift, shiftPadding, enableArrow]);

  const { refs, floatingStyles: baseFloatingStyles, context, placement, isPositioned } =
    useFloating({
      open,
      onOpenChange,
      placement: desiredPlacement,
      middleware,
      whileElementsMounted: autoUpdate,
    });

  // Merge fixed width/height into floating styles
  const floatingStyles = useMemo<React.CSSProperties>(() => {
    const styles: React.CSSProperties = { ...baseFloatingStyles };

    if (width !== undefined) {
      styles.width = normalizeUnit(width);
    }
    if (height !== undefined) {
      styles.height = normalizeUnit(height);
    }

    return styles;
  }, [baseFloatingStyles, width, height]);

  return {
    setReference: refs.setReference,
    setFloating: refs.setFloating,
    floatingStyles,
    arrowRef,
    context,
    placement,
    isPositioned,
  };
}
