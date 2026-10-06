/**
 * The specification behind each machine in equipment.js, read only by the
 * detail route. Each entry is keyed by the machine's slug.
 *
 * - `intro` is prose, a paragraph per string.
 * - `figures` are the three or four numbers a buyer looks for first, printed
 *   large above the spec tables. Each is a figure the company publishes.
 * - `sections` are the spec tables, in the order the brochure lists them. An
 *   item is one line of the spec, sentence case, as the brochure states it.
 * - `notes` are short caveats printed under the tables, used where the
 *   company's own sources disagree and the figure is left for the quote.
 * - `related` names other slugs worth showing beside this one.
 *
 * Nothing here is a value the company has not published. Where the website and
 * the brochure list different things, the brochure is the fuller source and is
 * what the tables follow.
 */

const bp14Core = [
  {
    title: 'Cement Batcher',
    items: [
      '14-yard cement batcher',
      '4 – 10K load cells and summing box',
      '10-inch butterfly valve',
      '2 aeration pads',
      'Turbine air vibrator',
      'Hanger lugs',
      'Bank of SMC solenoids mounted on the cement batcher',
    ],
  },
  {
    title: 'Batching Silo',
    items: [
      '400 BBL to 1900 BBL capacity',
      'C&W silo collectors',
      '4-inch internal fill line',
      '8 aeration pads',
      'Safety pressure relief valve',
      'Service platform around the cement batcher',
      'Ladder and cage',
      '10-inch butterfly valve',
      'Manual emergency gate',
      'HI bindicators',
    ],
  },
  {
    title: 'Overhead Bins',
    items: [
      '2 clam gates per compartment',
      'Cast hardened gate gear, with grease certification',
      '4 x 10 air cylinder',
      'Heap plates',
      'Bins fabricated from A-36 1/4-inch plate',
      'Optional AR liners on the sloping sides',
    ],
  },
  {
    title: 'Aggregate Batcher',
    items: [
      '14 CY capacity',
      '4 – 20K load cells and summing box',
      'Scale fabricated from A-36 1/4-inch plate',
      '2 clam gates per compartment',
      'Cast hardened gate gear, with grease certification',
      '5 x 10 air cylinder',
      'Turbine air vibrator',
      '4 hanger lugs, one on each corner of the scale',
      'Bank of SMC solenoids mounted on the aggregate batcher',
      'Optional AR liners on the sloping sides',
    ],
  },
  {
    title: '36-Inch Batch Conveyor',
    items: [
      'Dodge reducer',
      '2 HP motor',
      'V-belt drive with guard',
      'Tail pulley guard',
      'Loading skirt under the aggregate batcher',
      '2-ply conveyor belt',
      'Truck load chute',
    ],
  },
  {
    title: 'Weighed Water Batcher',
    items: [
      '500-gallon storage tank',
      'Float switch',
      '500-gallon batcher',
      '3 – 5K load cells and summing box',
      '6-inch butterfly valve',
      'Hanger lugs',
    ],
  },
  {
    title: '12 x 12 ft Loader Hopper',
    items: [
      'Hopper built of A-36 1/4-inch steel',
      'Hopper legs of 6 x 6 angle',
      'Turbine vibrator',
      'Optional AR liners on the sloping sides',
    ],
  },
  {
    title: 'Radial Stacker',
    items: [
      'Dodge reducer',
      'Electric motor',
      'V-belt drive with guard',
      'Tail pulley guard',
      'Loading skirt under the aggregate batcher',
      '2-ply conveyor belt',
      'Control panel with remote system',
      'Optional walkway on one side of the stacker',
    ],
  },
];

const bp14Figures = [
  { value: '14 yd', label: 'Cement batcher' },
  { value: '400–1900 BBL', label: 'Batching silo' },
  { value: '14 CY', label: 'Aggregate batcher' },
  { value: '36 in', label: 'Batch conveyor' },
];

const pugmillFigures = [
  { value: '500 TPH', label: 'Capacity option' },
  { value: '750 TPH', label: 'Capacity option' },
  { value: '1000 TPH', label: 'Capacity option' },
  { value: '400–1200 BBL', label: 'Silos' },
];

export const specsBySlug = {
  'bp-14-batch-plant': {
    headline: 'A 14-yard plant with the whole batching line',
    intro: [
      'The BP-14 is built around a 14-yard cement batcher on four 10K load cells, under a batching silo that runs from 400 to 1900 BBL. A service platform circles the batcher, and the silo carries its own pressure relief valve and manual emergency gate.',
      'The brochure lists the rest of the plant: overhead bins, a 14 CY aggregate batcher, a 36-inch batch conveyor, a weighed water batcher, a 12 x 12 ft loader hopper and a radial stacker with a remote control panel.',
    ],
    figures: bp14Figures,
    sections: [
      ...bp14Core,
      {
        title: 'Also Included',
        items: [
          'C&W stationary load shroud',
          'C&W central collector',
          '10-inch WAM auger on the auxiliary silo',
          'Aeration blower',
          'Electrical box mounted on the aggregate batcher',
          '20 HP air compressor',
        ],
      },
    ],
    related: ['bp-14-augerless-batch-plant', 'dp-12-decumulating-plant', 'vertical-pigs'],
  },

  'bp-14-augerless-batch-plant': {
    headline: 'The BP-14, without the auxiliary-silo auger',
    intro: [
      'The BP-14 Augerless has the same 14-yard batcher with load cells, aeration pads and a turbine air vibrator, the same 400 to 1900 BBL silo with its pressure relief valve and emergency gate, and the same service platform around the batcher.',
      'Its brochure matches the BP-14 line for line, with one difference: there is no 10-inch WAM auger on the auxiliary silo.',
    ],
    figures: bp14Figures,
    sections: [
      ...bp14Core,
      {
        title: 'Also Included',
        items: [
          'C&W stationary load shroud',
          'C&W central collector',
          'Aeration blower',
          'Electrical box mounted on the aggregate batcher',
          '20 HP air compressor',
        ],
      },
    ],
    related: ['bp-14-batch-plant', 'dp-12-decumulating-plant', 'sbm-12-semi-mobile-batch-plant'],
  },

  'dp-12-decumulating-plant': {
    headline: 'A low-profile plant you load with a front-end loader',
    intro: [
      'The DP-12 is a low-profile decumulating plant loaded directly with a front-end loader, with C&W dust collection and gravity discharge. The silo runs from 400 to 1200 BBL, and it can be split.',
      'It is built to grow: a batching computer is optional, and overhead bins, a radial stacker and an auxiliary silo can be added at a later date.',
    ],
    figures: [
      { value: '400–1200 BBL', label: 'Silo' },
      { value: '30 in', label: 'Truck load belt' },
      { value: '15 HP', label: 'Air compressor' },
      { value: '3 in', label: 'Water meter' },
    ],
    sections: [
      {
        title: 'The Standard DP-12',
        items: [
          'Low-profile decum plant, with options for the silos to be split',
          '400 BBL to 1200 BBL silo',
          '30-inch truck load belt',
          '3-inch water meter',
          '15 HP air compressor',
          'Gravity discharge',
        ],
      },
      {
        title: 'Loading and Dust Control',
        items: ['Direct loading with a front-end loader', 'C&W dust collection'],
      },
      {
        title: 'Options',
        items: [
          'Batching computer',
          'Overhead bins and a radial stacker, added at a later date',
          '36-inch truck load belt',
          'Auxiliary silo',
        ],
      },
    ],
    related: ['bp-14-batch-plant', 'sbm-12-semi-mobile-batch-plant', 'vertical-pigs'],
  },

  'sbm-12-semi-mobile-batch-plant': {
    headline: 'A semi-mobile plant with room for a second silo',
    intro: [
      'The SBM-12 is engineered with flexibility at its core, and it comes with a wide range of customization options.',
      'The knee braces for an auxiliary silo are built into the mainframe, so the plant can take a second cement silo years after it was bought. It also carries scale weight lugs for the scale technician at startup, and four couplings at the material collector for admixtures.',
    ],
    figures: [],
    sections: [
      {
        title: 'Built In',
        items: [
          'Auxiliary-silo knee braces integrated into the mainframe',
          'Room to add a second cement silo after purchase',
          'Scale weight lugs for the scale technician',
          'Four couplings at the material collector to support admixtures',
          'A wide range of customization options',
        ],
      },
    ],
    notes: ['Ask the sales team for the full specification of the configuration you need.'],
    related: ['bp-14-batch-plant', 'dp-12-decumulating-plant', 'portable-pugmill'],
  },

  'portable-pugmill': {
    headline: 'High-capacity mixing that moves with the job',
    intro: [
      'The portable pugmill is built for on-the-go, high-capacity production. It carries the same features as the stationary model: a conveyor belt scale, a cement flow weigh scale and a control system, with silos from 400 to 1200 BBL.',
      'It comes in 500, 750 and 1000 TPH, with a surge hopper and additional feeders as options.',
    ],
    figures: pugmillFigures,
    sections: [
      {
        title: 'Standard',
        items: [
          'Silos from 400 BBL to 1200 BBL',
          'C&W silo collector on the silos',
          'Conveyor belt scale',
          'Cement flow weigh scale',
          'Control system',
        ],
      },
      { title: 'Options', items: ['Surge hopper', 'Additional feeders'] },
      { title: 'Capacity', items: ['500 TPH', '750 TPH', '1000 TPH'] },
    ],
    related: ['stationary-pugmill', 'vertical-pigs', 'dry-bulk-blowers'],
  },

  'stationary-pugmill': {
    headline: 'A fixed pugmill for steady, high-capacity production',
    intro: [
      'The stationary pugmill is engineered for high-capacity production, with silos from 400 to 1200 BBL, a conveyor belt scale, a cement flow weigh scale and a control system.',
      'It comes in 500, 750 and 1000 TPH, with a surge hopper, additional feeders and a shaker screen as options.',
    ],
    figures: pugmillFigures,
    sections: [
      {
        title: 'Standard',
        items: [
          'Silos from 400 BBL to 1200 BBL',
          'C&W silo collector on the silos',
          'Conveyor belt scale',
          'Cement flow weigh scale',
          'Control system',
        ],
      },
      { title: 'Options', items: ['Surge hopper', 'Additional feeders', 'Shaker screen'] },
      { title: 'Capacity', items: ['500 TPH', '750 TPH', '1000 TPH'] },
    ],
    related: ['portable-pugmill', 'vertical-pigs', 'dry-bulk-blowers'],
  },

  'vertical-pigs': {
    headline: 'Fill and discharge at the same time',
    intro: [
      'A vertical pig fills and discharges at the same time, and it stands on a smaller footprint than a horizontal pig. The standard silo is 12 ft in diameter, with a C&W pinch valve anti-overfill kit, an emergency manual butterfly valve and aeration pads.',
      'A 14 ft diameter, 1900 BBL silo is available as an option, along with transfer systems from 50 to 75 HP.',
    ],
    figures: [
      { value: '12 ft', label: 'Standard diameter' },
      { value: '14 ft', label: 'Optional, 1900 BBL' },
      { value: '5 in', label: 'Fill line' },
    ],
    sections: [
      {
        title: 'Standard Equipment',
        items: [
          '12 ft diameter silo',
          '5-inch fill line',
          'C&W pinch valve anti-overfill kit',
          'Emergency manual butterfly valve',
          'HI bindicator',
          'Aeration pads',
          'Ladder and safety cage',
        ],
      },
      {
        title: 'Benefits',
        items: [
          'Fill and discharge at the same time',
          'Smaller footprint than a horizontal pig',
        ],
      },
      {
        title: 'Optional Equipment',
        items: [
          'C&W silo LPR collector',
          'Safety zip line for a portable silo',
          '14 ft diameter silo, 1900 BBL',
          'Transportation system',
          '50 HP transfer system with vane feeder and electrical panel',
          '60 HP transfer system with vane feeder and electrical panel',
          '75 HP transfer system with vane feeder and electrical panel',
        ],
      },
    ],
    notes: ['Sales confirms the silo capacity for your order with the quote.'],
    related: ['portable-storage-pigs', 'bp-14-batch-plant', 'dry-bulk-blowers'],
  },

  'portable-storage-pigs': {
    headline: 'Storage pigs built to empty clean and travel easy',
    intro: [
      'Southbelt storage pigs are made in the USA. The bottom pods are tilted, with a special suction line for maximum product removal. The main supports are cut from a single piece of solid steel.',
      'They ride higher off the ground than other manufacturers’ pigs, and the ladder retracts, so the pig travels without taking it off or adding width. Choose a diesel or an electric blower, and buy new, buy used or rent.',
    ],
    figures: [
      { value: 'USA', label: 'Made in' },
      { value: 'Diesel or Electric', label: 'Blower' },
      { value: 'New, Used, Rental', label: 'Ways to get one' },
    ],
    sections: [
      {
        title: 'Design',
        items: [
          'Bottom pods tilted, with a special suction line for product removal',
          'Main supports made from a single piece of solid steel',
          'Higher ground clearance than other manufacturers',
          'Retractable ladder that travels without being removed or adding width',
          'A safer work platform',
          'Side discharge pipes on adjustable tabs, not welded',
        ],
      },
      {
        title: 'Blower',
        items: ['Diesel blower', 'Electric blower'],
      },
    ],
    related: ['dry-bulk-blowers', 'vertical-pigs', 'self-erecting-water-tank'],
  },

  'dry-bulk-blowers': {
    headline: 'Paragon blowers, and the parts to keep them running',
    intro: [
      'Southbelt carries the Paragon 1057, P858 and P657, comparable to Gardner Denver and Tuthill, for blower systems, cement plants and storage pigs. Buy, rent or have one repaired, new or used.',
      'Two packages are kept for sale or rent: a 50 HP electric blower on a new bolt-together frame, with or without its stand, and a 74 HP diesel blower, a complete self-contained unit, with or without its trailer.',
    ],
    figures: [
      { value: '50 HP', label: 'Electric package' },
      { value: '74 HP', label: 'Diesel package' },
      { value: '3', label: 'Paragon models' },
    ],
    crossReference: {
      title: 'Cross-Reference',
      columns: ['Paragon', 'Gardner Denver', 'Tuthill', 'Drum'],
      rows: [
        ['1057', 'T5CDL12L92', 'T1055', 'D907'],
        ['P858', 'T5CDL12', 'T855', 'D807'],
        ['P657', 'T5CDL9', 'T855RS', 'D450'],
      ],
    },
    sections: [
      {
        title: 'P657 Service Kit',
        items: [
          'Oil 409-007, synthetic',
          'Melt plug 543-003, left hand',
          'Filter element 573-003, 5-inch outlet',
          'Filter element 575-005, 4-inch outlet',
        ],
      },
      {
        title: 'P858 and P1057 Service Kit',
        items: [
          'Oil 409-002, synthetic',
          'Melt plug 543-003, left hand',
          'Filter element 573-003, 5-inch outlet',
          'Filter element 575-005, 4-inch outlet',
        ],
      },
      {
        title: 'Packages',
        items: [
          '50 HP electric blower on a bolt-together frame, with no welds',
          '50 HP electric, sold or rented with or without the stand',
          '74 HP diesel blower, a complete self-contained unit',
          '74 HP diesel, sold or rented with or without the trailer',
        ],
      },
    ],
    related: ['portable-storage-pigs', 'self-erecting-water-tank', 'vertical-pigs'],
    partsLink: { to: '/parts/paragon-blower-service-kits', label: 'Order a Service Kit' },
  },

  'self-erecting-water-tank': {
    headline: 'A portable water tank that stands itself up',
    intro: [
      'The self-erecting water tank is a genuine Mega design. An engine-driven hydraulic pump and hoist cylinders raise it for maximum height clearance, and a 10-inch discharge pipe delivers up to 2,000 gpm.',
      'It complies with DOT requirements, is built from premium materials and is inspected throughout manufacturing. Standard paint is white, and other colors and custom logos are available.',
    ],
    figures: [
      { value: '12,000 gal', label: 'Nominal capacity' },
      { value: '45,000 L', label: 'Nominal capacity' },
      { value: '2,000 gpm', label: 'Discharge' },
      { value: '10 in', label: 'Discharge pipe' },
    ],
    sections: [
      {
        title: 'Key Features',
        items: [
          'Support equipment for rapidly filling water distribution equipment',
          'Engine-driven hydraulic pump and hoist cylinders for maximum height clearance',
          '10-inch diameter discharge pipe delivering up to 2,000 gpm',
          'Complies with DOT requirements',
          'Standard white exterior paint, with other colors and custom logos available',
        ],
      },
      {
        title: 'Construction',
        items: [
          'Constructed with premium materials',
          'Inspected throughout the manufacturing process',
        ],
      },
    ],
    related: ['portable-storage-pigs', 'dry-bulk-blowers', 'rm-series-conveyor'],
  },

  'rm-series-conveyor': {
    headline: 'A towable conveyor for fiber, ice, bags and aggregate',
    intro: [
      'The RM-Series comes in two lengths, the 23 ft RM-2318 and the 28 ft RM-2818. It runs on 110V power or a Honda gas engine and carries an 18-inch belt on heavy-duty 4-inch CEMA B idlers.',
      'The undercarriage has adjustable lifting arms, a tow-able hitch and a 3500 lb axle, with a hydraulic hand pump to set the incline.',
    ],
    figures: [
      { value: '23 ft', label: 'RM-2318' },
      { value: '28 ft', label: 'RM-2818' },
      { value: '18 in', label: 'Belt width' },
      { value: '3500 lb', label: 'Axle capacity' },
    ],
    sections: [
      {
        title: 'Discharge Height',
        items: ['RM-2318: up to 14 ft 9 in', 'RM-2818: up to 17 ft'],
      },
      {
        title: 'Dosing Capabilities',
        items: ['Steel fiber', 'Synthetic fiber', 'Ice', 'Bags', 'Aggregate', 'Rock', 'Sand'],
      },
      { title: 'Power Drive', items: ['110V power', 'Honda gas engine'] },
      {
        title: 'Conveyor',
        items: [
          '18-inch wide belt',
          '35-degree troughed belt',
          'Heavy-duty 4-inch CEMA B idlers',
          'Adjustable belt tension',
          'Chevron cleated belt',
          '1.5 cu ft loading hopper',
        ],
      },
      {
        title: 'Portable Undercarriage',
        items: [
          'Adjustable lifting arms',
          'Tow-able hitch',
          '3500 lb capacity axle',
          'Hydraulic incline lift adjustment',
          'Hydraulic hand pump',
          'Safety restrictor orifice for slow hydraulic lowering',
        ],
      },
      {
        title: 'Optional Add-Ons',
        items: [
          'Trailer lights',
          'Loading deck',
          'Bag ripping blade',
          'Discharge chute',
          'Belt covers',
          'Pintle ring hitch',
          'Outrigger jacks',
          'Mini-cleat top belt',
          'Large capacity hoppers',
        ],
      },
    ],
    related: ['dry-bulk-blowers', 'self-erecting-water-tank', 'portable-storage-pigs'],
  },
};
