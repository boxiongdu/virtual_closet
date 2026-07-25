# UI Reference Notes

## Purpose

This document records the visual direction extracted from the five reference
screenshots supplied on 2026-07-25. The references are inspiration rather than
templates. The Virtual Closet should remain original, product-appropriate, and
within the MVP scope.

## Shared visual direction

The references combine editorial fashion layouts with a compact mobile
dashboard. Their strongest shared qualities are restraint, confident type,
precise alignment, and generous negative space. The intended Virtual Closet
expression is a quiet, premium wardrobe tool rather than an ecommerce catalog
or a dense productivity dashboard.

### Layout structure

- Prefer one clear focal area per screen.
- Use generous outer margins and consistent alignment edges.
- Let content breathe before adding dividers or containers.
- Future closet browsing should favor an orderly image-led grid.
- Future calendar content should use clear groups with deliberate whitespace.
- Preserve a strong distinction between page content and bottom navigation.

### Spacing

- Use a small, consistent spacing scale instead of isolated values.
- Favor 24–48 point page spacing for primary composition.
- Use tighter 8–16 point spacing only inside related controls or cards.
- Keep large quiet areas around titles and key wardrobe imagery.

### Typography hierarchy

- Use system typography until a product font is intentionally selected.
- Page titles should be large, regular-weight, and editorial rather than bold.
- Body text should be compact and highly legible.
- Navigation and metadata may use small uppercase text with measured letter
  spacing.
- Avoid using many weights or sizes on the same screen.

### Card design

- Cards should have a light surface on a warm neutral background.
- Use restrained corner rounding; avoid excessively soft or playful shapes.
- Prefer hairline borders over heavy shadows.
- If elevation is necessary, keep it subtle and reserve it for floating
  navigation or primary actions.
- Image cards should let photography dominate, with concise metadata below.

### Navigation style

- Keep the two-tab navigation visually quiet and persistent.
- Use a contained, rounded surface with clear active and inactive text colors.
- Avoid decorative icons until an intentional icon system is selected.
- Do not add navigation destinations beyond Closet and Calendar.

### Visual density

- Default to low density and progressive disclosure.
- Avoid dashboards filled with metrics, badges, or controls.
- Do not reproduce ecommerce pricing, sales, cart, or shopping patterns.
- Present only information required for wardrobe browsing and outfit history.

### Overall aesthetic

- Minimal and editorial.
- Warm, neutral, and tactile rather than stark clinical white.
- Mostly monochrome with a muted red accent used sparingly.
- Precise and calm, with fashion imagery becoming the visual focus when real
  closet content is introduced.

## Design tokens

The implementation source of truth is `lib/theme.ts`.

### Colors

- `background`: warm neutral page canvas
- `surface`: slightly brighter cards and navigation
- `text`: near-black primary content
- `textMuted`: secondary labels and inactive navigation
- `border`: warm hairline separators
- `accent`: muted heritage red for rare emphasis

### Spacing

The scale runs from `xs` (4) through `4xl` (64). Components should choose the
closest existing token before introducing a new value.

### Border radius

- `sm`: compact controls
- `md`: standard cards
- `lg`: prominent cards and navigation surfaces
- `pill`: fully rounded controls only

### Typography

The initial scale includes caption, body, subtitle, and title sizes with paired
line heights. New sizes should be added only when an actual hierarchy cannot
be expressed with the existing scale.

## Current application

- Closet and Calendar remain placeholder screens containing only their titles.
- Both screens use the shared page canvas and editorial title treatment.
- The existing bottom tabs use the shared surface, border, radius, spacing, and
  typography tokens.
- No screenshots, sample products, fake wardrobe data, or new features were
  added.

## Future usage rules

- Reuse tokens rather than hard-coding visual values.
- Keep reusable visual composition in `components/shared`.
- Use real user wardrobe imagery when image-led layouts are implemented.
- Maintain accessible contrast and touch targets even when pursuing a minimal
  look.
- Treat the accent color as emphasis, not decoration.
- Revisit tokens deliberately as real Closet and Calendar components emerge;
  do not expand the system speculatively.
