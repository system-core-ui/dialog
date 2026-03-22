import {
  useState,
  useCallback,
  cloneElement,
  type ReactElement,
} from 'react';

import {
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
} from '@floating-ui/react';

import type { TooltipProps } from '../models';

import { useFloatingPosition } from '../hooks';

/**
 * Tooltip — lightweight floating label triggered by hover/focus.
 *
 * Features:
 * - Controlled (`open` + `onOpenChange`) or uncontrolled (`defaultOpen`)
 * - Uses FloatingPortal — works correctly inside Modal, Drawer, or Popovers
 * - Hover + focus trigger with configurable open/close delay
 * - Auto-flip when viewport overflows
 * - Optional arrow indicator
 * - Pure wrapper — no visual styling, bring your own className/style
 * - WCAG: role="tooltip"
 *
 * @example
 * ```tsx
 * <Tooltip trigger={<button>Hover me</button>} placement="top" arrow>
 *   This is a tooltip
 * </Tooltip>
 * ```
 */
export const Tooltip = ({
  trigger,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange: controlledOnOpenChange,
  placement = 'top',
  offset: offsetPx = 6,
  flip: enableFlip = true,
  arrow: enableArrow = true,
  arrowFill = 'currentColor',
  width,
  className,
  style,
  openDelay = 300,
  closeDelay = 150,
  zIndex = 1500,
}: TooltipProps) => {
  // ─── Controlled / Uncontrolled state ─────────────────

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      controlledOnOpenChange?.(nextOpen);
    },
    [isControlled, controlledOnOpenChange],
  );

  // ─── Floating position ──────────────────────────────

  const {
    setReference,
    setFloating,
    floatingStyles,
    arrowRef,
    context,
  } = useFloatingPosition({
    open: isOpen,
    onOpenChange: handleOpenChange,
    placement,
    offset: offsetPx,
    flip: enableFlip,
    arrow: enableArrow,
    width,
  });

  // ─── Interactions ───────────────────────────────────

  const hover = useHover(context, {
    delay: { open: openDelay, close: closeDelay },
    move: false,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  // ─── Render trigger ────────────────────────────────

  const triggerElement = cloneElement(trigger as ReactElement<Record<string, unknown>>, {
    ref: setReference,
    ...getReferenceProps(),
  });

  // ─── Render ────────────────────────────────────────

  return (
    <>
      {triggerElement}

      {isOpen && (
        <FloatingPortal>
          <div
            ref={setFloating}
            style={{ ...floatingStyles, zIndex, ...style }}
            className={className}
            {...getFloatingProps()}
          >
            {children}
            {enableArrow && (
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill={arrowFill}
              />
            )}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
