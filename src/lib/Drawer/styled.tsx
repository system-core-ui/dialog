import { CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { ThemeSchema } from '@thanh-libs/theme';

import type { DrawerPlacement } from '../models';

import {
  ANIMATION_DURATION,
  BACKDROP_OPACITY,
  DRAWER_Z_INDEX,
  DRAWER_DEFAULT_SIZE,
} from '../constants';

import { normalizeUnit } from '../helpers';

// ─── Backdrop ──────────────────────────────────────────

interface DrawerBackdropProps {
  ownerZIndex?: number;
  ownerOpen: boolean;
}

export const DrawerBackdropStyled = styled.div<DrawerBackdropProps>(
  ({ ownerZIndex, ownerOpen }): CSSObject => {
    const { zIndex, palette }: ThemeSchema = useTheme();

    return {
      position: 'fixed',
      inset: 0,
      zIndex: ownerZIndex ?? zIndex?.drawer ?? DRAWER_Z_INDEX,
      backgroundColor:
        palette?.background?.overlay ?? `rgba(0, 0, 0, ${BACKDROP_OPACITY})`,
      opacity: ownerOpen ? 1 : 0,
      visibility: ownerOpen ? 'visible' : 'hidden',
      pointerEvents: ownerOpen ? 'auto' : 'none',
      transition: `opacity ${ANIMATION_DURATION}ms ease, visibility ${ANIMATION_DURATION}ms ease`,
    };
  },
);

// ─── Content ───────────────────────────────────────────

interface DrawerContentProps {
  ownerOpen: boolean;
  ownerPlacement: DrawerPlacement;
  ownerWidth?: string | number;
  ownerHeight?: string | number;
}

const PLACEMENT_STYLES: Record<DrawerPlacement, {
  position: CSSObject;
  closedTransform: string;
  openTransform: string;
  sizeProp: 'width' | 'height';
}> = {
  left: {
    position: { top: 0, left: 0, bottom: 0 },
    closedTransform: 'translateX(-100%)',
    openTransform: 'translateX(0)',
    sizeProp: 'width',
  },
  right: {
    position: { top: 0, right: 0, bottom: 0 },
    closedTransform: 'translateX(100%)',
    openTransform: 'translateX(0)',
    sizeProp: 'width',
  },
  top: {
    position: { top: 0, left: 0, right: 0 },
    closedTransform: 'translateY(-100%)',
    openTransform: 'translateY(0)',
    sizeProp: 'height',
  },
  bottom: {
    position: { bottom: 0, left: 0, right: 0 },
    closedTransform: 'translateY(100%)',
    openTransform: 'translateY(0)',
    sizeProp: 'height',
  },
};

export const DrawerContentStyled = styled.div<DrawerContentProps>(
  ({ ownerOpen, ownerPlacement, ownerWidth, ownerHeight }): CSSObject => {
    const { palette }: ThemeSchema = useTheme();
    const config = PLACEMENT_STYLES[ownerPlacement];

    const isHorizontal = ownerPlacement === 'left' || ownerPlacement === 'right';

    // Size: custom > default
    const size = isHorizontal
      ? normalizeUnit(ownerWidth ?? DRAWER_DEFAULT_SIZE)
      : normalizeUnit(ownerHeight ?? DRAWER_DEFAULT_SIZE);

    return {
      position: 'fixed',
      ...config.position,
      [config.sizeProp]: size,
      outline: 'none',
      boxSizing: 'border-box',
      overflowY: 'auto',
      backgroundColor: palette?.background?.paper ?? '#fff',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',

      // Animation
      transform: ownerOpen ? config.openTransform : config.closedTransform,
      transition: `transform ${ANIMATION_DURATION}ms ease`,
    };
  },
);
