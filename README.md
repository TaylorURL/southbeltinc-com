<p align="center">
  <img src="public/brand/logo-400.webp" width="260" height="81" alt="Southbelt Repair and Supply Inc." />
</p>

<h1 align="center">Southbelt Repair and Supply</h1>

<p align="center">Website for a Texas company that builds, supplies and repairs concrete batch plants.</p>

<p align="center"><a href="https://southbelt.taylorurl.com">southbelt.taylorurl.com</a></p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2026.44.0-272b67?style=for-the-badge" alt="Version 2026.44.0" />
</p>

Southbelt Repair & Supply has been servicing concrete batch plants since 2002, from yards in Houston (Pasadena), San Marcos and Dallas. They build plants, pugmills and silos, sell parts, run repair crews and rent equipment. The site gives each machine and part its own page, and every request goes out as an email to the right desk.

It's staged at southbelt.taylorurl.com and kept out of search engines until it moves to southbeltinc.com.

## What's on the site

- A page for each of the 11 machines, with specs and a PDF brochure
- A parts catalog you can search or filter by category
- Used equipment for sale and the rental fleet
- A quote list: collect parts, then send the whole list to the parts counter in one email
- Quote buttons and the contact form address sales, quotes or rentals by topic, with the machine already in the subject line
- The three yards with addresses and phone numbers
- Light and dark themes

There's no server or database. Requests open in the visitor's own mail program, and the quote list is kept in the browser.

## Running it locally

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173. Nothing needs to be configured to run it. `npm run build` builds to `dist/` and `npm run preview` serves the build.

`.env.example` lists the two settings that only matter once it's deployed:

| Variable              | What it does                                                   |
| :-------------------- | :------------------------------------------------------------- |
| `VITE_SITE_URL`       | The domain used in canonical links, the sitemap and Open Graph |
| `VITE_SITE_INDEXABLE` | Set to `true` to let search engines index the site             |

Moving to southbeltinc.com means setting both on Vercel and redeploying.

## Built with

React 19, Vite 7, React Router 7, Tailwind CSS. Hosted on Vercel.

## License

Proprietary. See [LICENSE.md](LICENSE.md).

Built and maintained by [TaylorURL](https://www.taylorurl.com).
