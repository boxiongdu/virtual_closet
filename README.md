# Virtual Closet

A private, image-first outfit diary and wardrobe archive built with **Expo React Native, TypeScript, and Expo Router**.

## Portfolio

After GitHub Pages is enabled in repository settings and the publishing workflow succeeds:

- **Interactive browser demo:** https://boxiongdu.github.io/virtual_closet/
- **Project case study:** https://boxiongdu.github.io/virtual_closet/project.html

The two URLs above are deployment targets, **not confirmed live links** until GitHub Pages is configured and the workflow has deployed successfully.

## Product

Virtual Closet emphasizes a daily habit: save a Look, browse the Calendar, and gradually add items to a personal Closet.

| Experience | What it does |
| --- | --- |
| Looks | Capture/upload an outfit photo for a selected day, preview, and save it |
| Calendar | Browse the current month's saved Looks |
| Closet | Add, browse, edit, archive, and delete garments; enter supported Taobao/Tmall links |

The current MVP **does not implement AI outfit recommendations or item-level wear analytics**.

## Engineering

- Expo React Native with Expo Router and strict TypeScript.
- Shared application screens for native and browser deployments.
- Separate platform adapters for native device photos and browser images.
- Local-only data: native outfit photos use Expo FileSystem, while the browser currently stores resized outfit images through an interim AsyncStorage-backed approach.
- The clothing store remains in-memory and resets on a full page reload.
- GitHub Actions runs static checks and a production web export, with a GitHub Pages deployment workflow for the public demo.

## Run locally

```bash
npm ci
npm run web
```

For a production-like web export:

```bash
npm run web:export
npx expo serve
```

## Publishing with GitHub Pages

1. Navigate to **Settings → Pages** in this repository.
2. Set **Build and deployment → Source → GitHub Actions**.
3. Merge the browser compatibility + portfolio changes into `main`, or re-run **Publish portfolio demo** after Pages is enabled.
4. Wait for a successful deployment before sharing the links above.

The GitHub Actions publishing workflow applies the repository-specific Expo Router `baseUrl` of `/virtual_closet` **only during the hosted build**, so local development and native routing remain unchanged. The generated static files include a fallback `404.html` for browser-side navigation.

## Scope and limitations

This is a single-user portfolio prototype, not a production cloud service. Browser photo storage has practical quota limits, clothing data is currently ephemeral, and uploads have not been tested in a hosted browser environment. Photos are not uploaded to a backend. See `docs/project_decisions.md` and the product requirements under `docs/` for architecture decisions and planned work.

## Author

**Boxiong Du** · [LinkedIn](https://www.linkedin.com/in/boxiong-du) · [GitHub](https://github.com/boxiongdu)
