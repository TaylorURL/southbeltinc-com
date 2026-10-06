import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * Writes every crawler-facing file from the same content modules the pages
 * render: public/sitemap.xml, public/robots.txt, public/llms.txt, and the
 * business JSON-LD block, the robots meta tag and the Equipment panel's
 * destination list inside index.html. A machine or a part added to the catalog
 * is in the sitemap and llms.txt on the next build, and a phone number changed in
 * company.js reaches the static structured data without a second edit. Any of
 * these maintained by hand goes stale the first time someone forgets, and a
 * stale one is worse than none, because it points crawlers at claims the site
 * no longer makes.
 *
 * robots.txt is generated here rather than kept as a static file so its
 * `Sitemap:` line cannot name a different domain than the sitemap it points
 * at. Both read the same origin, which comes from VITE_SITE_URL when the host
 * sets one.
 *
 * Indexing is one switch, VITE_SITE_INDEXABLE. Until it is 'true' the site is
 * a staging copy: robots.txt refuses every crawler, the shell carries
 * `noindex, nofollow`, and src/lib/seo.js writes the same on every route. The
 * day the site answers at its own domain, the host sets the variable and the
 * next build opens all three at once.
 *
 * Runs as the `prebuild` script, ahead of Vite copying `public/` into `dist/`.
 */

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const { company, addressOf, indexable } = await import(
  pathToFileURL(resolve(root, 'src/content/company.js'))
);
const { equipment, equipmentGroups } = await import(
  pathToFileURL(resolve(root, 'src/content/equipment.js'))
);
const { usedEquipment } = await import(
  pathToFileURL(resolve(root, 'src/content/used-equipment.js'))
);
const { rentalFleet } = await import(pathToFileURL(resolve(root, 'src/content/rentals.js')));
const { partCategories } = await import(
  pathToFileURL(resolve(root, 'src/content/part-categories.js'))
);
const { parts } = await import(pathToFileURL(resolve(root, 'src/content/parts.js')));
const { services } = await import(pathToFileURL(resolve(root, 'src/content/services.js')));
const { localBusinessSchema } = await import(
  pathToFileURL(resolve(root, 'src/lib/structured-data.js'))
);

/**
 * Vite rewrites `import.meta.env` for the bundle, but this script runs in plain
 * Node, so the same variable has to be read off `process.env` here. Without this
 * the generated files would keep the fallback origin while the pages used the
 * configured one.
 */
const siteUrl = (process.env.VITE_SITE_URL || company.url).replace(/\/$/, '');

/** `changefreq` and `priority` are hints; the ordering below reflects how often each page changes. */
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/equipment', priority: '0.9', changefreq: 'monthly' },
  { path: '/equipment/used', priority: '0.8', changefreq: 'weekly' },
  { path: '/rentals', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/parts', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.6', changefreq: 'yearly' },
  { path: '/contact', priority: '0.8', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms', priority: '0.2', changefreq: 'yearly' },
];

const equipmentRoutes = equipment.map((item) => ({
  path: `/equipment/${item.slug}`,
  priority: '0.8',
  changefreq: 'monthly',
}));

const partRoutes = parts.map((part) => ({
  path: `/parts/${part.slug}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const lastmod = new Date().toISOString().slice(0, 10);

const routes = [...staticRoutes, ...equipmentRoutes, ...partRoutes];

const body = routes
  .map(
    (route) =>
      `  <url>\n    <loc>${siteUrl}${route.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

/**
 * Crawlers that only collect training data. Named and refused so the stance is
 * a decision rather than a default: a citation in an AI answer sends a customer
 * here, so the fetchers behind those answers stay allowed, while inclusion in a
 * training set sends nothing back. Blocking Google-Extended does not affect
 * Search, and blocking GPTBot does not stop ChatGPT citing the site.
 */
const trainingCrawlers = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Bytespider',
  'CCBot',
  'Applebot-Extended',
  'meta-externalagent',
];

/**
 * The other half of the same decision. Each of these fetches a page because
 * somebody asked a question it answers, and the answer carries a link back, so
 * each is named and allowed rather than left to the wildcard. Naming both lists
 * is what makes the file a position on every crawler that matters, instead of a
 * list of refusals and silence for the rest.
 */
const citationCrawlers = ['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User'];

const openRobots = [
  'User-agent: *',
  'Allow: /',
  '',
  ...citationCrawlers.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
  ...trainingCrawlers.flatMap((agent) => [`User-agent: ${agent}`, 'Disallow: /', '']),
  `Sitemap: ${siteUrl}/sitemap.xml`,
  '',
].join('\n');

/** The staging answer: nothing is crawled, and no sitemap is offered. */
const closedRobots = ['User-agent: *', 'Disallow: /', ''].join('\n');

const robots = indexable ? openRobots : closedRobots;

/** The site's shape in one fetch, for readers that take llms.txt over a crawl. */
const hq = company.locations[0];
const llms = [
  `# ${company.name}`,
  '',
  `> ${company.legalName} builds concrete batch plants, pugmills and silos, supplies batch plant parts, repairs and maintains plant equipment, fabricates, and rents and sells equipment for the concrete and industrial industries. Servicing concrete batch plants since ${company.foundedYear}. Headquarters: ${addressOf(hq)}, ${hq.phone}. Email: ${company.email.sales}.`,
  '',
  '## Locations',
  '',
  ...company.locations.map(
    (location) => `- ${location.name} (${location.role}): ${addressOf(location)}, ${location.phone}`
  ),
  '',
  '## Pages',
  '',
  `- [Equipment](${siteUrl}/equipment): ${equipmentGroups.map((group) => group.name).join(', ')}`,
  `- [Used equipment](${siteUrl}/equipment/used): ${usedEquipment.map((listing) => listing.name).join(', ')}, sold as-is, where-is`,
  `- [Rentals](${siteUrl}/rentals): ${rentalFleet.map((unit) => unit.name).join(', ')}; requests to ${company.email.rentals}`,
  `- [Services](${siteUrl}/services): ${services.map((service) => service.name).join(', ')}`,
  `- [Parts catalog](${siteUrl}/parts): ${partCategories.map((category) => category.name).join(', ')}`,
  `- [Quote list](${siteUrl}/quote): collect parts into one list and send it to ${company.email.sales}`,
  `- [About](${siteUrl}/about): since ${company.foundedYear}, the mission, and customer reviews`,
  `- [Contact](${siteUrl}/contact): the three yards, and requests to the sales, quotes and rentals desks`,
  `- [Privacy](${siteUrl}/privacy): what the site stores and what it sends`,
  `- [Terms of use](${siteUrl}/terms): what a request is, and how the pages may be used`,
  '',
  '## Equipment',
  '',
  ...equipment.map((item) => `- [${item.name}](${siteUrl}/equipment/${item.slug}): ${item.summary}`),
  '',
  '## Parts',
  '',
  ...parts.map((part) => `- [${part.name}](${siteUrl}/parts/${part.slug}): ${part.summary}`),
  '',
].join('\n');

/**
 * The static copy of the LocalBusiness block, replaced inside index.html so the
 * shell states the business identity to fetchers that never run the app. The
 * script tag's id is the anchor; everything between its tags is rewritten.
 */
const indexPath = resolve(root, 'index.html');
const indexHtml = await readFile(indexPath, 'utf8');
const block = JSON.stringify(localBusinessSchema(), null, 2).replace(/^/gm, '      ');
let synced = indexHtml.replace(
  /(<script type="application\/ld\+json" id="local-business">)[\s\S]*?(<\/script>)/,
  `$1\n${block}\n    $2`
);
if (synced === indexHtml && !indexHtml.includes('id="local-business"')) {
  throw new Error('index.html has no <script id="local-business"> block to sync');
}

const robotsMeta = /<meta name="robots" content="[^"]*" \/>/;
if (!robotsMeta.test(synced)) {
  throw new Error('index.html has no <meta name="robots"> to sync');
}
synced = synced.replace(
  robotsMeta,
  `<meta name="robots" content="${indexable ? 'index, follow' : 'noindex, nofollow'}" />`
);

/** Names and blurbs are authored prose, so they are escaped before going into markup. */
const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * One row of the shell's Equipment panel: an anchor and a name, under its
 * group's label. The indentation is baked into the strings because the result
 * is spliced into index.html, which Prettier formats; a row at the wrong depth
 * shows up as a diff on every build.
 */
const shellRows = equipmentGroups
  .map((group) =>
    [
      '                    <li class="flex flex-col gap-1 pb-3">',
      '                      <p class="font-display text-micro font-bold uppercase tracking-eyebrow text-ink-faint">',
      `                        ${escape(group.name)}`,
      '                      </p>',
      ...equipment
        .filter((item) => item.group === group.slug)
        .map(
          (item) =>
            `                      <a class="block py-1 font-display text-sm font-bold text-ink" href="/equipment/${item.slug}">${escape(item.name)}</a>`
        ),
      '                    </li>',
    ].join('\n')
  )
  .join('\n');

const shellAnchor = /(<ul class="flex flex-col" id="shell-equipment">)[\s\S]*?(<\/ul>)/;
if (!shellAnchor.test(synced)) {
  throw new Error('index.html has no <ul id="shell-equipment"> to sync');
}
synced = synced.replace(shellAnchor, `$1\n${shellRows}\n                  $2`);

await mkdir(resolve(root, 'public'), { recursive: true });
await writeFile(resolve(root, 'public/sitemap.xml'), sitemap, 'utf8');
await writeFile(resolve(root, 'public/robots.txt'), robots, 'utf8');
await writeFile(resolve(root, 'public/llms.txt'), llms, 'utf8');
await writeFile(indexPath, synced, 'utf8');

process.stdout.write(
  `${routes.length} urls written for ${siteUrl}; robots (${indexable ? 'open' : 'closed'}), ` +
    `llms.txt, the business block, the robots meta and the shell's ${equipment.length} ` +
    'equipment destinations are in step\n'
);
