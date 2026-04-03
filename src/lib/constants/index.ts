import { pxToRem } from '@thanh-libs/utils';
import type { ModalSize } from '../models';

/** Default z-index for modal overlay (matches theme.zIndex.modal) */
export const DEFAULT_Z_INDEX = 1300;

/** Animation duration in ms (Material Design standard) */
export const ANIMATION_DURATION = 225;

/** Backdrop overlay opacity */
export const BACKDROP_OPACITY = 0.5;

/** Size presets for modal content (uses dvh/dvw for mobile viewport support) */
export const MODAL_SIZES: Record<ModalSize, { width: string; maxHeight: string }> = {
  xs:         { width: pxToRem(360),  maxHeight: '80dvh' },
  sm:         { width: pxToRem(480),  maxHeight: '80dvh' },
  md:         { width: pxToRem(640),  maxHeight: '85dvh' },
  lg:         { width: pxToRem(800),  maxHeight: '90dvh' },
  xl:         { width: pxToRem(1024), maxHeight: '90dvh' },
  fullscreen: { width: '100dvw', maxHeight: '100dvh' },
};

/** Default width/height for Drawer panels */
export const DRAWER_DEFAULT_SIZE = 320;

/** Default z-index for Drawer (below Modal) */
export const DRAWER_Z_INDEX = 1200;
