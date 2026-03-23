import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';

// Mock @thanh-libs/button — npm package exports @thanh-libs/source condition
// pointing to src/ which isn't shipped, causing resolution failures in CI.
vi.mock('@thanh-libs/button', () => ({
  Button: vi.fn(({ children, ...props }: Record<string, unknown>) =>
    React.createElement('button', props, children),
  ),
  IconButton: vi.fn(({ children, ...props }: Record<string, unknown>) =>
    React.createElement('button', props, children),
  ),
}));
