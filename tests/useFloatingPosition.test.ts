import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock @floating-ui/react to avoid Vite 7 SSR transform issue (__vite_ssr_exportName__)
vi.mock('@floating-ui/react', () => {
  const mockContext = {
    open: false,
    onOpenChange: vi.fn(),
    dataRef: { current: {} },
    events: { emit: vi.fn(), on: vi.fn(), off: vi.fn() },
    elements: { reference: null, floating: null },
    floatingId: 'mock-id',
    nodeId: undefined,
    refs: {
      setReference: vi.fn(),
      setFloating: vi.fn(),
      reference: { current: null },
      floating: { current: null },
      domReference: { current: null },
    },
  };

  return {
    useFloating: vi.fn((opts?: { placement?: string; open?: boolean }) => ({
      refs: {
        setReference: vi.fn(),
        setFloating: vi.fn(),
      },
      floatingStyles: { position: 'absolute' as const, top: 0, left: 0 },
      context: {
        ...mockContext,
        open: opts?.open ?? false,
        onOpenChange: vi.fn(),
      },
      placement: opts?.placement ?? 'bottom',
      isPositioned: false,
    })),
    autoUpdate: vi.fn(),
    offset: vi.fn((n: number) => ({ name: 'offset', options: n })),
    flip: vi.fn(() => ({ name: 'flip', options: {} })),
    shift: vi.fn((opts?: { padding?: number }) => ({
      name: 'shift',
      options: opts,
    })),
    arrow: vi.fn((opts?: { element?: unknown }) => ({
      name: 'arrow',
      options: opts,
    })),
  };
});

// eslint-disable-next-line import/first
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
} from '@floating-ui/react';

// eslint-disable-next-line import/first
import { useFloatingPosition } from '../src/lib/hooks/useFloatingPosition';

// ─── Helpers ─────────────────────────────────────────────

const defaultOptions = {
  open: false,
  onOpenChange: vi.fn(),
};

// ─── Tests ───────────────────────────────────────────────

describe('useFloatingPosition', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── Return shape ──────────────────────────────────────

  it('returns all required properties', () => {
    const { result } = renderHook(() => useFloatingPosition(defaultOptions));

    expect(result.current).toHaveProperty('setReference');
    expect(result.current).toHaveProperty('setFloating');
    expect(result.current).toHaveProperty('floatingStyles');
    expect(result.current).toHaveProperty('arrowRef');
    expect(result.current).toHaveProperty('context');
    expect(result.current).toHaveProperty('placement');
    expect(result.current).toHaveProperty('isPositioned');
  });

  it('setReference and setFloating are functions', () => {
    const { result } = renderHook(() => useFloatingPosition(defaultOptions));

    expect(typeof result.current.setReference).toBe('function');
    expect(typeof result.current.setFloating).toBe('function');
  });

  it('floatingStyles has position: absolute', () => {
    const { result } = renderHook(() => useFloatingPosition(defaultOptions));

    expect(result.current.floatingStyles.position).toBe('absolute');
  });

  // ─── Placement ─────────────────────────────────────────

  it('defaults placement to "bottom"', () => {
    renderHook(() => useFloatingPosition(defaultOptions));

    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({ placement: 'bottom' }),
    );
  });

  it('passes custom placement to useFloating', () => {
    renderHook(() =>
      useFloatingPosition({ ...defaultOptions, placement: 'top-start' }),
    );

    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({ placement: 'top-start' }),
    );
  });

  // ─── Middleware — offset ───────────────────────────────

  it('applies offset(8) by default', () => {
    renderHook(() => useFloatingPosition(defaultOptions));

    expect(offset).toHaveBeenCalledWith(8);
  });

  it('applies custom offset value', () => {
    renderHook(() =>
      useFloatingPosition({ ...defaultOptions, offset: 16 }),
    );

    expect(offset).toHaveBeenCalledWith(16);
  });

  it('applies zero offset', () => {
    renderHook(() =>
      useFloatingPosition({ ...defaultOptions, offset: 0 }),
    );

    expect(offset).toHaveBeenCalledWith(0);
  });

  // ─── Middleware — flip ─────────────────────────────────

  it('enables flip by default', () => {
    renderHook(() => useFloatingPosition(defaultOptions));

    expect(flip).toHaveBeenCalled();
  });

  it('disables flip when flip: false (fixed position)', () => {
    vi.mocked(flip).mockClear();

    renderHook(() =>
      useFloatingPosition({ ...defaultOptions, flip: false }),
    );

    expect(flip).not.toHaveBeenCalled();
  });

  // ─── Middleware — shift ────────────────────────────────

  it('enables shift by default with padding 8', () => {
    renderHook(() => useFloatingPosition(defaultOptions));

    expect(shift).toHaveBeenCalledWith({ padding: 8 });
  });

  it('applies custom shiftPadding', () => {
    renderHook(() =>
      useFloatingPosition({ ...defaultOptions, shiftPadding: 16 }),
    );

    expect(shift).toHaveBeenCalledWith({ padding: 16 });
  });

  it('disables shift when shift: false', () => {
    vi.mocked(shift).mockClear();

    renderHook(() =>
      useFloatingPosition({ ...defaultOptions, shift: false }),
    );

    expect(shift).not.toHaveBeenCalled();
  });

  // ─── Middleware — arrow ────────────────────────────────

  it('does not enable arrow by default', () => {
    renderHook(() => useFloatingPosition(defaultOptions));

    expect(arrow).not.toHaveBeenCalled();
  });

  it('enables arrow middleware when arrow: true', () => {
    renderHook(() =>
      useFloatingPosition({ ...defaultOptions, arrow: true }),
    );

    expect(arrow).toHaveBeenCalledWith(
      expect.objectContaining({ element: expect.any(Object) }),
    );
  });

  // ─── Fixed size ────────────────────────────────────────

  it('injects fixed width (number → px)', () => {
    const { result } = renderHook(() =>
      useFloatingPosition({ ...defaultOptions, width: 300 }),
    );

    expect(result.current.floatingStyles.width).toBe('300px');
  });

  it('injects fixed width (string passthrough)', () => {
    const { result } = renderHook(() =>
      useFloatingPosition({ ...defaultOptions, width: '50dvw' }),
    );

    expect(result.current.floatingStyles.width).toBe('50dvw');
  });

  it('injects fixed height (number → px)', () => {
    const { result } = renderHook(() =>
      useFloatingPosition({ ...defaultOptions, height: 200 }),
    );

    expect(result.current.floatingStyles.height).toBe('200px');
  });

  it('injects fixed height (string passthrough)', () => {
    const { result } = renderHook(() =>
      useFloatingPosition({ ...defaultOptions, height: '60dvh' }),
    );

    expect(result.current.floatingStyles.height).toBe('60dvh');
  });

  it('does not set width/height when not provided', () => {
    const { result } = renderHook(() => useFloatingPosition(defaultOptions));

    expect(result.current.floatingStyles.width).toBeUndefined();
    expect(result.current.floatingStyles.height).toBeUndefined();
  });

  it('injects both width and height simultaneously', () => {
    const { result } = renderHook(() =>
      useFloatingPosition({ ...defaultOptions, width: 400, height: '300px' }),
    );

    expect(result.current.floatingStyles.width).toBe('400px');
    expect(result.current.floatingStyles.height).toBe('300px');
  });

  // ─── Context ───────────────────────────────────────────

  it('passes open state to useFloating', () => {
    renderHook(() =>
      useFloatingPosition({ ...defaultOptions, open: true }),
    );

    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({ open: true }),
    );
  });

  it('passes onOpenChange to useFloating', () => {
    const onOpenChange = vi.fn();
    renderHook(() =>
      useFloatingPosition({ ...defaultOptions, onOpenChange }),
    );

    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({ onOpenChange }),
    );
  });

  // ─── arrowRef ──────────────────────────────────────────

  it('arrowRef starts as null', () => {
    const { result } = renderHook(() => useFloatingPosition(defaultOptions));

    expect(result.current.arrowRef.current).toBeNull();
  });

  // ─── autoUpdate ────────────────────────────────────────

  it('uses autoUpdate for whileElementsMounted', () => {
    renderHook(() => useFloatingPosition(defaultOptions));

    expect(useFloating).toHaveBeenCalledWith(
      expect.objectContaining({ whileElementsMounted: expect.any(Function) }),
    );
  });
});
