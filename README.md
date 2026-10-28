<img src="public/brand/logo-400.webp" width="260" height="81" alt="Southbelt Repair and Supply Inc." />

# Southbelt Repair and Supply

Website for a Texas company that builds, supplies and repairs concrete batch plants.

[southbelt.taylorurl.com](https://southbelt.taylorurl.com)

<img src="https://img.shields.io/badge/version-2026.44.0-272b67?style=for-the-badge" alt="Version 2026.44.0" />

Every machine, part, used unit and rental gets its own page. No backend. A request is an email built in the browser and sent to the desk that handles it.

Staged at southbelt.taylorurl.com and kept out of search engines until it moves to southbeltinc.com.

## How it's built

- **Content is data.** Machines, specs, parts, brands, rentals, used equipment and the FAQ are modules in `src/content/`. The spec tables (`equipment-specs.js`) are only loaded by the detail page. Every figure is one the company publishes. If the website and a brochure disagree, the brochure wins.
- **Crawl files are generated.** `scripts/generate-crawl-files.mjs` runs before every build and writes the sitemap, `robots.txt`, `llms.txt`, the LocalBusiness JSON-LD and the shell's nav from the same modules the pages use.
- **Requests go to the right desk.** Plant, pugmill and equipment quotes go to quotes@. Rentals go to rentals@. Parts, service and everything else go to sales@. The message is plain text plus a `mailto:` link, and the text is shown on screen for anyone without a mail client.
- **Quote list.** `QuoteProvider` holds parts, quantities and notes in `localStorage`.
- **Real first screen.** `index.html` carries the home page's first screen as markup and every path rewrites to it. Home ships in the entry bundle, other routes are lazy chunks, React is its own `framework` chunk.

<details>
<summary>Decisions and tradeoffs</summary>

- `scripts/first-screen.mjs` inlines the whole stylesheet after the build. 45 kB of CSS, about 9 kB over the wire. In return there's no blocking stylesheet request and no layout shift when React takes over.
- `src/lib/chunk-recovery.js` reloads a tab once when a chunk from an old deploy is gone. An inline script in `index.html` covers the entry bundle itself not arriving.
- Indexing is one switch. Until `VITE_SITE_INDEXABLE` is `true`, `robots.txt` blocks every crawler and every page carries `noindex, nofollow`. Flip it and the next build opens all of it.
- Targets Chrome and Edge 107, Firefox 104 and Safari 16.
- `middleware.js` checks a TaylorURL status endpoint and shows a holding page if the site is paused. Fails open. `api/version.js` returns the deployed commit, uncached.
- The bottom footer bar is [`@taylorurl/split-rail`](https://github.com/TaylorURL/split-rail), pinned to a tag.

</details>

## Running it locally

Needs Node 22.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # crawl files, vite build, then the stylesheet inline
npm run lint
npm run format:check
```

<details>
<summary>Configuration</summary>

`.env.example` lists the two settings that only matter once it is deployed:

| Variable              | What it does                                                   |
| :-------------------- | :------------------------------------------------------------- |
| `VITE_SITE_URL`       | The origin used in canonical links, the sitemap and Open Graph |
| `VITE_SITE_INDEXABLE` | Set to `true` to let search engines index the site             |

Moving to southbeltinc.com means setting both on Vercel and redeploying.

</details>

## Built with

React 19, React Router 7, Vite 7 and Tailwind CSS 3. Hosted on Vercel.

<details>
<summary>License</summary>

Proprietary. See [LICENSE.md](LICENSE.md).

</details>

Built and maintained by [TaylorURL](https://www.taylorurl.com).
