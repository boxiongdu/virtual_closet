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

## 2026-07-26 — Full-bleed clothing cards

- Kept the existing two-column Closet layout, clothing data, navigation, and
  item interactions unchanged.
- Updated clothing cards so the garment image or local placeholder fills the
  complete card surface.
- Moved item name, category, and color into a bottom-left image overlay.
- Added a shared translucent image-overlay color token to preserve text
  legibility across light and dark garment imagery.
- Did not add dependencies or change clothing-store behavior.

## 2026-07-26 — Full-screen clothing detail

- Kept clothing lookup, routing, edit mode, archive, and delete behavior
  unchanged.
- Updated the clothing detail presentation to use the garment image or
  placeholder as a full-screen background.
- Consolidated the name, category, color, and brand into a bottom-left overlay.
- Moved Edit, Archive, and Delete into a top-right overflow menu while
  preserving their existing actions.

## 2026-07-26 — Date-led Looks experience

- Kept the Today route, tab navigation, outfit data model/store, Calendar, and
  Closet unchanged.
- Reframed the Today screen as the primary Looks experience with a horizontally
  snapping date selector.
- Made the selected date control one large, image-first outfit canvas.
- Replaced the upload-page composition with a personal-lookbook layout and an
  editorial empty-date state.

## 2026-07-27 — Phase 1 persistent Looks

- Finalized the Outfit model as `id`, `imageUri`, `date`, and `createdAt`; no
  captions or tags are stored.
- Replaced mock, memory-only looks with AsyncStorage metadata hydration and
  persistence.
- Added app-document image storage so picker cache URIs are copied to a stable
  local location before metadata is saved.
- Enforced one outfit per date. Saving again for the same date preserves the
  logical item ID, replaces its metadata and image, and removes the previous
  app-managed image when possible.
- Added camera and photo-library selection, a full-screen preview, and explicit
  Save Look confirmation.
- Connected the existing Looks canvas and date selector without redesigning
  them; dates with saved outfits now show an existence indicator.
- Added only the required Expo-compatible dependencies:
  `expo-image-picker`, `expo-file-system`, and
  `@react-native-async-storage/async-storage`.

## 2026-07-27 — Looks editorial UI pass

- Limited the first gradual visual-refactor pass to the Looks screen; Calendar,
  Closet, shared navigation, and all product behavior remain unchanged.
- Strengthened the Looks masthead and compact date metadata to establish a
  clearer editorial typography hierarchy.
- Replaced pill-shaped date cards with a transparent, ruled date strip and a
  simple active underline.
- Removed the bordered, rounded-card treatment from the look canvas so saved
  outfit photography carries the page.
- Reduced image overlays and controls to compact, square-edged editorial labels.
- Kept the documented warm-paper palette and existing design tokens; no
  dependency or data-model changes were made.

## 2026-07-27 — Looks UI refinement v0.2

- Kept the existing Looks data flow, upload actions, date scrolling, route
  behavior, and bottom navigation unchanged.
- Replaced the ruled calendar-like date strip with independent circular date
  controls and removed weekday labels.
- Added Looks-specific archive-background and memory-accent tokens so the
  yellow highlight remains isolated from buttons and navigation elsewhere.
- Preserved outfit-existence feedback as a restrained memory dot beneath its
  date.
- Removed the dark metadata and action overlays from saved photographs.
  Metadata and the Replace action now sit beneath the image on the warm paper
  background.

## 2026-07-27 — Looks photo composition refinement

- Restored the taller rectangular photo presentation by returning metadata and
  the Replace action to floating positions over the image.
- Removed the gap between the date selector and photo canvas.
- Kept the photograph free of dark panels or translucent scrims; light text
  uses only a restrained shadow for legibility.
- Preserved all existing photo, date, detail, and replacement interactions.

## 2026-07-27 — Looks date-strip spacing

- Removed excess vertical spacing immediately above and below the Looks date
  selector.
- Extended the photo canvas to the available horizontal edges, increasing the
  image area without changing any interaction or content.

## 2026-07-27 — Looks header hierarchy refinement

- Removed the duplicate selected-date label from the top-right of the Looks
  header; the photo caption remains the date reference.
- Reduced date circles to 44 points and tightened the header-to-selector
  spacing.
- Moved the photo upward while retaining a narrow horizontal paper margin.
- Preserved all date selection, upload, persistence, and navigation behavior.

## 2026-07-27 — Looks header hierarchy v0.3

- Integrated the horizontal date selector into the same header row as the
  Looks title, removing the separate calendar-section composition.
- Reduced date markers to 40 points and tightened the header's top, internal,
  and bottom spacing.
- Reclaimed the removed vertical section for the outfit photograph without
  changing date selection, upload, navigation, or stored data.

## 2026-07-27 — Final Looks archive identity

- Standardized the Looks display date as `MM.DD.YYYY`.
- Replaced the generic Daily Look label with a global `LOOK No.xxx` identity
  derived from outfit creation order, avoiding any outfit data-model migration.
- Preserved the original creation timestamp when replacing a day's image so
  the archive number remains stable.
- Encoded saved-memory states directly in date circles: today's saved Look uses
  `#E6AF00`, prior saved Looks use `#E6C875`, and empty dates remain outlined.
- Moved date and Look number beneath the hero image to keep photography free of
  overlays, with date as secondary context and Look number as primary metadata.

## 2026-07-27 — Taobao/Tmall Closet import MVP

- Changed the Closet add button from direct form navigation to a minimal
  three-option sheet: Take Photo, Upload Photo, and Import from Link.
- Connected the two photo options to the installed Expo image picker and kept
  the existing clothing form and card presentation unchanged.
- Added local validation for HTTP(S) Taobao, Tmall, and common `tb.cn` share
  links. The app does not request, scrape, or parse product pages.
- Added separate link-entry and manual preview routes. URL imports use a local
  placeholder and require the user to enter name, category, and color.
- Replaced the legacy optional `sourceUrl` field with a discriminated clothing
  source (`photo` or `url` with URL). Existing mock/photo items are explicitly
  marked as photo sources.
- Allowed an optional manual clothing name while retaining the existing
  generated-name fallback for photo-created items.
- Added no dependencies, backend integration, commerce behavior, automatic
  categorization, or product metadata extraction.

## 2026-07-27 — Taobao mobile share-text support

- Updated the import field to accept complete Taobao mobile share text and
  extract the first supported HTTP(S) Taobao or Tmall URL automatically.
- Added support for `e.tb.cn` short links alongside desktop Taobao, Tmall, and
  existing `tb.cn` links.
- Added a six-second, best-effort redirect lookup for Taobao short links. A
  network, timeout, or redirect failure falls back to the original extracted
  URL and never blocks manual preview/save.
- Added the `taobao` clothing source variant with `originalUrl` and optional
  `resolvedUrl`. Photo sources and the previous URL variant remain compatible.
- Kept product title, image, price, brand, and category extraction explicitly
  out of scope.

## 2026-07-27 — Closet editorial archive v0.1

- Replaced the equal-height Closet card grid with a dependency-free,
  independently flowing two-column composition using varied image ratios.
- Removed all names, categories, colors, borders, shadows, rounded corners,
  and metadata overlays from the gallery; each tile is now only its image or
  local placeholder state.
- Added minimal text filters for All, Tops, Bottoms, Outerwear, Shoes, and
  Accessories, with All as the default.
- Kept `one_piece` items visible under All because the requested filter set
  does not include a dresses or one-piece category.
- Changed the detail page to open image-first. Tapping the image toggles a
  square-edged warm-paper museum label containing name, category, color, brand,
  and source.
- Preserved the existing edit/archive/delete menu and all photo/Taobao add
  flows. Updated the sheet label from the generic Import from Link to Add from
  Taobao without changing import behavior.
- Added no layout library, AI, tagging, shopping, wear-history, or outfit-link
  functionality.

## 2026-07-27 — Closet item detail v0.2

- Kept the garment image as the full-screen background and removed the opaque,
  separated museum-label presentation.
- Added a bottom-up 280ms reveal for a near-full-width warm-white translucent
  information layer. No blur dependency, borders, shadows, or flip effect were
  introduced.
- Added display-only `ITEM No.xxx` numbering derived from the existing item ID,
  leaving the clothing data model unchanged.
- Preserved the existing image tap, detail dismissal, edit, archive, delete,
  navigation, and source-display behavior.

## 2026-07-27 — Closet detail overlay integration

- Limited this refinement to the individual Closet item detail screen shown in
  the supplied reference.
- Extended the revealed archive label edge-to-edge and to the bottom of the
  screen, incorporating the device safe-area inset inside its content instead
  of leaving an external gap.
- Reduced the warm-white layer opacity so the image remains visible and
  increased the reveal travel/duration for a more deliberate bottom-up motion.
- Quieted the top controls and removed borders/rounding from the management
  dropdown without changing any actions.

## 2026-07-27 — Full-screen Closet detail reveal

- Expanded the tap-revealed translucent archive layer to fill the entire
  clothing detail screen.
- Kept the museum-label content anchored near the bottom and the garment image
  visible beneath the layer.
- Preserved the existing reveal animation, dismissal, navigation, and
  management controls.

## 2026-07-27 — Closet detail reveal translucency

- Reduced the full-screen warm-white reveal layer opacity to `0.26`, keeping
  the clothing image substantially visible beneath the archive information.

## 2026-07-27 — Closet Add Item flow

- Reused the existing three-option action sheet and Expo image-picker logic for
  camera, album, and Taobao entry paths.
- Added one shared archive-confirmation component for photo and Taobao items,
  with a large image/placeholder, required name/category, optional color/brand,
  and a read-only source.
- Added a synchronous duplicate-save guard so repeated Save taps create exactly
  one item.
- Photo confirmation rejects missing images; Taobao confirmation rejects a
  missing source URL; both show focused validation for empty name or category.
- Extracted a name suggestion from text already present after a pasted Taobao
  mobile share URL. No page scraping, network title lookup, image extraction,
  or automatic categorization was added.
- Kept `one_piece` in the underlying data model and edit form, while the new
  creation flow follows the requested five-category list.
- Made color optional for both new confirmation and the existing edit form;
  empty detail values render as an em dash.
- Made no navigation, Looks, gallery, or clothing source-model changes.

## 2026-07-27 — Closet native input and save navigation

- Confirmed the existing Expo image-picker implementation and native permission
  plugin configuration for camera and photo-library access.
- Added a short modal-dismissal handoff before presenting either native picker,
  preventing the add sheet and system picker from competing for presentation.
- Added an in-flight guard so repeated camera/library taps cannot open multiple
  native pickers.
- Changed shared photo/Taobao confirmation Save behavior to dismiss the entire
  add stack back to the existing Closet tab instead of opening item detail.
- Reset the gallery to All when starting an add flow and scroll it to the top
  after its active-item count increases, making the newly prepended item
  immediately visible.
- Made no Taobao parsing, redirect, import, source-model, Looks, tab, or detail
  changes.

## 2026-07-27 — Shared Looks/Closet image picker

- Wired the Closet sheet's visible Take Photo and Upload Photo rows directly to
  the same `pickOutfitImage` helper used by the Looks add-today flow.
- Removed the redundant Closet-specific image-picker module.
- Matched Looks behavior by keeping the source sheet open while the native
  picker is active, then closing it only after a camera/library image is
  returned and the confirmation route is ready.
- Kept the existing in-flight guard, confirmation screen, save navigation, and
  Taobao button/logic unchanged.

## 2026-07-27 — Closet Update Clothing editor

- Rebuilt the existing item-only edit component as an image-first archive
  editor; the create flow continues using its separate confirmation component.
- Removed placeholder-tone controls, raw image-URI input, and editable source
  URL/debug-style fields.
- Made the current garment image the hero. Tapping it offers Camera or Album
  replacement through the same picker helper used by Looks and Closet add.
- Added editable name, category, color, brand, purchase date, and optional
  notes. Purchase date and notes are optional additions to the existing item
  model.
- Kept source type and source URL read-only to preserve provenance. URL-backed
  items expose an Open Source action through the platform linker.
- Save updates the existing ID through `updateClothing` and invokes the detail
  page's existing completion callback, so no new item is created and the user
  remains on item detail.
- Added no date-picker, form, styling, image, or navigation dependency.

## 2026-07-27 — MVP release polish v0.3

- Changed outfit upserts and display numbering to chronological `date`
  ascending order. Adding an older date renumbers the archive chronologically;
  replacing a date preserves its single record and resulting number.
- Removed all six seeded Closet mock items and rejected legacy
  `placeholder://` outfit records during hydration. Removed placeholder outfit
  rendering from Looks and Calendar thumbnails.
- Added the intentional empty Closet state: “Your closet is empty. Start
  building your archive.” with a direct Add your first piece action.
- Added dependency-free, monochrome thin-outline icons for Looks (camera
  frame), Calendar, and Closet (hanger), retaining all existing labels.
- Added a single persisted first-launch welcome screen backed by AsyncStorage.
  START records completion and opens Looks; later root launches bypass it.
- Added reset functions for outfit metadata/managed images, in-memory Closet
  items, and onboarding completion.
- Hid Reset Demo Data behind a 1.2-second long-press Developer bar and a second
  destructive confirmation. Successful reset routes to onboarding as a fresh
  launch.
- Kept legitimate no-image Taobao items compatible with a quiet archive state;
  no extraction or new product feature was added.

## 2026-07-27 — One-time Looks and Calendar cleanup

- Added a one-time v0.3 migration that clears previously persisted Look
  metadata and deletes the app-managed Looks image directory on the next cold
  launch.
- Calendar clears through the same operation because it derives its entries
  from the outfit store.
- Persists a cleanup-complete marker so Looks saved after the migration are
  never removed by this cleanup again.

## 2026-10-31 — Browser compatibility foundation (portfolio demo)

- Chose an Expo Router single-page web export with Metro. The existing native
  iOS/Android application and EAS profiles are unchanged.
- Moved native outfit-photo file operations into a platform-resolved adapter;
  browsers use a separate adapter and do not import native Expo FileSystem.
- The initial web adapter converts browser-selected images to data URLs for
  AsyncStorage metadata persistence. This is an interim solution for small
  demo photos, NOT a scalable photo library: browser storage quotas may cause
  large or numerous image saves to fail. A later portfolio phase should use
  IndexedDB for image blobs and persist Closet items as well.
- Skipped native camera/photo permissions for the web image picker so the
  browser file dialog remains directly connected to a user click.
- Added a repeatable web export script and CI smoke check (typecheck, lint,
  web export) to verify future browser builds. No hosted release, backend,
  Supabase, Docker, or new product features were added.
- Scope remains focused on browser compatibility; live browser interaction,
  persistence under refresh, and desktop layouts must be validated separately.

## 2026-10-31 — Browser photo upload path

- Focused the browser milestone on selecting, previewing, saving, and displaying
  a photo in Looks and selecting a photo in Closet; deferred wider persistence.
- Added a short-lived image handoff for Expo Router navigation. Browser-selected
  data URLs stay in module memory rather than being embedded in route URLs.
- Relabeled browser photo options to Upload from Computer and hid the native
  Camera action on web. Native camera and photo-library flows remain unchanged.
- Downscaled web outfit photos to at most 1200px on the longest side and JPEG
  quality 0.72 before saving via the interim AsyncStorage-backed image adapter.
- Browser-selected previews are intentionally temporary; a refresh on a preview
  route requires choosing the image again.
- Added a browser upload smoke test to exercise the UI, not just web bundling.
- No Supabase, IndexedDB, Docker, hosted release, or account functionality.
