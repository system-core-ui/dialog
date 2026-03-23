import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Modal } from '../src/lib/Modal';

// ─── Helpers ─────────────────────────────────────────────

const CONTENT_TEXT = 'Modal Content';

function renderModal(props: Record<string, unknown> = {}) {
  const onClose = vi.fn();
  const result = render(
    <Modal open={true} onClose={onClose} {...props}>
      <div>{CONTENT_TEXT}</div>
    </Modal>,
  );
  return { ...result, onClose };
}

// ─── Tests ───────────────────────────────────────────────

describe('Modal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── Rendering ─────────────────────────────────────────

  it('renders content when open', () => {
    renderModal();
    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderModal({ open: false });
    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();
  });

  it('renders when closed with keepMounted', () => {
    renderModal({ open: false, keepMounted: true });
    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();
  });

  // ─── Close button ─────────────────────────────────────

  it('renders close button by default', () => {
    renderModal();
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('hides close button when hideCloseButton is true', () => {
    renderModal({ hideCloseButton: true });
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const { onClose } = renderModal();

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Close'));
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // ─── Accessibility (WCAG 2.2) ─────────────────────────

  it('has role="dialog" and aria-modal="true"', () => {
    renderModal();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('has tabIndex={-1} for programmatic focus', () => {
    renderModal();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('tabindex', '-1');
  });

  it('has displayName', () => {
    expect(Modal.displayName).toBe('Modal');
  });

  // ─── ESC key (SC 2.1.1) ───────────────────────────────

  it('closes on ESC key', async () => {
    const { onClose } = renderModal();

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on ESC when disableEscapeKey is true', async () => {
    const { onClose } = renderModal({ disableEscapeKey: true });

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  // ─── Backdrop click ───────────────────────────────────

  it('closes on backdrop click', async () => {
    const { onClose } = renderModal();

    // The backdrop is the wrapper div — click on it, not the dialog
    const backdrop = screen.getByRole('dialog').parentElement!;
    await act(async () => {
      fireEvent.click(backdrop);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on backdrop click when disableBackdropClick is true', async () => {
    const { onClose } = renderModal({ disableBackdropClick: true });

    const backdrop = screen.getByRole('dialog').parentElement!;
    await act(async () => {
      fireEvent.click(backdrop);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close when clicking content inside modal', async () => {
    const { onClose } = renderModal();

    await act(async () => {
      fireEvent.click(screen.getByText(CONTENT_TEXT));
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  // ─── Body scroll lock ─────────────────────────────────

  it('locks body scroll when open', () => {
    renderModal();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { rerender } = render(
      <Modal open={true} onClose={vi.fn()}>
        <div>content</div>
      </Modal>,
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal open={false} onClose={vi.fn()}>
        <div>content</div>
      </Modal>,
    );

    expect(document.body.style.overflow).not.toBe('hidden');
  });
});
