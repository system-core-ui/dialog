import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Drawer } from '../src/lib/Drawer';

// ─── Helpers ─────────────────────────────────────────────

const CONTENT_TEXT = 'Drawer Content';

function renderDrawer(props: Record<string, unknown> = {}) {
  const onClose = vi.fn();
  const result = render(
    <Drawer open={true} onClose={onClose} {...props}>
      <div>{CONTENT_TEXT}</div>
    </Drawer>,
  );
  return { ...result, onClose };
}

// ─── Tests ───────────────────────────────────────────────

describe('Drawer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── Rendering ─────────────────────────────────────────

  it('renders content when open', () => {
    renderDrawer();
    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();
  });

  it('always renders shell (for animation)', () => {
    renderDrawer({ open: false });
    // Shell renders but content does not
    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();
    // Dialog is hidden but still in DOM for CSS transitions
    expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument();
  });

  // ─── Placements ───────────────────────────────────────

  it.each(['left', 'right', 'top', 'bottom'] as const)(
    'renders with placement="%s"',
    (placement) => {
      renderDrawer({ placement });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    },
  );

  // ─── Close button ─────────────────────────────────────

  it('renders close button inside by default', () => {
    renderDrawer();
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('hides close button when closeButtonPlacement is "none"', () => {
    renderDrawer({ closeButtonPlacement: 'none' });
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
  });

  it('renders close button outside when closeButtonPlacement is "outside"', () => {
    renderDrawer({ closeButtonPlacement: 'outside' });
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const { onClose } = renderDrawer();

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Close'));
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // ─── Accessibility (WCAG 2.2) ─────────────────────────

  it('has role="dialog" and aria-modal="true"', () => {
    renderDrawer();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('has tabIndex={-1} for programmatic focus', () => {
    renderDrawer();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('tabindex', '-1');
  });

  it('has displayName', () => {
    expect(Drawer.displayName).toBe('Drawer');
  });

  // ─── ESC key (SC 2.1.1) ───────────────────────────────

  it('closes on ESC key', async () => {
    const { onClose } = renderDrawer();

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on ESC when disableEscapeKey is true', async () => {
    const { onClose } = renderDrawer({ disableEscapeKey: true });

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  // ─── Backdrop click ───────────────────────────────────

  it('closes on backdrop click', async () => {
    const { onClose } = renderDrawer();

    const backdrop = screen.getByRole('dialog').parentElement!;
    await act(async () => {
      fireEvent.click(backdrop);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on backdrop click when disableBackdropClick is true', async () => {
    const { onClose } = renderDrawer({ disableBackdropClick: true });

    const backdrop = screen.getByRole('dialog').parentElement!;
    await act(async () => {
      fireEvent.click(backdrop);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close when clicking content inside drawer', async () => {
    const { onClose } = renderDrawer();

    await act(async () => {
      fireEvent.click(screen.getByText(CONTENT_TEXT));
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  // ─── Body scroll lock ─────────────────────────────────

  it('locks body scroll when open', () => {
    renderDrawer();
    expect(document.body.style.overflow).toBe('hidden');
  });
});
