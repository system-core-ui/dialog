import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Placement } from '@floating-ui/react';
import { Popover } from '../Popover';
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

// ─── Popover Content styled ─────────────────────────────

const popoverContentStyle: React.CSSProperties = {
  background: 'white',
  borderRadius: 8,
  padding: 16,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  border: '1px solid #e0e0e0',
  maxWidth: 300,
};

// ─── Basic ───────────────────────────────────────────────

const BasicStory = () => (
  <div style={{ padding: 100 }}>
    <Popover trigger={<StoryButton>Click me</StoryButton>}>
      <div style={popoverContentStyle}>
        <strong>Popover</strong>
        <p style={{ margin: '8px 0 0', color: '#666' }}>
          Click nút để mở/đóng popover. Click ra ngoài hoặc nhấn ESC để đóng.
        </p>
      </div>
    </Popover>
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
      <Popover
        key={p}
        placement={p}
        trigger={<StoryButtonSecondary>{p}</StoryButtonSecondary>}
      >
        <div style={popoverContentStyle}>
          <strong>{p}</strong>
        </div>
      </Popover>
    ))}
  </div>
);

// ─── With Arrow ──────────────────────────────────────────

const ArrowStory = () => (
  <div style={{ padding: 100, display: 'flex', gap: 16 }}>
    {(['top', 'bottom', 'left', 'right'] as Placement[]).map((p) => (
      <Popover
        key={p}
        placement={p}
        arrow
        arrowFill="white"
        trigger={<StoryButton>{p}</StoryButton>}
      >
        <div style={{ ...popoverContentStyle, color: '#333' }}>
          Arrow ở vị trí <strong>{p}</strong>
        </div>
      </Popover>
    ))}
  </div>
);

// ─── Controlled ──────────────────────────────────────────

const ControlledStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 100 }}>
      <StoryRow>
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={<StoryButton>Toggle Popover</StoryButton>}
        >
          <div style={popoverContentStyle}>
            <strong>Controlled Popover</strong>
            <p style={{ margin: '8px 0 0', color: '#666' }}>
              State được quản lý bên ngoài.
            </p>
            <StoryButton
              onClick={() => setOpen(false)}
              style={{ marginTop: 12, fontSize: 13 }}
            >
              Đóng
            </StoryButton>
          </div>
        </Popover>

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
        Open Modal with Popover
      </StoryButton>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="md">
        <StoryCard style={{ minWidth: 'unset', width: '100%', boxSizing: 'border-box' }}>
          <StoryTitle>Modal chứa Popover</StoryTitle>
          <StoryText>
            Popover bên trong Modal — click ngoài Popover chỉ đóng Popover,
            KHÔNG đóng Modal. ESC cũng chỉ đóng Popover trước.
          </StoryText>

          <Popover
            placement="bottom"
            arrow
            arrowFill="white"
            trigger={<StoryButton>Open Popover</StoryButton>}
          >
            <div style={popoverContentStyle}>
              <strong>Popover trong Modal</strong>
              <p style={{ margin: '8px 0 0', color: '#666' }}>
                Click ngoài popover → chỉ đóng popover, modal vẫn mở.
                ESC → chỉ đóng popover, modal vẫn mở.
              </p>
            </div>
          </Popover>

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

// ─── Nested Popovers ─────────────────────────────────────

const NestedStory = () => (
  <div style={{ padding: 100 }}>
    <Popover
      placement="right"
      trigger={<StoryButton>Open Popover</StoryButton>}
    >
      <div style={popoverContentStyle}>
        <strong>Popover 1</strong>
        <p style={{ margin: '8px 0 12px', color: '#666' }}>
          Bấm nút bên dưới để mở popover lồng nhau.
          Click ngoài nested popover chỉ đóng nested, không đóng cái này.
        </p>
        <Popover
          placement="right"
          trigger={<StoryButtonSecondary>Open Nested</StoryButtonSecondary>}
        >
          <div style={popoverContentStyle}>
            <strong>Popover 2 (Nested)</strong>
            <p style={{ margin: '8px 0 0', color: '#666' }}>
              Click ra ngoài đóng popover này trước.
            </p>
          </div>
        </Popover>
      </div>
    </Popover>
  </div>
);

// ─── Fixed Size ──────────────────────────────────────────

const FixedSizeStory = () => (
  <div style={{ padding: 100 }}>
    <Popover
      width={350}
      height={200}
      trigger={<StoryButton>Fixed Size Popover</StoryButton>}
    >
      <div style={{
        ...popoverContentStyle,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        overflow: 'auto',
      }}>
        <strong>Fixed Size: 350×200</strong>
        <p style={{ margin: '8px 0 0', color: '#666' }}>
          Popover với width=350 và height=200. Content sẽ scroll nếu vượt quá.
        </p>
      </div>
    </Popover>
  </div>
);

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: {
  placement: Placement;
  offset: number;
  flip: boolean;
  arrow: boolean;
  dismissOnOutsidePress: boolean;
  dismissOnEsc: boolean;
  width: string;
  height: string;
}) => (
  <div style={{ padding: 200, display: 'flex', justifyContent: 'center' }}>
    <Popover
      placement={args.placement}
      offset={args.offset}
      flip={args.flip}
      arrow={args.arrow}
      dismissOnOutsidePress={args.dismissOnOutsidePress}
      dismissOnEsc={args.dismissOnEsc}
      width={args.width || undefined}
      height={args.height || undefined}
      trigger={<StoryButton>Open Playground</StoryButton>}
    >
      <div style={popoverContentStyle}>
        <strong>Playground Popover</strong>
        <p style={{ margin: '8px 0 0', color: '#666' }}>
          Thay đổi Controls ở panel dưới để test các props.
        </p>
      </div>
    </Popover>
  </div>
);

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Dialog/Popover',
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

export const Controlled: StoryObj = {
  name: 'Controlled',
  render: () => <ControlledStory />,
};

export const InsideModal: StoryObj = {
  name: 'Inside Modal',
  render: () => <InsideModalStory />,
};

export const NestedPopovers: StoryObj = {
  name: 'Nested Popovers',
  render: () => <NestedStory />,
};

export const FixedSize: StoryObj = {
  name: 'Fixed Size',
  render: () => <FixedSizeStory />,
};

export const Playground: StoryObj<{
  placement: Placement;
  offset: number;
  flip: boolean;
  arrow: boolean;
  dismissOnOutsidePress: boolean;
  dismissOnEsc: boolean;
  width: string;
  height: string;
}> = {
  name: 'Playground',
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: PLACEMENTS,
      description: 'Placement relative to trigger',
    },
    offset: {
      control: { type: 'number', min: 0, max: 50 },
      description: 'Spacing from trigger (px)',
    },
    flip: {
      control: 'boolean',
      description: 'Auto-flip when viewport overflows',
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow indicator',
    },
    dismissOnOutsidePress: {
      control: 'boolean',
      description: 'Dismiss on outside click',
    },
    dismissOnEsc: {
      control: 'boolean',
      description: 'Dismiss on ESC key',
    },
    width: {
      control: 'text',
      description: 'Fixed width (e.g. "300px")',
    },
    height: {
      control: 'text',
      description: 'Fixed height (e.g. "200px")',
    },
  },
  args: {
    placement: 'bottom',
    offset: 8,
    flip: true,
    arrow: false,
    dismissOnOutsidePress: true,
    dismissOnEsc: true,
    width: '',
    height: '',
  },
  render: (args) => <PlaygroundStory {...args} />,
};
