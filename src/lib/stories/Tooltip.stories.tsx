import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Placement } from '@floating-ui/react';
import { Tooltip } from '../Tooltip';
import { Modal } from '../Modal';
import {
  StoryButton,
  StoryButtonSecondary,
  StoryCard,
  StoryTitle,
  StoryText,
  StoryRow,
  StoryActions,
} from './styled';

// ─── Tooltip Content styled ─────────────────────────────

const tooltipStyle: React.CSSProperties = {
  background: '#222',
  color: '#fff',
  borderRadius: 6,
  padding: '6px 12px',
  fontSize: 13,
  lineHeight: 1.4,
  maxWidth: 240,
};

// ─── Basic ───────────────────────────────────────────────

const BasicStory = () => (
  <div style={{ padding: 100 }}>
    <Tooltip trigger={<StoryButton>Hover me</StoryButton>}>
      <div style={tooltipStyle}>
        Đây là tooltip — hiện khi hover hoặc focus.
      </div>
    </Tooltip>
  </div>
);

// ─── Placements ──────────────────────────────────────────

const PLACEMENTS: Placement[] = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end',
];

const PlacementsStory = () => (
  <div style={{ padding: 120, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
    {PLACEMENTS.map((p) => (
      <Tooltip
        key={p}
        placement={p}
        trigger={<StoryButtonSecondary>{p}</StoryButtonSecondary>}
      >
        <div style={tooltipStyle}>
          <strong>{p}</strong>
        </div>
      </Tooltip>
    ))}
  </div>
);

// ─── With Arrow ──────────────────────────────────────────

const ArrowStory = () => (
  <div style={{ padding: 100, display: 'flex', gap: 16 }}>
    {(['top', 'bottom', 'left', 'right'] as Placement[]).map((p) => (
      <Tooltip
        key={p}
        placement={p}
        arrow
        arrowFill="#222"
        trigger={<StoryButton>{p}</StoryButton>}
      >
        <div style={tooltipStyle}>
          Arrow ở vị trí <strong>{p}</strong>
        </div>
      </Tooltip>
    ))}
  </div>
);

// ─── No Arrow ────────────────────────────────────────────

const NoArrowStory = () => (
  <div style={{ padding: 100 }}>
    <Tooltip
      trigger={<StoryButton>No Arrow</StoryButton>}
      arrow={false}
    >
      <div style={tooltipStyle}>
        Tooltip không có arrow.
      </div>
    </Tooltip>
  </div>
);

// ─── Custom Delay ────────────────────────────────────────

const CustomDelayStory = () => (
  <div style={{ padding: 100, display: 'flex', gap: 16 }}>
    <Tooltip
      trigger={<StoryButton>Instant (0ms)</StoryButton>}
      openDelay={0}
      closeDelay={0}
    >
      <div style={tooltipStyle}>Không có delay!</div>
    </Tooltip>

    <Tooltip
      trigger={<StoryButtonSecondary>Slow (1000ms)</StoryButtonSecondary>}
      openDelay={1000}
      closeDelay={500}
    >
      <div style={tooltipStyle}>Open delay: 1s, close delay: 500ms</div>
    </Tooltip>

    <Tooltip
      trigger={<StoryButtonSecondary>Default (300/150ms)</StoryButtonSecondary>}
    >
      <div style={tooltipStyle}>Default delay settings</div>
    </Tooltip>
  </div>
);

// ─── Controlled ──────────────────────────────────────────

const ControlledStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 100 }}>
      <StoryRow>
        <Tooltip
          open={open}
          onOpenChange={setOpen}
          trigger={<StoryButton>Hover Target</StoryButton>}
        >
          <div style={tooltipStyle}>
            Controlled tooltip — state bên ngoài.
          </div>
        </Tooltip>

        <StoryButtonSecondary onClick={() => setOpen(!open)}>
          External Toggle (open: {String(open)})
        </StoryButtonSecondary>
      </StoryRow>
    </div>
  );
};

// ─── Inside Modal ────────────────────────────────────────

const InsideModalStory = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <StoryButton onClick={() => setModalOpen(true)}>
        Open Modal with Tooltips
      </StoryButton>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="md">
        <StoryCard style={{ minWidth: 'unset', width: '100%', boxSizing: 'border-box' }}>
          <StoryTitle>Modal chứa Tooltip</StoryTitle>
          <StoryText>
            Tooltip hoạt đông bình thường bên trong Modal,
            hiện qua FloatingPortal nên không bị overflow ẩn.
          </StoryText>

          <StoryRow>
            <Tooltip
              placement="top"
              arrow
              arrowFill="#222"
              trigger={<StoryButton>Hover — Top</StoryButton>}
            >
              <div style={tooltipStyle}>Tooltip bên trong Modal (top)</div>
            </Tooltip>

            <Tooltip
              placement="bottom"
              arrow
              arrowFill="#222"
              trigger={<StoryButtonSecondary>Hover — Bottom</StoryButtonSecondary>}
            >
              <div style={tooltipStyle}>Tooltip bên trong Modal (bottom)</div>
            </Tooltip>
          </StoryRow>

          <StoryActions>
            <StoryButton onClick={() => setModalOpen(false)}>
              Close Modal
            </StoryButton>
          </StoryActions>
        </StoryCard>
      </Modal>
    </div>
  );
};

// ─── Rich Content ────────────────────────────────────────

const RichContentStory = () => (
  <div style={{ padding: 100 }}>
    <Tooltip
      trigger={<StoryButton>Rich Tooltip</StoryButton>}
      placement="right"
      arrow
      arrowFill="#1a1a2e"
      width={280}
    >
      <div style={{
        ...tooltipStyle,
        background: '#1a1a2e',
        padding: 16,
        borderRadius: 8,
      }}>
        <strong style={{ fontSize: 14 }}>💡 Mẹo hữu ích</strong>
        <p style={{ margin: '8px 0 0', opacity: 0.85, fontSize: 13 }}>
          Tooltip có thể chứa nội dung phong phú như emoji, text đậm, và nhiều dòng.
        </p>
      </div>
    </Tooltip>
  </div>
);

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Dialog/Tooltip',
};

export default meta;

export const Basic: StoryObj = {
  name: 'Basic',
  render: () => <BasicStory />,
};

export const Placements: StoryObj = {
  name: 'Placements',
  render: () => <PlacementsStory />,
};

export const WithArrow: StoryObj = {
  name: 'With Arrow',
  render: () => <ArrowStory />,
};

export const NoArrow: StoryObj = {
  name: 'No Arrow',
  render: () => <NoArrowStory />,
};

export const CustomDelay: StoryObj = {
  name: 'Custom Delay',
  render: () => <CustomDelayStory />,
};

export const Controlled: StoryObj = {
  name: 'Controlled',
  render: () => <ControlledStory />,
};

export const InsideModal: StoryObj = {
  name: 'Inside Modal',
  render: () => <InsideModalStory />,
};

export const RichContent: StoryObj = {
  name: 'Rich Content',
  render: () => <RichContentStory />,
};
