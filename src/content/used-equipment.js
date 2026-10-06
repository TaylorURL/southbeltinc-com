/**
 * Used equipment for sale, as the company lists it. Inventory changes daily, so
 * this list is a snapshot and the page says so; a listing that has sold comes
 * out of this file rather than being marked.
 *
 * Every listing is sold as-is, where-is, under the disclaimer below, which is
 * the company's own wording.
 */

export const usedListedOn = '2026-10-05';

export const usedDisclaimer =
  'This item is offered as-is, where-is with no warranty or guarantee implied or expressed. Southbelt Repair and Supply Inc. makes no warranties or claims regarding the condition, completeness, or performance of the item.';

export const usedEquipment = [
  {
    slug: 'used-750-tph-pugmill',
    name: '750 TPH Pugmill',
    location: 'Alvarado, Texas',
    price: 229000,
    photo: 'used-pugmill',
    photoAlt: 'The used 750 TPH pugmill batch house and frame standing in a grass yard',
    features: [
      '36-inch pugmill loading conveyor',
      '36-inch surge hopper loading conveyor',
      'Surge hopper',
      '75 ton silo',
      '2 feeder hoppers',
      'Batch house',
    ],
  },
  {
    slug: 'used-feeder-hopper',
    name: 'Feeder Hopper',
    location: 'Houston, Texas',
    price: 29500,
    photo: 'used-feeder-hopper',
    photoAlt: 'The used feeder hopper with its feeder conveyor in the yard',
    features: ['Hopper opening of 10 ft x 14 ft', '30-inch feeder conveyor'],
  },
  {
    slug: 'renewed-350-bbl-vertical-silo',
    name: 'Renewed 350 BBL Vertical Silo',
    location: '',
    price: 28000,
    photo: 'used-vertical-silo',
    photoAlt: 'The renewed 350 BBL vertical silo lying on its frame, motor and gearbox end in view',
    features: [
      'Baldor 7.5 HP motor',
      'Right angle gearbox',
      'WAM Silotop dust collector',
      'Side discharge auger',
    ],
  },
];

/** Whole dollars, the way the listings print them. */
export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

/** Questions the used equipment page answers, in the company's words. */
export const usedFaqs = [
  {
    question: 'What type of used equipment do you carry?',
    answer:
      'A broad range of used equipment for the concrete industry, including blowers, storage pigs and conveyors. The inventory changes daily, so the best way to see what is available now is to contact us directly.',
  },
  {
    question: 'Do you offer new equipment options?',
    answer:
      'Yes. Southbelt also offers new equipment for the concrete industry, from batch plants and pugmills to storage pigs, blowers and conveyors. Contact the sales team for help choosing.',
  },
];
