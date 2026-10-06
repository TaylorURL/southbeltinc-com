/**
 * Everything stated here is something the company says about itself: the
 * founding year, the three decades of experience, the customers it names, the
 * mission in its own words, and the reviews quoted as written. Counts and
 * dates come from `company`, so the page and the structured data cannot
 * disagree.
 */
import { Star } from 'lucide-react';
import CallToAction from '../components/sections/CallToAction';
import LocationCards from '../components/sections/LocationCards';
import PageHeader from '../components/sections/PageHeader';
import SectionHeading from '../components/sections/SectionHeading';
import Photo from '../components/media/Photo';
import { company } from '../content/company';
import { useSeo } from '../lib/seo';
import { localBusinessSchema } from '../lib/structured-data';
import { iconSize } from '../lib/icon-size';

export const metadata = {
  title: 'About Southbelt Repair and Supply Inc.',
  description:
    'Southbelt Repair and Supply Inc. has serviced concrete batch plants since 2002, with yards in Houston, San Marcos and Dallas and a management team with over three decades of experience.',
  canonical: '/about',
  openGraph: { type: 'website' },
};

function Stars({ count }) {
  return (
    <span className="flex gap-0.5 text-[color:var(--star)]" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <Star key={index} size={iconSize.chrome} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export default function About() {
  useSeo(metadata, localBusinessSchema());

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title={`Providing industrial parts and services since ${company.foundedYear}`}
        intro="With over three decades of experience, our management team brings a deep understanding of the industry's requirements to the table, and that expertise is what keeps production efficient in the field."
        photo={{
          name: 'front-desk',
          alt: 'The front desk inside the Southbelt office',
        }}
      />

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Concrete Commitment to Quality</p>
            <h2 className="text-3xl leading-tight sm:text-4xl">We succeed when we fulfill your needs</h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-body">
            {company.name} serves the concrete and industrial sectors with equipment, parts,
            fabrication and service. We have serviced concrete batch plants since{' '}
            {company.foundedYear}, and our team brings over three decades of industry experience.
          </p>
          <p className="prose-body">
            We saw the need for a one-stop source for the concrete and industrial fields: replacement
            parts and repairs for the equipment those industries run, rentals that keep projects
            moving, and the fabrication and manufacturing to build batch plants and more.
          </p>
          <p className="prose-body">
            Our work goes beyond supplying the product. We install, maintain and repair what we
            supply, and that after-sales support is how we build long-term relationships with our
            clients.
          </p>
        </div>

        <figure className="flex flex-col gap-5 rounded-md bg-band-navy p-8 band-dark lg:p-10">
          <p className="eyebrow-rule text-[color:var(--tan)]">Our Mission</p>
          <blockquote className="font-display text-xl font-bold leading-snug text-ink-inverse sm:text-2xl">
            &ldquo;{company.mission}&rdquo;
          </blockquote>
          <figcaption className="text-sm text-ink-inverse-muted">{company.name}</figcaption>
        </figure>
      </section>

      <section className="section-defer [--section-intrinsic:30rem] border-y border-line bg-surface-sunken">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
          <div className="media-frame aspect-[4/3] rounded-md">
            <Photo
              name="alliance-plant"
              alt="A completed batch plant with its silo, batchers and mixer trucks under a clear sky"
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="eyebrow">Large Projects</p>
              <h2 className="text-3xl leading-tight">No stranger to big projects</h2>
            </div>
            <p className="prose-body">
              We have had the pleasure of working with companies such as these, to name a few.
            </p>
            <ul className="flex flex-wrap gap-3" aria-label="Customers">
              {company.customers.map((customer) => (
                <li
                  key={customer}
                  className="rounded border border-line-strong bg-surface-raised px-4 py-2 font-display text-base font-bold text-ink"
                >
                  {customer}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="reviews-heading"
        className="section-defer [--section-intrinsic:28rem] container-page flex flex-col gap-10 py-16 lg:py-20"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Reviews</p>
            <h2 id="reviews-heading" className="text-3xl leading-tight">
              What customers say
            </h2>
          </div>
          <p className="flex items-center gap-3 text-sm text-ink-muted">
            <Stars count={5} />
            <span>
              <span className="font-display text-lg font-extrabold text-ink">
                {company.rating.value}
              </span>{' '}
              on {company.rating.source}, {company.rating.count} reviews
            </span>
          </p>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {company.reviews.map((review) => (
            <li key={review.author}>
              <figure className="card flex h-full flex-col gap-4 p-6">
                <Stars count={review.rating} />
                <span className="sr-only">{review.rating} out of 5 stars</span>
                <blockquote className="flex-1 leading-relaxed text-ink-body">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="font-display text-sm font-bold text-ink">
                  {review.author}, on {company.rating.source}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-defer [--section-intrinsic:20rem] border-t border-line bg-surface-sunken">
        <div className="container-page grid gap-8 py-14 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
          <img
            src="/brand/partners/taca.webp"
            alt="Texas Aggregates and Concrete Association"
            width="262"
            height="98"
            loading="lazy"
            className="h-16 w-auto justify-self-start rounded bg-white p-2"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-xl">Member of {company.memberships[0].short}</h2>
            <p className="prose-body">
              Southbelt is a proud member of the{' '}
              <a
                href={company.memberships[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline transition-colors duration-fast hover:text-accent-text"
              >
                {company.memberships[0].name}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section-defer [--section-intrinsic:30rem] container-page flex flex-col gap-10 py-16 lg:py-20">
        <SectionHeading
          eyebrow="Three Locations in Texas"
          title="Closer to the plant that needs us"
          intro="Headquarters in Pasadena for the Houston area, with yards in Kingsbury for San Marcos and Alvarado for Dallas."
        />
        <LocationCards detailed />
      </section>

      <CallToAction />
    </>
  );
}
