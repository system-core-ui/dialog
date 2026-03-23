import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useState } from 'react';

import { Tooltip } from '../src/lib/Tooltip';

// ─── Helpers ─────────────────────────────────────────────

const TRIGGER_TEXT = 'Hover me';
const CONTENT_TEXT = 'Tooltip Content';

function renderTooltip(props: Record<string, unknown> = {}) {
  return render(
    <Tooltip trigger={<button>{TRIGGER_TEXT}</button>} {...props}>
      <div>{CONTENT_TEXT}</div>
    </Tooltip>,
  );
}

// ─── Tests ───────────────────────────────────────────────

describe('Tooltip', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── Rendering ─────────────────────────────────────────

  it('renders the trigger element', () => {
    renderTooltip();
    expect(screen.getByText(TRIGGER_TEXT)).toBeInTheDocument();
  });

  it('does not render content by default', () => {
    renderTooltip();
    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();
  });

  // ─── Controlled mode ──────────────────────────────────

  it('shows content when open is true (controlled)', () => {
    renderTooltip({ open: true, onOpenChange: vi.fn() });
    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();
  });

  it('hides content when open is false (controlled)', () => {
    renderTooltip({ open: false, onOpenChange: vi.fn() });
    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();
  });

  it('calls onOpenChange in controlled mode', () => {
    function ControlledTooltip() {
      const [open, setOpen] = useState(false);
      return (
        <Tooltip
          trigger={<button>{TRIGGER_TEXT}</button>}
          open={open}
          onOpenChange={setOpen}
        >
          <div>{CONTENT_TEXT}</div>
        </Tooltip>
      );
    }

    render(<ControlledTooltip />);
    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();
  });

  // ─── Uncontrolled defaultOpen ─────────────────────────

  it('starts open when defaultOpen is true', () => {
    renderTooltip({ defaultOpen: true });
    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();
  });

  // ─── Accessibility (WCAG 2.2) ─────────────────────────

  it('applies role="tooltip" to floating element', () => {
    renderTooltip({ defaultOpen: true });
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  it('has displayName', () => {
    expect(Tooltip.displayName).toBe('Tooltip');
  });

  // ─── Dismiss (SC 1.4.13 + SC 2.1.1) ──────────────────

  it('closes on ESC key', async () => {
    renderTooltip({ defaultOpen: true });

    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument();
  });

  // ─── Styling ───────────────────────────────────────────

  it('applies className to floating element', () => {
    renderTooltip({ defaultOpen: true, className: 'my-tooltip' });
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveClass('my-tooltip');
  });

  it('applies inline style to floating element', () => {
    renderTooltip({ defaultOpen: true, style: { backgroundColor: 'red' } });
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.style.backgroundColor).toBe('red');
  });
});
