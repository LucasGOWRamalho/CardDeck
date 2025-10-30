const useRouter = jest.fn(() => ({
  push: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
}));

const usePathname = jest.fn(() => '');
const useSearchParams = jest.fn(() => new URLSearchParams());

module.exports = {
  useRouter,
  usePathname,
  useSearchParams,
};