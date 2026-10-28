<img src="public/brand/logo-400.webp" width="260" height="81" alt="Southbelt Repair and Supply Inc." />

# Southbelt Repair and Supply

Website for a Texas company that builds, supplies and repairs concrete batch plants.

[southbelt.taylorurl.com](https://southbelt.taylorurl.com)

<img src="https://img.shields.io/badge/version-2026.44.2-272b67?style=for-the-badge" alt="Version 2026.44.2" />

Every machine, part, used unit and rental has its own page. It's staged at southbelt.taylorurl.com and kept out of search until it moves to southbeltinc.com.

## Where requests go

There's no backend. A request is an email the browser writes, addressed to whoever handles it: plant, pugmill and equipment quotes to quotes@, rentals to rentals@, and parts, service and everything else to sales@. The message is shown on screen as well, for anyone without a mail client. Parts can be collected into a quote list first, which is kept in `localStorage`.

## Content

Machines, specs, parts, brands, rentals, used equipment and the FAQ are modules in `src/content/`. The spec tables in `equipment-specs.js` only load on the detail page. Every figure is one the company publishes, and when the website and a brochure disagree, the brochure wins.

`scripts/generate-crawl-files.mjs` runs before each build and writes the sitemap, `robots.txt`, `llms.txt`, the LocalBusiness JSON-LD and the nav from those same modules.

## Going live

Indexing is one switch. Until `VITE_SITE_INDEXABLE` is `true`, `robots.txt` blocks every crawler and every page carries `noindex, nofollow`. Moving to southbeltinc.com means setting that and `VITE_SITE_URL` on Vercel, then redeploying.

## Running it

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # crawl files, vite build, then the stylesheet inline
```

Node 22. The build inlines the full stylesheet (45 kB, about 9 kB over the wire) so there's no blocking CSS request.

React 19, React Router 7, Vite 7, Tailwind CSS 3, on Vercel. Proprietary, see [LICENSE.md](LICENSE.md).

Built and maintained by [TaylorURL](https://www.taylorurl.com).
