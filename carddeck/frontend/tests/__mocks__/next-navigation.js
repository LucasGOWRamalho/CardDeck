// Mock correto para next/navigation
const mockUseRouter = {
  push: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
};

const useRouter = jest.fn(() => mockUseRouter);
const usePathname = jest.fn(() => '');
const useSearchParams = jest.fn(() => new URLSearchParams());

module.exports = {
  useRouter,
  usePathname,
  useSearchParams,
};