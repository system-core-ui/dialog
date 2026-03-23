import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock @thanh-libs/button — npm package uses @thanh-libs/source condition
// pointing to src/ which is not shipped, causing resolution failures in CI.
vi.mock('@thanh-libs/button', () => ({
  Button: vi.fn((props: Record<string, unknown>) => null),
  IconButton: vi.fn((props: Record<string, unknown>) => null),
}));
