// The extension is spelled out so this module loads in plain Node, where the
// crawl-file generator imports it, as well as through the bundler.
import { company, mainPhone } from '../content/company.js';

/**
 * Structured data is how a company with three yards shows up as one business
 * with three places rather than as three unrelated pages: the panel carrying
 * each yard's number and address, tied to one name. Google drops a block that
 * references a field it cannot verify, so an optional field whose source in
 * `company` is blank is omitted here rather than emitted empty.
 */

const orgId = `${company.url}/#organization`;
const yardId = (location) => `${company.url}/#yard-${location.slug}`;

/** One yard as its own LocalBusiness, carrying its address and number. */
function yardSchema(location) {
  const schema = {
    '@type': 'LocalBusiness',
    '@id': yardId(location),
    name: `${company.name} - ${location.name}`,
    url: `${company.url}/contact#${location.slug}`,
    telephone: location.phone,
    email: company.email.sales,
    image: `${company.url}/photos/${location.photo}-800.webp`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.street,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
      addressCountry: 'US',
    },
    parentOrganization: { '@id': orgId },
  };
  if (company.hours.length) {
    schema.openingHours = company.hours.map((entry) => `${entry.days} ${entry.hours}`);
  }
  return schema;
}

/**
 * The company as an Organization, with each yard as a department. Exported
 * under the name the pages and the generator already import, because it is the
 * business identity block whatever type it carries.
 */
export function localBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: company.name,
    alternateName: 'Southbelt Inc.',
    legalName: company.legalName,
    url: company.url,
    logo: `${company.url}/brand/logo-600.webp`,
    image: `${company.url}/brand/og.png`,
    description:
      'Concrete batch plant manufacturer, parts supplier, repair and fabrication shop, and equipment rentals, with yards in Houston, San Marcos and Dallas, Texas.',
    email: company.email.sales,
    telephone: mainPhone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.locations[0].street,
      addressLocality: company.locations[0].city,
      addressRegion: company.locations[0].state,
      postalCode: company.locations[0].zip,
      addressCountry: 'US',
    },
    department: company.locations.map(yardSchema),
  };

  if (company.foundedYear) schema.foundingDate = String(company.foundedYear);
  if (company.serviceArea.length) {
    schema.areaServed = company.serviceArea.map((area) =>
      area === 'United States'
        ? { '@type': 'Country', name: area }
        : { '@type': 'State', name: area }
    );
  }
  if (company.memberships.length) {
    schema.memberOf = company.memberships.map((membership) => ({
      '@type': 'Organization',
      name: membership.name,
      url: membership.url,
    }));
  }
  const profiles = Object.values(company.social).filter(Boolean);
  if (profiles.length) schema.sameAs = profiles;

  return schema;
}

/** One service, tied back to the business identity. */
export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary,
    serviceType: service.name,
    provider: { '@id': orgId },
    areaServed: { '@type': 'State', name: 'Texas' },
    url: `${company.url}/services#${service.slug}`,
  };
}

/**
 * A machine. It is quoted, not priced, so the offer carries a seller and a URL
 * with no price attached. Claiming a price the site does not publish is what
 * gets a product listing rejected.
 */
export function equipmentSchema(item) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.name,
    description: item.summary,
    category: 'Concrete plant equipment',
    url: `${company.url}/equipment/${item.slug}`,
    image: `${company.url}/photos/${item.photo}-1200.webp`,
    offers: {
      '@type': 'Offer',
      url: `${company.url}/equipment/${item.slug}`,
      seller: { '@id': orgId },
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
  if (item.brand) schema.brand = { '@type': 'Brand', name: item.brand };
  return schema;
}

/** A used listing, which does carry a price, as the listing states it. */
export function usedListingSchema(listing) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: listing.name.startsWith('Renewed') ? listing.name : `Used ${listing.name}`,
    description: listing.features.join('; '),
    url: `${company.url}/equipment/used#${listing.slug}`,
    image: `${company.url}/photos/${listing.photo}-800.webp`,
    offers: {
      '@type': 'Offer',
      price: String(listing.price),
      priceCurrency: 'USD',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: 'https://schema.org/InStock',
      seller: { '@id': orgId },
      url: `${company.url}/equipment/used#${listing.slug}`,
    },
  };
}

/** A catalog part, quoted rather than priced, under the brands the counter carries. */
export function partSchema(part) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: part.name,
    description: part.summary,
    category: part.category,
    url: `${company.url}/parts/${part.slug}`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@id': orgId },
      url: `${company.url}/parts/${part.slug}`,
    },
  };
  if (part.brands.length) {
    schema.brand = part.brands.map((name) => ({ '@type': 'Brand', name }));
  }
  return schema;
}

/** Trail for a nested page, so search results show the path rather than a bare URL. */
export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${company.url}${crumb.path}`,
    })),
  };
}

/** Question and answer pairs, eligible for the expandable results block. */
export function faqSchema(entries) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}
