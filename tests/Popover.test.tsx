import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useState } from 'react';

import { Popover } from '../src/lib/Popover';

// ─── Helpers ─────────────────────────────────────────────

const TRIGGER_TEXT = 'Open';
const CONTENT_TEXT = 'Popover Content';

function renderPopover(props: Record<string, unknown> = {}) {
  return render(
    <Popover trigger={<button>{TRIGGER_TEXT}</button>} {...props}>
      <div>{CONTENT_TEXT}</div>
    </Popover>,
  );
}

// ─── Tests ───────────────────────────────────────────────

describe('Popover', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── Rendering ─────────────────────────────────────────

  it('renders the trigger element', () => {
    renderPopover();
    expect(screen.getByText(TRIGGER_TEXT)).toBeInTheDocument();
  });

  it('does not render content by default', () => {
    renderPopover();
    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();
  });

  // ─── Uncontrolled mode ─────────────────────────────────

  it('opens content on trigger click (uncontrolled)', async () => {
    renderPopover();

    await act(async () => {
      fireEvent.click(screen.getByText(TRIGGER_TEXT));
    });

    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();
  });

  it('closes content on second trigger click (uncontrolled)', async () => {
    renderPopover();

    const trigger = screen.getByText(TRIGGER_TEXT);

    await act(async () => {
      fireEvent.click(trigger);
    });
    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(trigger);
    });
    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();
  });

  it('starts open when defaultOpen is true', () => {
    renderPopover({ defaultOpen: true });
    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();
  });

  // ─── Controlled mode ──────────────────────────────────

  it('shows content when open is true (controlled)', () => {
    renderPopover({ open: true, onOpenChange: vi.fn() });
    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();
  });

  it('hides content when open is false (controlled)', () => {
    renderPopover({ open: false, onOpenChange: vi.fn() });
    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();
  });

  it('calls onOpenChange when trigger is clicked (controlled)', async () => {
    const onOpenChange = vi.fn();
    renderPopover({ open: false, onOpenChange });

    await act(async () => {
      fireEvent.click(screen.getByText(TRIGGER_TEXT));
    });

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('calls onOpenChange in uncontrolled mode too', async () => {
    const onOpenChange = vi.fn();
    renderPopover({ onOpenChange });

    await act(async () => {
      fireEvent.click(screen.getByText(TRIGGER_TEXT));
    });

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // ─── Controlled toggle ────────────────────────────────

  it('toggles correctly in controlled mode', async () => {
    function ControlledPopover() {
      const [open, setOpen] = useState(false);
      return (
        <Popover
          trigger={<button>{TRIGGER_TEXT}</button>}
          open={open}
          onOpenChange={setOpen}
        >
          <div>{CONTENT_TEXT}</div>
        </Popover>
      );
    }

    render(<ControlledPopover />);

    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText(TRIGGER_TEXT));
    });
    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText(TRIGGER_TEXT));
    });
    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();
  });

  // ─── Dismiss ───────────────────────────────────────────

  it('closes on ESC key by default', async () => {
    renderPopover({ defaultOpen: true });

    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();
  });

  it('does not close on ESC when dismissOnEsc is false', async () => {
    renderPopover({ defaultOpen: true, dismissOnEsc: false });

    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();
  });

  // ─── Accessibility ────────────────────────────────────

  it('applies role="dialog" to floating element', () => {
    renderPopover({ defaultOpen: true });

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  // ─── Styling ───────────────────────────────────────────

  it('applies className to floating element', () => {
    renderPopover({ defaultOpen: true, className: 'my-popover' });

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('my-popover');
  });

  it('applies inline style to floating element', () => {
    renderPopover({ defaultOpen: true, style: { backgroundColor: 'red' } });

    const dialog = screen.getByRole('dialog');
    expect(dialog.style.backgroundColor).toBe('red');
  });
});
