import { defineConfig, devices } from '@playwright/test';

// The browser tests exercise every build, including ones the release gate holds back from the public export,
// so both the test runner and the local dev server run in release-gate preview mode (never used in production).
process.env.RELEASE_GATE_PREVIEW = '1';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: { baseURL: 'http://localhost:3000', trace: 'on-first-retry' },
  webServer: {
    command: 'pnpm --filter @rn/web dev',
    env: { RELEASE_GATE_PREVIEW: '1' },
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } }
  ]
});
