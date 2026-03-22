import { useCallback, useEffect, useRef } from 'react';

import type { DrawerProps } from '../models';

import { trapFocus, wasPopoverDismiss } from '../helpers';

import { DrawerBackdropStyled, DrawerContentStyled } from './styled';

import { Portal } from '../Portal';

/**
 * Drawer — slide-in panel anchored to a screen edge.
 *
 * Features:
 * - Portal rendering (avoids overflow/z-index issues)
 * - Backdrop click to close
 * - ESC key to close
 * - Focus trap (WCAG 2.2 — SC 2.4.3)
 * - aria-modal + role="dialog" (WCAG 2.2 — SC 4.1.2)
 * - Body scroll lock when open
 * - Slide animation from left/right/top/bottom
 * - keepMounted option for animation support
 * - Works safely nested inside Modal or other Drawers
 *
 * @example
 * ```tsx
 * <Drawer open={open} onClose={handleClose} placement="right" width={400}>
 *   <DrawerContent />
 * </Drawer>
 * ```
 */
export const Drawer = ({
  open,
  onClose,
  children,
  placement = 'left',
  width,
  height,
  disableBackdropClick = false,
  disableEscapeKey = false,
  zIndex,
  container,
  ...rest
}: DrawerProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // ESC key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableEscapeKey) {
        e.stopPropagation();
        onClose?.();
      }
    },
    [disableEscapeKey, onClose],
  );

  // Backdrop click handler
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Only close if clicking the backdrop itself, not its children
      if (e.target !== e.currentTarget || disableBackdropClick) return;

      // If a child Popover already handled this event chain, skip
      if (wasPopoverDismiss()) return;

      onClose?.();
    },
    [disableBackdropClick, onClose],
  );

  // Focus trap, body scroll lock, ESC key
  useEffect(() => {
    if (!open) return;

    // Save current focus to restore later
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // ESC key listener
    document.addEventListener('keydown', handleKeyDown);

    // Focus trap
    let cleanupTrap: (() => void) | undefined;
    const content = contentRef.current;
    if (content) {
      // Auto-focus content
      const timer = requestAnimationFrame(() => {
        content.focus();
      });

      cleanupTrap = trapFocus(content);

      return () => {
        cancelAnimationFrame(timer);
        cleanupTrap?.();
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;

        // Restore focus
        previousFocusRef.current?.focus();
      };
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open, handleKeyDown]);

  // Always render the shell so CSS slide transitions work.
  // Only render children content when open.

  return (
    <Portal container={container}>
      <DrawerBackdropStyled
        ownerZIndex={zIndex}
        ownerOpen={open}
        onClick={handleBackdropClick}
        {...rest}
      >
        <DrawerContentStyled
          ref={contentRef}
          ownerOpen={open}
          ownerPlacement={placement}
          ownerWidth={width}
          ownerHeight={height}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          {open && children}
        </DrawerContentStyled>
      </DrawerBackdropStyled>
    </Portal>
  );
};

Drawer.displayName = 'Drawer';
