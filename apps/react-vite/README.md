<div align="center">
  <img src="src/assets/logo.svg" width="96" alt="Threadmere logo" />
</div>

# Threadmere

Threadmere is a standalone web app for threaded discussions and comments. Product and operations teams use it to keep each decision and the conversation behind it in one place.

> Threadmere is a fictional demo product. It is not affiliated with any real company or product with a similar name.

## Features

- **Threaded discussions:** start a discussion, then add Markdown comments under it.
- **Team workspaces:** each team gets its own workspace. The first user to register a team is its admin.
- **Role-aware permissions:** admins create, edit and delete discussions. Members comment and can delete their own comments.
- **Profiles:** each user can edit their own name and bio.
- **Demo data:** new workspaces can start with sample product and ops discussions, such as an onboarding checklist, a weekly ops review, a release go/no-go and a UI naming proposal.

## Get started

Prerequisites: Node 20+ and Yarn 1.22+.

```bash
cd apps/react-vite
cp .env.example .env
yarn install
yarn dev
```

Open http://localhost:3000, click **Get started** and register a new team. The API is mocked in the browser with MSW, so no backend is needed.

### Configuration

| Variable | Purpose |
| --- | --- |
| `VITE_APP_API_URL` | Base URL of the API. |
| `VITE_APP_ENABLE_API_MOCKING` | `true` serves the API from in-browser MSW mocks. |
| `VITE_APP_SEED_DEMO_DATA` | `true` seeds sample teammates, discussions and comments when a new team is registered. This is off in unit tests and e2e. |

Mock data is saved in the browser's `localStorage` (`msw-db`). To start fresh, clear it.

### Scripts

- `yarn dev`: run the app in development mode.
- `yarn build`: build for production into `dist`.
- `yarn test`: run the unit and integration tests (Vitest and Testing Library).
- `yarn test-e2e`: run the Playwright end-to-end tests. Copy `.env.example-e2e` to `.env` first, so demo seeding is off.
- `yarn lint` / `yarn check-types`: run ESLint and the TypeScript checks.

## Tech stack

React 18, Vite, TypeScript, TanStack Query, React Router, Tailwind CSS, Radix UI, MSW, Vitest and Playwright.

## Credits and license

Threadmere is built on the `apps/react-vite` example app from
[bulletproof-react](https://github.com/alan2207/bulletproof-react) by Alan Alickovic, at upstream commit `9506629`. The upstream architecture and much of the code are kept as they were. The rebrand changes the name, visuals, copy and demo data.

It is distributed under the MIT License. The original copyright notice (Copyright (c) 2024 Alan Alickovic) is kept in the repository root [`LICENSE`](../../LICENSE).
