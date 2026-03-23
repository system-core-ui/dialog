import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from '../Drawer';
import { Modal } from '../Modal';
import { Popover } from '../Popover';
import { Tooltip } from '../Tooltip';
import type { DrawerPlacement, DrawerCloseButtonPlacement } from '../models';
import {
  StoryButton,
  StoryButtonSecondary,
  StoryCard,
  StoryTitle,
  StoryText,
  StoryActions,
} from './styled';

// ─── Drawer Content styled ──────────────────────────────

const drawerContentStyle: React.CSSProperties = {
  padding: 24,
};

const drawerHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
  paddingBottom: 16,
  borderBottom: '1px solid #eee',
};

// ─── Basic ───────────────────────────────────────────────

const BasicStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 32 }}>
      <StoryButton onClick={() => setOpen(true)}>
        Open Drawer
      </StoryButton>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <div style={drawerContentStyle}>
          <h2 style={{ margin: 0, fontSize: 18, paddingRight: 32 }}>Basic Drawer</h2>
          <p style={{ color: '#666', lineHeight: 1.6 }}>
            Drawer mặc định mở từ bên trái. Click backdrop hoặc ESC để đóng.
            Nút ✕ mặc định ở góc trên phải.
          </p>
        </div>
      </Drawer>
    </div>
  );
};

// ─── Placements ──────────────────────────────────────────

const PlacementsStory = () => {
  const [active, setActive] = useState<DrawerPlacement | null>(null);

  return (
    <div style={{ padding: 32, display: 'flex', gap: 8 }}>
      {(['left', 'right', 'top', 'bottom'] as DrawerPlacement[]).map((p) => (
        <StoryButton key={p} onClick={() => setActive(p)}>
          {p}
        </StoryButton>
      ))}

      {(['left', 'right', 'top', 'bottom'] as DrawerPlacement[]).map((p) => (
        <Drawer
          key={p}
          open={active === p}
          placement={p}
          onClose={() => setActive(null)}
          width={p === 'left' || p === 'right' ? 320 : undefined}
          height={p === 'top' || p === 'bottom' ? 280 : undefined}
        >
          <div style={drawerContentStyle}>
            <h2 style={{ margin: 0, fontSize: 18, paddingRight: 32 }}>Placement: {p}</h2>
            <p style={{ color: '#666' }}>
              Drawer mở từ hướng <strong>{p}</strong>.
            </p>
          </div>
        </Drawer>
      ))}
    </div>
  );
};

// ─── Custom Size ─────────────────────────────────────────

const CustomSizeStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 32 }}>
      <StoryButton onClick={() => setOpen(true)}>
        Open Wide Drawer (500px)
      </StoryButton>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="right"
        width={500}
      >
        <div style={drawerContentStyle}>
          <div style={drawerHeaderStyle}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Custom Width: 500px</h2>
            <StoryButtonSecondary onClick={() => setOpen(false)}>✕</StoryButtonSecondary>
          </div>
          <p style={{ color: '#666' }}>
            Drawer với width tùy chỉnh = 500px từ bên phải.
          </p>
        </div>
      </Drawer>
    </div>
  );
};

// ─── Inside Modal ────────────────────────────────────────

const InsideModalStory = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ padding: 32 }}>
      <StoryButton onClick={() => setModalOpen(true)}>
        Open Modal
      </StoryButton>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="md">
        <StoryCard style={{ minWidth: 'unset', width: '100%', boxSizing: 'border-box' }}>
          <StoryTitle>Modal chứa Drawer</StoryTitle>
          <StoryText>
            Drawer bên trong Modal — ESC đóng Drawer trước, KHÔNG đóng Modal.
            Click backdrop Drawer cũng chỉ đóng Drawer.
          </StoryText>

          <StoryButton onClick={() => setDrawerOpen(true)}>
            Open Drawer (Right)
          </StoryButton>

          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            placement="right"
            width={350}
          >
            <div style={drawerContentStyle}>
              <div style={drawerHeaderStyle}>
                <h2 style={{ margin: 0, fontSize: 18 }}>Drawer trong Modal</h2>
                <StoryButtonSecondary onClick={() => setDrawerOpen(false)}>✕</StoryButtonSecondary>
              </div>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                ESC chỉ đóng Drawer này. Modal vẫn mở.
                Click vùng xám chỉ đóng Drawer, không đóng Modal.
              </p>
            </div>
          </Drawer>

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

// ─── Nested Drawers ──────────────────────────────────────

const NestedDrawersStory = () => {
  const [drawer1, setDrawer1] = useState(false);
  const [drawer2, setDrawer2] = useState(false);
  const [drawer3, setDrawer3] = useState(false);

  return (
    <div style={{ padding: 32 }}>
      <StoryButton onClick={() => setDrawer1(true)}>
        Open Drawer 1 (Left)
      </StoryButton>

      <Drawer open={drawer1} onClose={() => setDrawer1(false)} placement="left" width={350}>
        <div style={drawerContentStyle}>
          <div style={drawerHeaderStyle}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Drawer 1 (Left)</h2>
            <StoryButtonSecondary onClick={() => setDrawer1(false)}>✕</StoryButtonSecondary>
          </div>
          <p style={{ color: '#666', lineHeight: 1.6 }}>
            Đây là Drawer cấp 1. Bấm nút bên dưới để mở Drawer lồng bên trong.
          </p>

          <StoryButton onClick={() => setDrawer2(true)} style={{ marginTop: 16 }}>
            Open Drawer 2 (Right)
          </StoryButton>

          <Drawer open={drawer2} onClose={() => setDrawer2(false)} placement="right" width={320}>
            <div style={drawerContentStyle}>
              <div style={drawerHeaderStyle}>
                <h2 style={{ margin: 0, fontSize: 18 }}>Drawer 2 (Right)</h2>
                <StoryButtonSecondary onClick={() => setDrawer2(false)}>✕</StoryButtonSecondary>
              </div>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                Đây là Drawer cấp 2 lồng trong Drawer 1.
                ESC chỉ đóng Drawer này, Drawer 1 vẫn mở.
              </p>

              <StoryButton onClick={() => setDrawer3(true)} style={{ marginTop: 16 }}>
                Open Drawer 3 (Bottom)
              </StoryButton>

              <Drawer open={drawer3} onClose={() => setDrawer3(false)} placement="bottom" height={250}>
                <div style={drawerContentStyle}>
                  <div style={drawerHeaderStyle}>
                    <h2 style={{ margin: 0, fontSize: 18 }}>Drawer 3 (Bottom)</h2>
                    <StoryButtonSecondary onClick={() => setDrawer3(false)}>✕</StoryButtonSecondary>
                  </div>
                  <p style={{ color: '#666', lineHeight: 1.6 }}>
                    Drawer cấp 3! ESC chỉ đóng cái này.
                    Drawer 2 và 1 vẫn mở.
                  </p>
                </div>
              </Drawer>
            </div>
          </Drawer>
        </div>
      </Drawer>
    </div>
  );
};

// ─── With Popover ────────────────────────────────────────

const WithPopoverStory = () => {
  const [open, setOpen] = useState(false);

  const popoverContentStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: 8,
    padding: 16,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    border: '1px solid #e0e0e0',
    maxWidth: 260,
  };

  return (
    <div style={{ padding: 32 }}>
      <StoryButton onClick={() => setOpen(true)}>
        Open Drawer with Popover
      </StoryButton>

      <Drawer open={open} onClose={() => setOpen(false)} placement="right" width={380}>
        <div style={drawerContentStyle}>
          <div style={drawerHeaderStyle}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Drawer + Popover</h2>
            <StoryButtonSecondary onClick={() => setOpen(false)}>✕</StoryButtonSecondary>
          </div>
          <p style={{ color: '#666', lineHeight: 1.6 }}>
            Click ngoài Popover chỉ đóng Popover, KHÔNG đóng Drawer.
            ESC cũng chỉ đóng Popover trước.
          </p>

          <Popover
            placement="bottom"
            arrow
            arrowFill="white"
            trigger={<StoryButton style={{ marginTop: 16 }}>Open Popover</StoryButton>}
          >
            <div style={popoverContentStyle}>
              <strong>Popover trong Drawer</strong>
              <p style={{ margin: '8px 0 0', color: '#666' }}>
                Click ngoài → chỉ đóng popover, drawer vẫn mở.
              </p>
            </div>
          </Popover>
        </div>
      </Drawer>
    </div>
  );
};

// ─── With Tooltip ────────────────────────────────────────

const WithTooltipStory = () => {
  const [open, setOpen] = useState(false);

  const tooltipStyle: React.CSSProperties = {
    background: '#222',
    color: '#fff',
    borderRadius: 6,
    padding: '6px 12px',
    fontSize: 13,
  };

  return (
    <div style={{ padding: 32 }}>
      <StoryButton onClick={() => setOpen(true)}>
        Open Drawer with Tooltip
      </StoryButton>

      <Drawer open={open} onClose={() => setOpen(false)} placement="right" width={350}>
        <div style={drawerContentStyle}>
          <div style={drawerHeaderStyle}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Drawer + Tooltip</h2>
            <StoryButtonSecondary onClick={() => setOpen(false)}>✕</StoryButtonSecondary>
          </div>
          <p style={{ color: '#666', lineHeight: 1.6 }}>
            Tooltip hoạt động bình thường bên trong Drawer.
          </p>

          <Tooltip
            placement="bottom"
            arrow
            arrowFill="#222"
            trigger={<StoryButton style={{ marginTop: 16 }}>Hover me</StoryButton>}
          >
            <div style={tooltipStyle}>Tooltip trong Drawer!</div>
          </Tooltip>
        </div>
      </Drawer>
    </div>
  );
};

// ─── Meta & Exports ──────────────────────────────────────

const meta: Meta = {
  title: 'Dialog/Drawer',
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

export const CustomSize: StoryObj = {
  name: 'Custom Size',
  render: () => <CustomSizeStory />,
};

export const InsideModal: StoryObj = {
  name: 'Inside Modal',
  render: () => <InsideModalStory />,
};

export const NestedDrawers: StoryObj = {
  name: 'Nested Drawers (3 levels)',
  render: () => <NestedDrawersStory />,
};

export const WithPopover: StoryObj = {
  name: 'With Popover',
  render: () => <WithPopoverStory />,
};

export const WithTooltip: StoryObj = {
  name: 'With Tooltip',
  render: () => <WithTooltipStory />,
};

// ─── Playground ──────────────────────────────────────────

const PlaygroundStory = (args: {
  placement: DrawerPlacement;
  width: number;
  height: number;
  disableBackdropClick: boolean;
  disableEscapeKey: boolean;
  closeButtonPlacement: DrawerCloseButtonPlacement;
}) => {
  const [open, setOpen] = useState(false);
  const isHorizontal = args.placement === 'left' || args.placement === 'right';

  return (
    <div style={{ padding: 32 }}>
      <StoryButton onClick={() => setOpen(true)}>
        Open Playground Drawer
      </StoryButton>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement={args.placement}
        width={isHorizontal ? args.width : undefined}
        height={!isHorizontal ? args.height : undefined}
        disableBackdropClick={args.disableBackdropClick}
        disableEscapeKey={args.disableEscapeKey}
        closeButtonPlacement={args.closeButtonPlacement}
      >
        <div style={drawerContentStyle}>
          <h2 style={{ margin: 0, fontSize: 18, paddingRight: 32 }}>Playground Drawer</h2>
          <p style={{ color: '#666', lineHeight: 1.6 }}>
            Thay đổi Controls ở panel dưới để test các props.
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export const Playground: StoryObj<{
  placement: DrawerPlacement;
  width: number;
  height: number;
  disableBackdropClick: boolean;
  disableEscapeKey: boolean;
  closeButtonPlacement: DrawerCloseButtonPlacement;
}> = {
  name: 'Playground',
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Side to slide in from',
    },
    width: {
      control: { type: 'number', min: 100, max: 800 },
      description: 'Width for left/right placement (px)',
    },
    height: {
      control: { type: 'number', min: 100, max: 600 },
      description: 'Height for top/bottom placement (px)',
    },
    disableBackdropClick: {
      control: 'boolean',
      description: 'Disable closing on backdrop click',
    },
    disableEscapeKey: {
      control: 'boolean',
      description: 'Disable closing on ESC key',
    },
    closeButtonPlacement: {
      control: { type: 'select' },
      options: ['inside', 'outside', 'none'],
      description: 'Close button placement',
    },
  },
  args: {
    placement: 'right',
    width: 320,
    height: 280,
    disableBackdropClick: false,
    disableEscapeKey: false,
    closeButtonPlacement: 'inside',
  },
  render: (args) => <PlaygroundStory {...args} />,
};

