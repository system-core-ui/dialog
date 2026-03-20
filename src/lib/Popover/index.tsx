import {
  useState,
  useCallback,
  useEffect,
  cloneElement,
  type ReactElement,
} from 'react';

import {
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
} from '@floating-ui/react';

import type { PopoverProps } from '../models';

import { useFloatingPosition } from '../hooks';
import { queuePopoverDismiss, wasPopoverDismiss } from '../helpers';

/**
 * Popover — floating content panel triggered by click.
 *
 * Features:
 * - Controlled (`open` + `onOpenChange`) or uncontrolled (`defaultOpen`)
 * - Uses FloatingPortal — works correctly inside Modal, Drawer, or nested Popovers
 * - Click outside to dismiss — does NOT bubble to parent (Modal stays open)
 * - ESC to dismiss — does NOT bubble to parent (Modal stays open)
 * - Auto-flip when viewport overflows
 * - Optional arrow indicator
 * - Pure wrapper — no visual styling, bring your own className/style
 * - WCAG: role="dialog"
 *
 * @example
 * ```tsx
 * <Popover trigger={<button>Open Menu</button>} placement="bottom-start" arrow>
 *   <MyMenuContent />
 * </Popover>
 * ```
 */
export const Popover = ({
  trigger,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange: controlledOnOpenChange,
  placement = 'bottom',
  offset: offsetPx = 8,
  flip: enableFlip = true,
  arrow: enableArrow = false,
  arrowFill = 'currentColor',
  width,
  height,
  className,
  style,
  dismissOnOutsidePress = true,
  dismissOnEsc = true,
  zIndex = 1400,
}: PopoverProps) => {
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

  // Guard against floating-ui interactions (e.g. useClick) toggling
  // this Popover closed right after a child Popover was dismissed.
  // wasPopoverDismiss() returns true for ~200ms after any Popover dismiss.
  const guardedOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen && wasPopoverDismiss()) return;
      handleOpenChange(nextOpen);
    },
    [handleOpenChange],
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
    onOpenChange: guardedOpenChange,
    placement,
    offset: offsetPx,
    flip: enableFlip,
    arrow: enableArrow,
    width,
    height,
  });

  // ─── Interactions ───────────────────────────────────

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    // We handle both outsidePress and ESC ourselves to prevent
    // event bubbling to parent Modal/Drawer/Popover
    outsidePress: false,
    escapeKey: false,
    bubbles: false,
  });
  const role = useRole(context, { role: 'dialog' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  // ─── ESC — manual handler with stopImmediatePropagation ─
  // We handle ESC ourselves instead of useDismiss so we can
  // stopImmediatePropagation — prevents parent Modal/Drawer
  // from also closing when ESC is pressed.

  useEffect(() => {
    if (!isOpen || !dismissOnEsc) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation();
        handleOpenChange(false);
      }
    };

    // Capture phase — fires before Modal's bubble-phase listener
    document.addEventListener('keydown', handleEsc, true);
    return () => document.removeEventListener('keydown', handleEsc, true);
  }, [isOpen, dismissOnEsc, handleOpenChange]);

  // ─── Outside press — manual handler ─────────────────
  // Uses queuePopoverDismiss + markPopoverDismiss so that:
  // 1. Modal's backdrop onClick checks wasPopoverDismiss() and skips closing
  // 2. Parent Popover's guardedOpenChange blocks useClick toggle after child dismiss

  useEffect(() => {
    if (!isOpen || !dismissOnOutsidePress) return;

    const handleOutsidePress = (event: MouseEvent) => {
      const floating = context.refs.floating.current;
      const reference = context.refs.domReference.current;

      // Click inside floating or trigger → ignore
      if (floating?.contains(event.target as Node)) return;
      if (reference?.contains(event.target as Node)) return;

      // Queue dismiss — coordinates with nested Popovers and Modal
      queuePopoverDismiss(() => handleOpenChange(false));
    };

    document.addEventListener('mousedown', handleOutsidePress, true);
    return () => document.removeEventListener('mousedown', handleOutsidePress, true);
  }, [isOpen, dismissOnOutsidePress, handleOpenChange, context.refs.floating, context.refs.domReference]);

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
