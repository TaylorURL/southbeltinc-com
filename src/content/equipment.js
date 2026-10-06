/**
 * The equipment Southbelt builds and sells, as an index: what each machine is
 * called, which group it is filed under, the one line that describes it, its
 * photo, and its brochure.
 *
 * The specifications are a separate module, equipment-specs.js, because they
 * are read in different places at different times. The header's equipment
 * panel and the home page name the machines on every visit, so this list is in
 * the bundle the first screen loads; the spec tables are only ever read by
 * /equipment/:slug, which is a chunk of its own.
 *
 * `brand` is the maker the Product structured data names, and is left off where
 * the company's own pages do not say who makes the machine.
 *
 * `slug` is a permanent URL. Add and retire them; renaming one breaks every
 * link already pointing at it. `name` is Title Case, because it renders as a
 * card heading, an `h1`, and the subject line of a quote email. `summary` is a
 * sentence.
 *
 * Every figure in a summary is one the company publishes on its own pages or
 * in the brochure linked beside it. A figure the sources disagree on is left
 * out rather than picked.
 */

export const equipmentGroups = [
  {
    slug: 'batch-plants',
    name: 'Batch Plants',
    blurb: 'The BP-14, BP-14 Augerless, DP-12 and SBM-12, designed and built by Southbelt.',
  },
  {
    slug: 'pugmills',
    name: 'Pugmills',
    blurb: 'Portable and stationary pugmills at 500, 750 or 1000 TPH.',
  },
  {
    slug: 'storage',
    name: 'Silos and Storage Pigs',
    blurb: 'Vertical pigs and portable storage pigs, new, used or for rent.',
  },
  {
    slug: 'support',
    name: 'Blowers, Tanks and Conveyors',
    blurb: 'Paragon dry bulk blowers, a self-erecting water tank and the RM-Series conveyor.',
  },
];

export const equipment = [
  {
    slug: 'bp-14-batch-plant',
    name: 'BP-14 Concrete Batch Plant',
    shortName: 'BP-14 Batch Plant',
    group: 'batch-plants',
    eyebrow: 'Batch Plant',
    summary:
      'A 14-yard cement batcher under a 400 to 1900 BBL batching silo, with overhead bins, an aggregate batcher and a radial stacker.',
    photo: 'bp-14-plant',
    photoAlt: 'A Southbelt BP-14 batch plant with two silos, its batchers and conveyor in a ready-mix yard',
    brochure: '/brochures/southbelt-bp-14-batch-plant.pdf',
    brand: 'Southbelt',
  },
  {
    slug: 'bp-14-augerless-batch-plant',
    name: 'BP-14 Augerless Batch Plant',
    shortName: 'BP-14 Augerless',
    group: 'batch-plants',
    eyebrow: 'Batch Plant',
    summary:
      'The BP-14 specification without the 10-inch WAM auger on the auxiliary silo, with the same 14-yard batcher and 400 to 1900 BBL silo.',
    photo: 'bp-14-augerless-plant',
    photoAlt: 'A BP-14 Augerless batch plant at sunset, its silo, batcher and stacker lit from the side',
    brochure: '/brochures/southbelt-bp-14-augerless-plant.pdf',
    brand: 'Southbelt',
  },
  {
    slug: 'dp-12-decumulating-plant',
    name: 'DP-12 Decumulating Plant',
    shortName: 'DP-12 Decumulating Plant',
    group: 'batch-plants',
    eyebrow: 'Batch Plant',
    summary:
      'A low-profile decum plant loaded directly by a front-end loader, with a 400 to 1200 BBL silo and gravity discharge.',
    photo: 'dp-12-plant',
    photoAlt: 'A DP-12 decumulating plant with its silo, truck load belt and a mixer truck underneath',
    brochure: '/brochures/southbelt-dp-12-decumulating-plant.pdf',
    brand: 'Southbelt',
  },
  {
    slug: 'sbm-12-semi-mobile-batch-plant',
    name: 'SBM-12 Semi-Mobile Batch Plant',
    shortName: 'SBM-12 Semi-Mobile',
    group: 'batch-plants',
    eyebrow: 'Batch Plant',
    summary:
      'A semi-mobile plant whose mainframe carries the knee braces for an auxiliary silo, so a second cement silo can go on years later.',
    photo: 'sbm-12-plant',
    photoAlt: 'An SBM-12 semi-mobile batch plant with its aggregate hopper, conveyor and cement silo',
    photoPosition: '35% 50%',
    brochure: '/brochures/southbelt-sbm-12-semi-mobile-batch-plant.pdf',
    brand: 'Southbelt',
  },
  {
    slug: 'portable-pugmill',
    name: 'Portable Pugmill',
    shortName: 'Portable Pugmill',
    group: 'pugmills',
    eyebrow: 'Pugmill',
    summary:
      'A pugmill that moves between jobs, at 500, 750 or 1000 TPH, with silos from 400 to 1200 BBL and a conveyor belt scale.',
    photo: 'portable-pugmill',
    photoAlt: 'A portable pugmill with its feeders, conveyors and a tall cement silo on a job site',
    brochure: '/brochures/southbelt-portable-pugmill.pdf',
    brand: 'Southbelt',
  },
  {
    slug: 'stationary-pugmill',
    name: 'Stationary Pugmill',
    shortName: 'Stationary Pugmill',
    group: 'pugmills',
    eyebrow: 'Pugmill',
    summary:
      'A fixed pugmill at 500, 750 or 1000 TPH, with silos from 400 to 1200 BBL and options for a surge hopper and shaker screen.',
    photo: 'stationary-pugmill',
    photoAlt: 'A stationary pugmill with its feed hopper, conveyors and silo on a gravel pad',
    brochure: '/brochures/southbelt-stationary-pugmill.pdf',
    brand: 'Southbelt',
  },
  {
    slug: 'vertical-pigs',
    name: 'Vertical Pigs',
    shortName: 'Vertical Pigs',
    group: 'storage',
    eyebrow: 'Storage',
    summary:
      'Vertical silos that fill and discharge at the same time, on a smaller footprint than a horizontal pig.',
    photo: 'vertical-pigs',
    photoAlt: 'Two tall gray Southbelt vertical pigs standing side by side against a blue sky',
    brochure: '/brochures/southbelt-vertical-pigs.pdf',
    brand: 'Southbelt',
  },
  {
    slug: 'portable-storage-pigs',
    name: 'Portable Storage Pigs',
    shortName: 'Portable Storage Pigs',
    group: 'storage',
    eyebrow: 'Storage',
    summary:
      'Made in the USA, with tilted bottom pods, a retractable ladder and your choice of diesel or electric blower. New, used or for rent.',
    photo: 'storage-pig',
    photoAlt: 'A gray Southbelt portable storage pig on its trailer, parked on grass',
    brochure: '/brochures/southbelt-portable-storage-pigs.pdf',
    brand: 'Southbelt',
    rentable: true,
  },
  {
    slug: 'dry-bulk-blowers',
    name: 'Dry Bulk Blowers',
    shortName: 'Dry Bulk Blowers',
    group: 'support',
    eyebrow: 'Blowers',
    summary:
      'Paragon 1057, P858 and P657 blowers, comparable to Gardner Denver and Tuthill, plus the service kits that keep them running.',
    photo: 'paragon-blowers',
    photoAlt: 'Three Paragon electric dry bulk blower packages on blue skids in the yard',
    brochure: '/brochures/southbelt-paragon-dry-bulk-blowers.pdf',
    brand: 'Paragon',
    rentable: true,
  },
  {
    slug: 'self-erecting-water-tank',
    name: 'Self-Erecting Water Tank',
    shortName: 'Self-Erecting Water Tank',
    group: 'support',
    eyebrow: 'Water Tank',
    summary:
      'A Mega portable tank with 12,000 gallons of nominal capacity, a hydraulic hoist and a 10-inch discharge pipe.',
    photo: 'water-tank',
    photoAlt: 'A white Southbelt self-erecting water tank on its trailer frame',
    brochure: '/brochures/self-erecting-water-tank.pdf',
    brand: 'Mega',
    rentable: true,
  },
  {
    slug: 'rm-series-conveyor',
    name: 'RM-Series Industrial Conveyor',
    shortName: 'RM-Series Conveyor',
    group: 'support',
    eyebrow: 'Conveyor',
    summary:
      'A towable 23 or 28 ft conveyor with an 18-inch belt that doses fiber, ice, bags, aggregate, rock and sand.',
    photo: 'rm-conveyor',
    photoAlt: 'A red RM-Series portable conveyor raised on its undercarriage',
    brochure: '/brochures/rm-series-conveyor.pdf',
  },
];

/** Lookup for the detail route. */
export const equipmentBySlug = Object.fromEntries(equipment.map((item) => [item.slug, item]));

/** The machines filed under one group, in the order they are listed above. */
export const equipmentIn = (group) => equipment.filter((item) => item.group === group);
