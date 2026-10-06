/**
 * The parts catalog. Each entry becomes a browsable page at /parts/:slug, so the
 * catalog doubles as the site's long-tail search surface: someone typing "Bray
 * butterfly valve Texas" or "Paragon P858 service kit" is looking for one of
 * these pages.
 *
 * The entries are the product lines on the company's line card and the parts
 * its own parts page names, with the brands it lists for each. The catalog is a
 * portion of what the counter carries, and the page says so: anything not here
 * is asked for the same way.
 *
 * Parts are quoted, not priced. `askFor` is the list of details a quote needs.
 * The part page prints it and the quote request repeats it per line item, which
 * turns "I need a motor" into something the counter can price without a phone
 * call.
 *
 * `slug` is a permanent URL. Retire a part by removing it and letting the page
 * 404. Renaming a slug breaks every link already pointing at it.
 *
 * `name` is Title Case, because it renders as a card heading, an `h1`, and a
 * line in a quote email. `summary` and `description` are sentence case.
 */

const plantDetails = ['Plant make and model', 'Where the part goes on the plant'];
const partDetails = [
  'Part number or model, if you have it',
  'Brand',
  'Quantity',
  'Yard for pickup, or a ship-to',
];

export const parts = [
  {
    slug: 'electric-motors',
    name: 'Electric Motors',
    category: 'motors-and-gearboxes',
    brands: ['WEG', 'Baldor', 'North American'],
    summary: 'Electric motors from WEG, Baldor and North American.',
    description:
      'Motors drive the conveyors, augers, stackers and blowers on a plant, and picking the right one matters for how the whole line runs. Send the nameplate details of the motor coming out and the counter matches the replacement.',
    askFor: ['Horsepower, voltage and frame from the nameplate', ...plantDetails, ...partDetails],
    keywords: ['motor', 'electric motor', 'weg', 'baldor', 'north american', 'hp'],
  },
  {
    slug: 'gear-reducers',
    name: 'Gear Reducers',
    category: 'motors-and-gearboxes',
    brands: ['Dodge', 'Rexnord', 'SEW'],
    summary: 'Gear reducers and gearboxes from Dodge, Rexnord and SEW.',
    description:
      'The reducer sits between the motor and the load, on batch conveyors, radial stackers and screw conveyors. The model and ratio off the tag are what a replacement is matched on.',
    askFor: ['Model and ratio from the tag', ...plantDetails, ...partDetails],
    keywords: ['gearbox', 'gear reducer', 'reducer', 'dodge', 'rexnord', 'sew', 'right angle'],
  },
  {
    slug: 'bearings',
    name: 'Bearings',
    category: 'bearings',
    brands: ['Dodge', 'Link-Belt', 'Rexnord', 'Craft Split Bearings'],
    summary: 'Bearings from Dodge, Link-Belt and Rexnord, and Craft split bearings.',
    description:
      'Bearings take the friction between a turning shaft and the frame it runs in, which lets equipment run with less noise and vibration. Pulleys, idlers, augers and mixers all run on them.',
    askFor: ['Bearing number or shaft size', 'Housing style', ...plantDetails, ...partDetails],
    keywords: [
      'bearing',
      'pillow block',
      'flange bearing',
      'split bearing',
      'dodge',
      'link-belt',
      'rexnord',
      'craft',
    ],
  },
  {
    slug: 'dust-collectors',
    name: 'Dust Collectors',
    category: 'dust-collection',
    brands: ['C&W Manufacturing', 'WAM'],
    summary: 'Silo and central dust collectors from C&W Manufacturing and WAM, and their filters.',
    description:
      'A dust collection system cleans the air where cement and fly ash are moved and stored. Southbelt fits C&W silo collectors, central collectors and load shrouds on the plants it builds, and supplies collectors and parts for the plant you already run.',
    askFor: [
      'Collector make and model',
      'Filter or cartridge part number',
      ...plantDetails,
      ...partDetails,
    ],
    keywords: [
      'dust collector',
      'silo collector',
      'filter',
      'c&w',
      'cw',
      'wam',
      'silotop',
      'load shroud',
    ],
  },
  {
    slug: 'anti-overfill-systems',
    name: 'Anti-Overfill Systems',
    category: 'dust-collection',
    brands: ['C&W Manufacturing'],
    summary: 'C&W Manufacturing anti-overfill systems and pinch valve kits for silos.',
    description:
      'An anti-overfill system closes the fill line before a silo is overfilled. The vertical pigs Southbelt builds carry a C&W pinch valve anti-overfill kit as standard.',
    askFor: ['Silo size and fill line size', ...plantDetails, ...partDetails],
    keywords: ['anti overfill', 'pinch valve', 'overfill', 'c&w', 'silo'],
  },
  {
    slug: 'screw-conveyors',
    name: 'Screw Conveyors',
    category: 'material-handling',
    brands: ['WAM'],
    summary: 'WAM screw conveyors, augers and flights.',
    description:
      'Screw conveyors move cement and other dry material out of silos and into batchers. The BP-14 carries a 10-inch WAM auger on its auxiliary silo.',
    askFor: [
      'Diameter and length',
      'Inlet and outlet arrangement',
      ...plantDetails,
      ...partDetails,
    ],
    keywords: ['screw conveyor', 'auger', 'flight', 'wam', 'cement screw'],
  },
  {
    slug: 'rotary-vane-feeders',
    name: 'Rotary Vane Feeders',
    category: 'material-handling',
    brands: ['Smoot', 'WAM'],
    summary: 'Rotary vane feeders and airlocks from Smoot and WAM.',
    description:
      'A rotary vane feeder meters dry material into a pneumatic line or a screw. The transfer systems on Southbelt vertical pigs pair a vane feeder with an electrical panel.',
    askFor: ['Feeder make, model and size', ...plantDetails, ...partDetails],
    keywords: ['rotary valve', 'vane feeder', 'airlock', 'smoot', 'wam'],
  },
  {
    slug: 'chains-and-sprockets',
    name: 'Chains and Sprockets',
    category: 'material-handling',
    brands: [],
    summary: 'Chains and sprockets for plant drives.',
    description:
      'Chains and sprockets for the drives on a plant. Send the chain size and the sprocket details and the counter matches them.',
    askFor: [
      'Chain size and length',
      'Sprocket tooth count and bore',
      ...plantDetails,
      ...partDetails,
    ],
    keywords: ['chain', 'roller chain', 'sprocket', 'drive'],
  },
  {
    slug: 'air-valves-and-cylinders',
    name: 'Air Valves and Air Cylinders',
    category: 'pneumatics',
    brands: ['Schrader Bellows', 'MAC', 'SMC'],
    summary: 'Air valves, solenoids and air cylinders from Schrader Bellows, MAC and SMC.',
    description:
      'Pneumatics run the clam gates and air vibrators on a batch plant. The BP-14 carries banks of SMC solenoids on both batchers and air cylinders on its bins and aggregate batcher.',
    askFor: [
      'Valve or cylinder model',
      'Bore and stroke, for a cylinder',
      'Coil voltage, for a solenoid',
      ...plantDetails,
      ...partDetails,
    ],
    keywords: [
      'air valve',
      'solenoid',
      'air cylinder',
      'pneumatic',
      'smc',
      'mac',
      'schrader bellows',
      'clam gate',
    ],
  },
  {
    slug: 'air-compressors',
    name: 'Air Compressors and Parts',
    category: 'pneumatics',
    brands: ['Quincy', 'Schulz'],
    summary: 'Quincy and Schulz air compressors, and components for the compressor you run.',
    description:
      'The compressor supplies every air-driven part on a plant. Southbelt supplies Quincy and Schulz compressors and the components that keep an existing one running.',
    askFor: ['Compressor make, model and horsepower', ...plantDetails, ...partDetails],
    keywords: ['air compressor', 'compressor', 'quincy', 'schulz'],
  },
  {
    slug: 'cement-and-air-hose',
    name: 'Cement and Air Hose and Fittings',
    category: 'pneumatics',
    brands: ['Sealfast'],
    summary: 'Sealfast cement hose, air hose and fittings.',
    description:
      'Hose and fittings for moving cement and air between trucks, pigs, blowers and silos.',
    askFor: ['Hose inside diameter and length', 'Fitting type and size', ...partDetails],
    keywords: ['cement hose', 'air hose', 'fittings', 'sealfast', 'coupling'],
  },
  {
    slug: 'water-pumps',
    name: 'Water Pumps and Parts',
    category: 'pumps',
    brands: [],
    summary: 'Water pumps, and components for the pumps already on your plant.',
    description:
      'Pumps move water through a plant, turning engine or electrical power into flow. Send the pump make and model and what it feeds, and the counter supplies the pump or the part.',
    askFor: [
      'Pump make and model',
      'Inlet and outlet size',
      'Engine or electric drive',
      ...partDetails,
    ],
    keywords: ['pump', 'water pump', 'trash pump', 'impeller', 'seal'],
  },
  {
    slug: 'butterfly-valves',
    name: 'Butterfly Valves',
    category: 'valves',
    brands: ['Bray', 'WAM', 'Keystone'],
    summary: 'Butterfly valves from Bray, WAM and Keystone.',
    description:
      'The BP-14 runs 10-inch valves on its cement batcher and silo and a 6-inch valve on its water batcher.',
    askFor: [
      'Valve size',
      'Manual or air actuated',
      'Valve make and model',
      ...plantDetails,
      ...partDetails,
    ],
    keywords: ['butterfly valve', 'bfv', 'bray', 'wam', 'keystone', 'valve'],
  },
  {
    slug: 'conveyor-belting',
    name: 'Conveyor Belting and Fasteners',
    category: 'conveyor-components',
    brands: [],
    summary:
      'Conveyor belting from a large inventory, with fasteners, vulcanization and installation.',
    description:
      'Southbelt keeps a large belting inventory and has full vulcanization and installation capabilities, available 24/7.',
    askFor: [
      'Belt width and length',
      'Ply and cover',
      'Splice: vulcanized or mechanical fasteners',
      ...plantDetails,
      ...partDetails,
    ],
    keywords: ['belt', 'belting', 'conveyor belt', 'vulcanize', 'splice', 'fasteners'],
    service: 'conveyor-belting',
  },
  {
    slug: 'belt-cleaners-and-idlers',
    name: 'Belt Cleaners, Covers and Idlers',
    category: 'conveyor-components',
    brands: ['PPI', 'Martin Engineering'],
    summary: 'Belt cleaners, conveyor covers and idlers from PPI and Martin Engineering.',
    description:
      'The parts that carry a belt and keep it clean: idlers, belt cleaners and conveyor covers.',
    askFor: ['Belt width', 'Idler type and trough angle', ...plantDetails, ...partDetails],
    keywords: ['idler', 'belt cleaner', 'scraper', 'conveyor cover', 'ppi', 'martin engineering'],
  },
  {
    slug: 'conveyor-pulleys',
    name: 'Conveyor Pulleys',
    category: 'conveyor-components',
    brands: ['Dodge', 'PPI', 'Superior'],
    summary: 'Head, tail and drive pulleys from Dodge, PPI and Superior.',
    description: 'Pulleys for batch conveyors, truck load belts and radial stackers.',
    askFor: [
      'Pulley diameter and face width',
      'Shaft size',
      'Lagged or bare',
      ...plantDetails,
      ...partDetails,
    ],
    keywords: ['pulley', 'head pulley', 'tail pulley', 'drive pulley', 'dodge', 'ppi', 'superior'],
  },
  {
    slug: 'v-belts',
    name: 'V-Belts',
    category: 'conveyor-components',
    brands: ['Bestorq'],
    summary: 'Bestorq V-belts for conveyor and blower drives.',
    description: 'The batch conveyor and radial stacker on a BP-14 both run V-belt drives.',
    askFor: ['Belt number', 'Number of belts on the drive', ...partDetails],
    keywords: ['v-belt', 'v belt', 'bestorq', 'besttorq', 'drive belt'],
  },
  {
    slug: 'emergency-stop-switches',
    name: 'Emergency Stop and Limit Switches',
    category: 'controls-and-instruments',
    brands: ['Conveyor Components Co.'],
    summary: 'Conveyor Components Co. emergency stop switches, and limit switches.',
    description:
      'Emergency stop switches for conveyors from Conveyor Components Co., and limit switches.',
    askFor: ['Switch make and model', ...plantDetails, ...partDetails],
    keywords: [
      'e-stop',
      'emergency stop',
      'pull cord',
      'limit switch',
      'ccc',
      'conveyor components',
    ],
  },
  {
    slug: 'batch-plant-automation',
    name: 'Batch Plant Automation',
    category: 'controls-and-instruments',
    brands: ['Command Alkon', 'Jonel'],
    summary: 'Command Alkon and Jonel batch plant automation.',
    description:
      'Batching controls from Command Alkon and Jonel. The DP-12 offers a batching computer as an option.',
    askFor: ['Current control system, if any', ...plantDetails, ...partDetails],
    keywords: [
      'batch computer',
      'batching computer',
      'automation',
      'controls',
      'command alkon',
      'jonel',
    ],
  },
  {
    slug: 'level-indicators',
    name: 'Level Indicators',
    category: 'controls-and-instruments',
    brands: ['BinMaster', 'Blue Lake', 'Bindicator'],
    summary: 'Bin and silo level indicators from BinMaster, Blue Lake and Bindicator.',
    description:
      'A level indicator tells the operator how full a bin or silo is. Southbelt plants carry HI bindicators on their silos.',
    askFor: ['Indicator make and model', 'Bin or silo it mounts on', ...partDetails],
    keywords: ['level indicator', 'bindicator', 'binmaster', 'blue lake', 'silo level'],
  },
  {
    slug: 'load-cells',
    name: 'Load Cells',
    category: 'controls-and-instruments',
    brands: ['Rice Lake'],
    summary: 'Rice Lake load cells for cement, aggregate and water batchers.',
    description:
      'The batchers on a BP-14 hang on load cells with a summing box: four 10K cells on the cement batcher, four 20K on the aggregate batcher and three 5K on the water batcher.',
    askFor: [
      'Cell capacity',
      'Number of cells on the batcher',
      'Cell make and model',
      ...plantDetails,
      ...partDetails,
    ],
    keywords: ['load cell', 'summing box', 'rice lake', 'batcher scale'],
  },
  {
    slug: 'water-meters',
    name: 'Water Meters',
    category: 'controls-and-instruments',
    brands: ['Badger Meter'],
    summary: 'Badger Meter water meters for batch plants.',
    description: 'The DP-12 meters its water through a 3-inch water meter.',
    askFor: ['Meter size', 'Meter make and model', ...plantDetails, ...partDetails],
    keywords: ['water meter', 'badger meter', 'badgermeter', 'flow meter'],
  },
  {
    slug: 'pneumatic-blowers',
    name: 'Pneumatic Blowers',
    category: 'blowers-and-service-kits',
    brands: ['Tuthill', 'Paragon'],
    summary: 'Tuthill and Paragon pneumatic blowers, new and used.',
    description:
      'Blowers move cement out of storage pigs and trailers. Southbelt carries the Paragon 1057, P858 and P657, comparable to Gardner Denver and Tuthill, and repairs the blower you have.',
    askFor: ['Blower make and model', 'Electric or diesel drive', ...partDetails],
    keywords: [
      'blower',
      'pneumatic blower',
      'paragon',
      'tuthill',
      'gardner denver',
      'p858',
      'p657',
      '1057',
    ],
    equipment: 'dry-bulk-blowers',
  },
  {
    slug: 'paragon-blower-service-kits',
    name: 'Paragon Blower Service Kits',
    category: 'blowers-and-service-kits',
    brands: ['Paragon'],
    summary: 'Synthetic oil, melt plugs and filter elements for the Paragon P657, P858 and P1057.',
    description:
      'P657: oil 409-007 synthetic. P858 and P1057: oil 409-002 synthetic. All three take melt plug 543-003 (left hand) and filter element 573-003 for a 5-inch outlet or 575-005 for a 4-inch outlet.',
    askFor: [
      'Blower model',
      'Outlet size: 4-inch or 5-inch',
      'Kit parts needed',
      'Quantity',
      'Yard for pickup, or a ship-to',
    ],
    keywords: [
      'service kit',
      'paragon',
      'blower oil',
      'melt plug',
      'filter element',
      '409-007',
      '409-002',
      '543-003',
      '573-003',
      '575-005',
    ],
    equipment: 'dry-bulk-blowers',
  },
  {
    slug: 'vibrators',
    name: 'Vibrators',
    category: 'vibrators',
    brands: ['Houston Vibrator Inc.', 'Vibco'],
    summary: 'Vibrators from Houston Vibrator Inc. and Vibco.',
    description:
      'Vibrators keep material moving out of hoppers and batchers. The BP-14 carries turbine air vibrators on both batchers and a turbine vibrator on the loader hopper.',
    askFor: ['Vibrator make and model', 'Air or electric', ...plantDetails, ...partDetails],
    keywords: ['vibrator', 'turbine vibrator', 'houston vibrator', 'vibco', 'bin vibrator'],
  },
  {
    slug: 'concrete-mixers',
    name: 'Concrete Mixers',
    category: 'plant-equipment',
    brands: ['Erie Strayer Co.'],
    summary: 'Erie Strayer Co. concrete mixers.',
    description: 'Concrete mixers from Erie Strayer Co.',
    askFor: ['Mixer make, model and size', ...plantDetails, ...partDetails],
    keywords: ['mixer', 'central mixer', 'erie strayer', 'concrete mixer'],
  },
  {
    slug: 'slumpstands',
    name: 'Slumpstands',
    category: 'plant-equipment',
    brands: ['C&W Manufacturing'],
    summary: 'C&W Manufacturing slumpstands.',
    description: 'Slumpstands from C&W Manufacturing.',
    askFor: ['Model', 'Yard for pickup, or a ship-to'],
    keywords: ['slumpstand', 'slump stand', 'c&w'],
  },
  {
    slug: 'shaker-screens',
    name: 'Shaker Screens',
    category: 'plant-equipment',
    brands: [],
    summary: 'Shaker screens, including the option on the stationary pugmill.',
    description: 'The stationary pugmill offers a shaker screen as an option.',
    askFor: ['Screen make and model', 'Deck size', 'Opening size', ...partDetails],
    keywords: ['shaker screen', 'screen', 'screen cloth', 'pugmill'],
  },
  {
    slug: 'water-chillers',
    name: 'Water Chillers',
    category: 'plant-equipment',
    brands: ['American Geo-Thermal'],
    summary: 'American Geo-Thermal water chillers for batch plants.',
    description: 'Water chillers from American Geo-Thermal.',
    askFor: ['Required capacity', ...plantDetails, ...partDetails],
    keywords: ['water chiller', 'chiller', 'american geo-thermal', 'hot weather concrete'],
  },
  {
    slug: 'urethane-liners',
    name: 'Urethane Liners',
    category: 'plant-equipment',
    brands: ['Rhino Hyde'],
    summary: 'Rhino Hyde urethane liners for hoppers, bins and chutes.',
    description:
      'Liners protect the sloping sides of hoppers, bins and batchers from wear. Southbelt plants offer AR liners on the sloping sides as an option.',
    askFor: ['Surface to line, with dimensions', ...plantDetails, ...partDetails],
    keywords: ['liner', 'urethane', 'rhino hyde', 'wear liner', 'ar liner'],
  },
];

/** Lookup for the part detail route. */
export const partBySlug = Object.fromEntries(parts.map((part) => [part.slug, part]));

/**
 * Free-text match across the fields a customer would actually type: the part
 * name, the brands, what it does, and the phrases they search for.
 */
export function searchParts(query) {
  const term = query.trim().toLowerCase();
  if (!term) return parts;
  return parts.filter((part) =>
    [part.name, part.summary, part.description, ...part.brands, ...part.keywords]
      .join(' ')
      .toLowerCase()
      .includes(term)
  );
}
