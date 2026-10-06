/**
 * The groups the parts catalog is filed under.
 *
 * They are a separate module from the catalog because they are read in
 * different places at different times. The home page's parts counter names the
 * first six on every visit, so they are in the bundle the first screen loads;
 * the parts themselves are only ever read by /parts and /parts/:slug, which are
 * chunks of their own.
 *
 * The first six are the counter the company shows on its own site, each with
 * its product photo; `photo` names a cut in photos.js, shot on white. The rest
 * come from the brands the company lists on its line card, and carry no photo.
 *
 * `slug` is a permanent URL: it is what /parts filters on. `name` is Title
 * Case, because it renders as a filter button and a heading. `blurb` is a
 * sentence.
 */

export const partCategories = [
  {
    slug: 'motors-and-gearboxes',
    name: 'Motors and Gearboxes',
    blurb:
      'Electric motors and gear reducers from WEG, Baldor, North American, Dodge, Rexnord and SEW.',
    photo: 'part-motors',
    photoAlt: 'A gray electric gear motor on a test bench',
  },
  {
    slug: 'bearings',
    name: 'Bearings',
    blurb: 'Bearings from Dodge, Link-Belt and Rexnord, and Craft split bearings.',
    photo: 'part-bearings',
    photoAlt: 'A pillow block bearing',
  },
  {
    slug: 'dust-collection',
    name: 'Dust Collection',
    blurb: 'C&W and WAM dust collectors, and C&W anti-overfill systems for silos.',
    photo: 'part-dust-collection',
    photoAlt: 'A C&W dust collector with its lid open',
  },
  {
    slug: 'material-handling',
    name: 'Material Handling',
    blurb: 'WAM screw conveyors, Smoot and WAM rotary vane feeders, chains and sprockets.',
    photo: 'part-material-handling',
    photoAlt: 'A drawing of a blue screw conveyor flight with its dimensions',
  },
  {
    slug: 'pneumatics',
    name: 'Pneumatics',
    blurb: 'Air valves, air cylinders, air compressors, and cement and air hose with fittings.',
    photo: 'part-pneumatics',
    photoAlt: 'A blue pneumatic solenoid valve',
  },
  {
    slug: 'pumps',
    name: 'Pumps',
    blurb: 'Water pumps and the components that keep them running.',
    photo: 'part-pumps',
    photoAlt: 'A gas-engine water pump on its frame',
  },
  {
    slug: 'valves',
    name: 'Valves',
    blurb: 'Butterfly valves from Bray, WAM and Keystone.',
  },
  {
    slug: 'conveyor-components',
    name: 'Conveyor Components',
    blurb: 'Belting and fasteners, belt cleaners, idlers, covers, pulleys and V-belts.',
  },
  {
    slug: 'controls-and-instruments',
    name: 'Controls and Instruments',
    blurb: 'Batch plant automation, level indicators, load cells, water meters and switches.',
  },
  {
    slug: 'blowers-and-service-kits',
    name: 'Blowers and Service Kits',
    blurb: 'Tuthill and Paragon pneumatic blowers, and Paragon service kits by part number.',
  },
  {
    slug: 'vibrators',
    name: 'Vibrators',
    blurb: 'Vibrators from Houston Vibrator and Vibco.',
  },
  {
    slug: 'plant-equipment',
    name: 'Plant Equipment and Liners',
    blurb: 'Concrete mixers, slumpstands, shaker screens, water chillers and urethane liners.',
  },
];

/** The six the company's own parts counter leads with, each with a photo. */
export const featuredCategories = partCategories.filter((category) => category.photo);

/** Lookup for the category heading and blurb shown above a filtered list. */
export const categoryBySlug = Object.fromEntries(
  partCategories.map((category) => [category.slug, category])
);
