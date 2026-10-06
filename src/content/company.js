/* global process */
/**
 * Every business fact the site states lives here, so a detail that changes -- a
 * phone number, a yard, an email desk -- is one edit rather than a search across
 * pages.
 *
 * An empty value is the way a fact that is not established yet is held. The
 * header, footer, About page, and contact page each test a field before
 * rendering it, so a blank leaves no empty heading or dead "Hours:" label
 * behind, and filling it in is all it takes for the UI to appear. Never put a
 * plausible value in a field to fill it: it will be published as fact.
 */

/**
 * The origin the site is served from. It has to match the domain in the browser
 * bar, because it is what canonical tags, Open Graph URLs, the sitemap, and the
 * structured data all point at. A canonical naming a domain that does not serve
 * the page tells a crawler to index the other domain instead, which is how a
 * live site disappears from search results.
 *
 * Set `VITE_SITE_URL` in the host's environment to move the site to another
 * domain without a code change. The guard keeps this readable from both Vite,
 * which rewrites `import.meta.env` at build time, and plain Node, which runs the
 * sitemap script and has no such object.
 */
const buildEnv = (typeof import.meta === 'object' && import.meta.env) || {};
const nodeEnv = (typeof process === 'object' && process.env) || {};
const siteUrl = (
  buildEnv.VITE_SITE_URL ||
  nodeEnv.VITE_SITE_URL ||
  'https://southbelt.taylorurl.com'
).replace(/\/$/, '');

/**
 * Whether search engines may index the site. This is the one switch: it sets
 * the robots meta every route writes, the meta in the static shell, and the
 * Disallow line in robots.txt. It stays off while the site is served from a
 * domain that is not the company's own, so the copy there never competes with
 * southbeltinc.com in results. Flip it with `VITE_SITE_INDEXABLE=true` in the
 * host's environment once the site answers at southbeltinc.com.
 */
const indexFlag = buildEnv.VITE_SITE_INDEXABLE ?? nodeEnv.VITE_SITE_INDEXABLE;
export const indexable = String(indexFlag ?? 'false') === 'true';

export const company = {
  legalName: 'Southbelt Repair & Supply Co. Inc.',
  name: 'Southbelt Repair and Supply Inc.',
  shortName: 'Southbelt',
  url: siteUrl,
  tagline: 'Parts and service for Texas concrete batch plants',

  /** The year the company started servicing batch plants. */
  foundedYear: 2002,

  /**
   * Three desks, each with its own inbox. A request is addressed by what it is
   * about, so a plant quote lands with the people who price plants.
   */
  email: {
    sales: 'sales@southbeltinc.com',
    quotes: 'quotes@southbeltinc.com',
    rentals: 'rentals@southbeltinc.com',
  },

  /**
   * The three yards. The first is headquarters, and its phone is the main
   * number everywhere a single number is shown. `blurb` is the line the company
   * uses for each yard.
   */
  locations: [
    {
      slug: 'houston',
      name: 'Houston',
      role: 'Headquarters',
      street: '109 North Richey St',
      city: 'Pasadena',
      state: 'TX',
      zip: '77506',
      phone: '713-645-9099',
      blurb:
        'Our headquarters moved to Pasadena, a few minutes from the original location. Serving Houston, Galveston, Conroe, Katy and Sugar Land, all the way to Louisiana.',
      photo: 'yard-houston',
      photoAlt: 'The Southbelt building in Pasadena, Texas, with the company sign above the bays',
    },
    {
      slug: 'san-marcos',
      name: 'San Marcos',
      role: 'Branch',
      street: '1110 FM 1339',
      city: 'Kingsbury',
      state: 'TX',
      zip: '78638',
      phone: '830-372-8929',
      blurb:
        'Located between Austin and San Antonio, our San Marcos facility is stocked with the industrial parts you need, when you need them.',
      photo: 'yard-san-marcos',
      photoAlt: 'The Southbelt San Marcos building with the oval company sign over a roll-up door',
    },
    {
      slug: 'dallas',
      name: 'Dallas',
      role: 'Branch',
      street: '4525 Maxey Rd',
      city: 'Alvarado',
      state: 'TX',
      zip: '76009',
      phone: '682-518-6622',
      blurb:
        'Located in Alvarado, Texas, our Dallas facility has the capacity to construct the project you need completed, when you need it.',
      photo: 'yard-dallas',
      photoAlt: 'The Southbelt Dallas shop in Alvarado, Texas, with its main bay door open',
    },
  ],

  /**
   * Where the work goes. Stated by the company as Texas and the rest of the
   * United States, with Houston's reach named as far as Louisiana.
   */
  serviceArea: ['Texas', 'Louisiana', 'United States'],

  /**
   * `{ days, hours }` pairs. Empty on purpose: the sources disagree, and the
   * company has to say which hours are right before any are published.
   */
  hours: [],

  /** Memberships a buyer can check. */
  memberships: [
    {
      name: 'Texas Aggregates & Concrete Association',
      short: 'TACA',
      url: 'https://www.tx-taca.org/',
    },
  ],

  /** Customers the company names on its own site. */
  customers: ['Argos', 'Campbell', 'Century Asphalt', 'Mainland', 'Marietta'],

  mission:
    "At Southbelt Repair and Supply Inc., we're all about friendly, top-notch service. We love making things happen for you, from providing replacement parts to fabricating silos, and even manufacturing entire plant facilities. Our goal? To make your industrial project as easy and stress-free as possible.",

  /** The Google rating on the Houston listing, with the date it was read. */
  rating: { value: '5.0', count: 15, source: 'Google', checked: '2026-10-05' },

  /** Reviews quoted as written, first names only. */
  reviews: [
    {
      author: 'Armando',
      rating: 5,
      text: 'Sales rep are very helpful,they help me find right parts for right price.Thank you! Southbelt',
    },
    {
      author: 'Mark',
      rating: 5,
      text: 'These guys Andrew and Miller Always help out , I always come through last minute and they help get it done or shoot me to a place where I can get what I need',
    },
    {
      author: 'Andrew',
      rating: 5,
      text: 'Friendly staff. Very efficient and helpful. Will definitely continue using SouthBelt inc.',
    },
  ],

  /** Profile URLs. Absent keys render no icon. */
  social: {
    facebook: 'https://www.facebook.com/southbeltinc',
  },
};

/** Headquarters, whose number is the main line. */
export const headquarters = company.locations[0];

/** The main number, as printed. */
export const mainPhone = headquarters.phone;

/** The dialable form of a printed number. */
export const telHref = (phone) => (phone ? `tel:+1${phone.replace(/[^\d]/g, '')}` : '');

/** The main number's dial link. */
export const phoneHref = telHref(mainPhone);

/** One line, for a map query or structured data. */
export const addressOf = (location) =>
  `${location.street}, ${location.city}, ${location.state} ${location.zip}`;

/** A Google Maps search for the street address, which needs no API key. */
export const mapHref = (location) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${company.name}, ${addressOf(location)}`
  )}`;

/** The year the company has been at it since, as a phrase. */
export const sinceLine = `Since ${company.foundedYear}`;
