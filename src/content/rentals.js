/**
 * The rental fleet, the way the rental application lists it, and the questions
 * people ask before renting.
 *
 * `name` is what the request form offers and what the email carries, so it is
 * Title Case and matches what the rentals desk calls each unit. `note` is an optional line under the name. `detail` points
 * at the equipment page where the unit is also sold, when there is one.
 */

export const rentalFleet = [
  {
    slug: 'storage-pig',
    name: 'Storage Pig',
    note: 'Portable storage pig, with or without a blower',
    photo: 'storage-pig-cutout',
    cutout: true,
    photoAlt: 'A gray Southbelt portable storage pig with its blower',
    detail: '/equipment/portable-storage-pigs',
  },
  {
    slug: 'auger-1350-cf',
    name: 'Auger 1350 CF',
    note: 'Portable auger for conveying material',
    photo: 'auger-1350',
    photoAlt: 'A blue portable 1350 CF auger and hopper on its trailer',
  },
  {
    slug: 'self-erecting-water-tank',
    name: 'Self-Erecting Water Tank',
    note: '12,000 gallon nominal capacity',
    photo: 'water-tank-rental',
    photoAlt: 'A white Southbelt self-erecting water tank rental unit outdoors',
    detail: '/equipment/self-erecting-water-tank',
  },
  {
    slug: 'diesel-blower',
    name: 'Diesel Blower',
    note: '74 HP, with or without the trailer',
    photo: 'diesel-blower',
    cutout: true,
    photoAlt: 'A 74 HP diesel dry bulk blower on a two-axle trailer',
    detail: '/equipment/dry-bulk-blowers',
  },
  {
    slug: 'electric-blower',
    name: 'Electric Blower',
    note: '50 HP, with or without the stand',
    photo: 'electric-blower',
    cutout: true,
    photoAlt: 'A 50 HP electric dry bulk blower on a galvanized stand',
    detail: '/equipment/dry-bulk-blowers',
  },
  {
    slug: 'boom-crane',
    name: '4 Axle Boom Crane',
    photo: 'boom-crane',
    photoAlt: 'A yellow four-axle boom crane with an oversize load banner in the yard',
  },
  {
    slug: 'insulated-frac-tank',
    name: 'Insulated Frac Tank',
    photo: 'frac-tank',
    photoAlt: 'A black insulated frac tank trailer parked on grass',
  },
];

/** The three steps, as the company describes renting. */
export const rentalSteps = [
  {
    title: 'Tell Us What You Need',
    body: 'Call or send the request below with the equipment you need for your project.',
  },
  {
    title: 'We Prepare Your Rental',
    body: 'Our team guides you through the process of getting the rental ready.',
  },
  {
    title: 'Put It to Work',
    body: 'You get the equipment you need, when you need it.',
  },
];

/** How long the rental is needed, as the application offers it. */
export const rentalTimeFrames = ['24-48 Hours', '1-4 Weeks', '30 Days+'];

/** How the rental gets to the job. */
export const rentalFreight = ['Customer Pickup', 'Southbelt Delivery'];

export const rentalFaqs = [
  {
    question: 'What do I need to qualify for a rental?',
    answer:
      'Every client’s situation is different, so qualifications are worked out case by case. Starting with the rental request gives us what we need to tailor the rental to your project. If you have questions along the way, call or email the rentals desk.',
  },
  {
    question: 'How long can I keep the rental?',
    answer:
      'It depends on your needs and on the equipment’s availability, and we work to fit your project timeline. Tell us about the project and we will settle on a rental period together.',
  },
  {
    question: 'Can I purchase the rental?',
    answer:
      'Yes. If you would like to buy the equipment you are renting, let us know and we will go over the terms, conditions and pricing for that unit.',
  },
];
