import { MapPin, Mail, Phone } from 'lucide-react';
import Breadcrumbs from '../components/sections/Breadcrumbs';
import CallToAction from '../components/sections/CallToAction';
import FaqList from '../components/sections/FaqList';
import PageHeader from '../components/sections/PageHeader';
import Photo from '../components/media/Photo';
import { company, mainPhone, phoneHref } from '../content/company';
import { formatPrice, usedDisclaimer, usedEquipment, usedFaqs } from '../content/used-equipment';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema, faqSchema, usedListingSchema } from '../lib/structured-data';
import { iconSize } from '../lib/icon-size';

export const metadata = {
  title: 'Used Concrete Plant Equipment for Sale in Texas',
  description:
    'Used pugmills, feeder hoppers and silos for sale from Southbelt in Texas, sold as-is, where-is. Inventory changes daily, so call for what is in the yard.',
  canonical: '/equipment/used',
  openGraph: { type: 'website' },
};

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Equipment', path: '/equipment' },
  { name: 'Used Equipment', path: '/equipment/used' },
];

const jsonLd = [breadcrumbSchema(trail), faqSchema(usedFaqs), ...usedEquipment.map(usedListingSchema)];

/** The email a listing's button opens: the sales desk, with the listing named. */
const askHref = (listing) => {
  const subject = `Used equipment: ${listing.name} (${formatPrice(listing.price)})`;
  const body = `I am interested in the ${listing.name}${
    listing.location ? ` in ${listing.location}` : ''
  }.\n\nName:\nCompany:\nPhone:\n`;
  return `mailto:${company.email.sales}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export default function UsedEquipment() {
  useSeo(metadata, jsonLd);

  return (
    <>
      <Breadcrumbs trail={trail} />
      <PageHeader
        eyebrow="Used Equipment"
        title="Used plant equipment, sold as-is"
        intro="Used equipment for the concrete industry, from our Texas yards. Inventory changes daily, so call for what is in the yard today."
      />

      <div className="container-page flex flex-col gap-8 py-14 lg:py-20">
        {usedEquipment.map((listing) => (
          <article
            key={listing.slug}
            id={listing.slug}
            className="card grid overflow-hidden md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            <div className="media-frame relative aspect-[4/3] md:aspect-auto md:min-h-[22rem]">
              <Photo
                name={listing.photo}
                alt={listing.photoAlt}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-6 p-6 lg:p-8">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <h2 className="text-2xl leading-tight">{listing.name}</h2>
                  <p className="font-display text-2xl font-extrabold tabular-nums text-accent-text">
                    {formatPrice(listing.price)}
                  </p>
                </div>
                {listing.location && (
                  <p className="flex items-center gap-2 text-sm text-ink-muted">
                    <MapPin size={iconSize.chrome} aria-hidden="true" />
                    {listing.location}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="eyebrow">Key Features</h3>
                <ul className="grid gap-x-6 gap-y-2 text-sm text-ink-body sm:grid-cols-2">
                  {listing.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[color:var(--tan)]" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="border-l-2 border-line-strong pl-4 text-xs leading-relaxed text-ink-muted">
                {usedDisclaimer}
              </p>
              <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                <a href={askHref(listing)} className="btn btn-md btn-primary">
                  <Mail size={iconSize.text} aria-hidden="true" />
                  Ask About This
                </a>
                <a href={phoneHref} className="btn btn-md btn-outline">
                  <Phone size={iconSize.text} aria-hidden="true" />
                  Call {mainPhone}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="section-defer [--section-intrinsic:24rem] border-t border-line bg-surface-sunken">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:py-20">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="eyebrow">Questions</p>
              <h2 className="text-3xl leading-tight">Looking for used equipment?</h2>
            </div>
            <p className="max-w-md leading-relaxed text-ink-muted">
              Call or write with what you need. For pricing details or to schedule a viewing, call
              the yard directly.
            </p>
          </div>
          <FaqList faqs={usedFaqs} />
        </div>
      </section>

      <CallToAction
        title="Need it new instead?"
        body="Southbelt builds batch plants, pugmills and silos, and sells new blowers, storage pigs, water tanks and conveyors."
        action={{ to: '/equipment', label: 'See New Equipment' }}
      />
    </>
  );
}
