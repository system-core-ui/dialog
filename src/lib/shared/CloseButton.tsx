import { CSSProperties } from 'react';

import { IconButton } from '@thanh-libs/button';

import type { DrawerPlacement } from '../models';

import { DRAWER_DEFAULT_SIZE } from '../constants';

/**
 * Internal close button (✕) for Modal & Drawer.
 * Uses IconButton from @thanh-libs/button instead of custom styled component.
 * Always renders above content via z-index.
 */

/** SVG close icon — no external icon dependency */
export const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

CloseIcon.displayName = 'CloseIcon';

// ─── Position helpers ────────────────────────────────────

/** Compute fixed position for the outside close button based on drawer placement */
const getFixedPosition = (
  placement: DrawerPlacement,
  drawerSize: string | number,
): CSSProperties => {
  const size = typeof drawerSize === 'number' ? `${drawerSize}px` : drawerSize;

  switch (placement) {
    case 'left':
      return { top: 8, left: `calc(${size} + 8px)` };
    case 'right':
      return { top: 8, right: `calc(${size} + 8px)` };
    case 'top':
      return { top: `calc(${size} + 8px)`, right: 8 };
    case 'bottom':
      return { bottom: `calc(${size} + 8px)`, right: 8 };
  }
};

// ─── Close Button Component ─────────────────────────────

interface CloseButtonProps {
  onClick: () => void;
  /** Use fixed positioning (for drawer outside mode) */
  fixed?: boolean;
  /** Drawer placement (used with fixed to compute position) */
  placement?: DrawerPlacement;
  /** Drawer size (used with fixed to compute position) */
  drawerSize?: string | number;
}

export const CloseButton = ({ onClick, fixed, placement, drawerSize }: CloseButtonProps) => {
  const positionStyle: CSSProperties = fixed && placement
    ? {
        position: 'fixed',
        zIndex: 1,
        ...getFixedPosition(placement, drawerSize ?? DRAWER_DEFAULT_SIZE),
      }
    : {
        position: 'absolute',
        zIndex: 1,
        top: 8,
        right: 8,
      };

  return (
    <div style={positionStyle}>
      <IconButton
        size="sm"
        variant="ghost"
        color="secondary"
        onClick={onClick}
        aria-label="Close"
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};

CloseButton.displayName = 'CloseButton';
