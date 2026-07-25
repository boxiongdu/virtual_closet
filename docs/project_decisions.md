# Project Decisions

## 2026-07-25 — Initial Expo foundation

### Scope reviewed

- Read `AGENTS.md`.
- `docs/PRD.md` was not present, so the available PRD was read from
  `docs/virtual_closet_prd.md`.
- Read `docs/MVP_SCOPE.md` and the existing lowercase
  `docs/mvp_scope.md`.
- Limited the implementation to a private, single-user application shell.
- Did not add Supabase, authentication, backend code, AI, image processing,
  recommendations, shopping, social features, fake data, state management, or
  a styling framework.

### Project initialization

- Created an Expo SDK 54 React Native project configuration.
- Enabled Expo Router through the `expo-router/entry` entry point and the
  `expo-router` app plugin.
- Enabled Expo Router typed routes.
- Enabled strict TypeScript checking with `"strict": true`.
- Enabled the React Native new architecture in the Expo configuration.
- Added npm scripts for starting Expo, opening Android/iOS/web, linting, and
  typechecking.

### Navigation and screens

- Created a root stack layout in `app/_layout.tsx`.
- Created a bottom-tab layout in `app/(tabs)/_layout.tsx`.
- Added exactly two tabs:
  - Closet
  - Calendar
- Configured Closet as the initial tab.
- Added `app/(tabs)/closet.tsx`, displaying only `Closet`.
- Added `app/(tabs)/calendar.tsx`, displaying only `Calendar`.
- Did not add tab icons or additional screens to avoid unnecessary
  dependencies and functionality.

### Directory structure

Created the requested project directories:

```text
app/
  _layout.tsx
  (tabs)/
    _layout.tsx
    closet.tsx
    calendar.tsx
components/
  shared/
features/
  clothing/
  outfits/
hooks/
lib/
types/
docs/
```

Empty directories contain `.gitkeep` files so Git can preserve the intended
structure.

### Configuration files

- Added `app.json` with the Expo application metadata and Router plugin.
- Added `package.json` with application scripts and dependencies.
- Generated `package-lock.json` during dependency installation.
- Added `tsconfig.json`, extending Expo's base TypeScript configuration.
- Added `expo-env.d.ts` for Expo types; it is ignored because Expo manages it.
- Added `eslint.config.js` using Expo's flat ESLint configuration.
- Added `.gitignore` for Expo output, dependencies, native credentials, logs,
  local environment files, and TypeScript build information.
- Scoped the lint script to `eslint app`. Expo's default directory discovery
  rejected requested placeholder directories containing only `.gitkeep`
  files, while the application source itself linted correctly.

### Dependencies installed

Runtime dependencies:

- `expo`
- `expo-constants`
- `expo-linking`
- `expo-router`
- `expo-status-bar`
- `react`
- `react-native`
- `react-native-safe-area-context`
- `react-native-screens`

Development dependencies:

- `@types/react`
- `typescript`
- `eslint`
- `eslint-config-expo`

No other application libraries were intentionally added.

### Commands and validation

The following project commands were completed:

```bash
npm install
npm run lint
npx tsc --noEmit
npx expo start --offline
```

Results:

- Dependency installation completed and created the lockfile.
- ESLint passed with no reported issues.
- Strict TypeScript checking passed with no reported issues.
- Expo Metro started successfully and advertised the development URL
  `exp://192.168.0.109:8081`.
- The verification server was stopped cleanly after startup was confirmed.

### Environment notes

- The first attempt to use `npx create-expo-app` failed because `npx` was not
  initially available.
- An attempt to install Node.js with Homebrew failed because that Homebrew
  installation did not recognize macOS version `26.5.2`.
- A request to download a temporary official Node.js binary was declined and
  made no project changes.
- Node.js, npm, and npx later became available from `/usr/local/bin`, allowing
  installation and checks to proceed.
- The first sandboxed `npm install` stalled because registry access was
  restricted. It was stopped and rerun with approved registry access.
- The first lint attempt was blocked when Expo tried to create its user
  settings directory under `~/.expo`. After the required permission was
  granted, lint reached ESLint; the lint script was then scoped as documented
  above to handle placeholder-only directories.
- npm reported deprecation notices and 36 audit findings in transitive
  dependencies (10 moderate and 26 high). No automatic or forced audit fix was
  applied because it could introduce versions incompatible with Expo.

### Manual development command

To start the project again:

```bash
npx expo start
```

The developer can then use Expo Go or an installed iOS/Android simulator.
