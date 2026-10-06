/**
 * The brands Southbelt is associated with, in the order its own site shows
 * them. Each logo is the maker's mark as the company already publishes it,
 * cut to WebP under public/brand/partners.
 *
 * `featured` marks the six the home page row shows; the parts page shows all
 * of them.
 */

export const brands = [
  { slug: 'paragon', name: 'Paragon', featured: true },
  { slug: 'command-alkon', name: 'Command Alkon', featured: true },
  { slug: 'houston-vibrator', name: 'Houston Vibrator', featured: true },
  { slug: 'bray', name: 'Bray', featured: true },
  { slug: 'ppi', name: 'PPI', featured: true },
  { slug: 'weg', name: 'WEG', featured: true },
  { slug: 'amsoil', name: 'Amsoil' },
  { slug: 'bestorq', name: 'Bestorq' },
  { slug: 'badger-meter', name: 'Badger Meter' },
  { slug: 'binmaster', name: 'BinMaster' },
  { slug: 'cw-dust-tech', name: 'C&W Dust Tech' },
  { slug: 'jonel', name: 'Jonel' },
  { slug: 'pelican-worldwide', name: 'Pelican Worldwide' },
  { slug: 'rice-lake', name: 'Rice Lake' },
  { slug: 'superior', name: 'Superior' },
  { slug: 'wam', name: 'WAM' },
];

export const featuredBrands = brands.filter((brand) => brand.featured);

export const brandLogo = (slug) => `/brand/partners/${slug}.webp`;
