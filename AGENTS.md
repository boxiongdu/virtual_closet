# Project instructions

## Product

This is a private, single-user virtual closet MVP.

Read these files before making changes:

- docs/PRD.md
- docs/MVP_SCOPE.md

Do not add functionality listed as out of scope.

## Technology

- Expo React Native
- TypeScript with strict mode
- Expo Router
- Supabase
- TanStack Query
- React Hook Form

## Architecture

- Screens handle routing and page composition.
- Reusable UI belongs in components.
- Database calls belong in feature API files.
- Do not put Supabase queries directly inside screens.
- Avoid unnecessary abstractions.
- Prefer simple readable code over generalized frameworks.

## Working rules

- Make one small, testable change at a time.
- Before changing multiple files, briefly state the plan.
- Run TypeScript checking after meaningful changes.
- Run the app or relevant tests after implementation.
- Fix errors introduced by the change.
- Do not install new dependencies unless they are necessary.
- Do not perform destructive database operations without approval.
- Preserve existing working behavior.