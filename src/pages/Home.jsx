import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BrandRow from '../components/sections/BrandRow';
import CallToAction from '../components/sections/CallToAction';
import EquipmentCard from '../components/sections/EquipmentCard';
import FaqList from '../components/sections/FaqList';
import LocationCards from '../components/sections/LocationCards';
import PartTile from '../components/sections/PartTile';
import SectionHeading from '../components/sections/SectionHeading';
import Photo from '../components/media/Photo';
import { featuredBrands } from '../content/brands';
import { company } from '../content/company';
import { equipmentBySlug } from '../content/equipment';
import { faqs } from '../content/faq';
import { featuredCategories } from '../content/part-categories';
import { useSeo } from '../lib/seo';
import { faqSchema, localBusinessSchema } from '../lib/structured-data';
import { iconSize } from '../lib/icon-size';

export const metadata = {
  title: 'Concrete Batch Plants, Parts and Repair in Texas',
  description:
    'Southbelt builds the BP-14, DP-12 and SBM-12 batch plants, stocks batch plant parts, and repairs equipment 24/7 from yards in Houston, San Marcos and Dallas.',
  canonical: '/',
  openGraph: { type: 'website' },
};

/** The four figures under the hero, each one the company states itself. */
const stats = [
  { value: `Since ${company.foundedYear}`, label: 'Servicing concrete batch plants' },
  { value: '3 Texas Yards', label: 'Houston, San Marcos and Dallas' },
  // Non-breaking hyphens, so a narrow column wraps between the models rather
  // than inside one.
  { value: 'BP\u201114 · DP\u201112 · SBM\u201112', label: 'Batch plants built in-house' },
  { value: '24/7', label: 'Repair availability' },
];

const plant = (slug) => {
  const item = equipmentBySlug[slug];
  return {
    to: `/equipment/${item.slug}`,
    eyebrow: item.eyebrow,
    title: item.shortName,
    summary: item.summary,
    photo: item.photo,
    photoAlt: item.photoAlt,
    photoPosition: item.photoPosition,
  };
};

/** The six cards: three plants by name, then the three groups around them. */
const equipmentCards = [
  plant('bp-14-batch-plant'),
  plant('bp-14-augerless-batch-plant'),
  plant('dp-12-decumulating-plant'),
  {
    to: '/equipment#pugmills',
    eyebrow: 'Mixing',
    title: 'Pugmills',
    summary: 'Portable and stationary pugmills at 500, 750 or 1000 TPH, with silos from 400 to 1200 BBL.',
    photo: 'portable-pugmill',
    photoAlt: 'A portable pugmill with its feeders, conveyors and cement silo on a job site',
  },
  {
    to: '/equipment#storage',
    eyebrow: 'Storage',
    title: 'Vertical and Portable Pigs',
    summary: 'Vertical silos that fill and discharge at once, and storage pigs to buy new, buy used or rent.',
    photo: 'storage-pig',
    photoAlt: 'A gray Southbelt portable storage pig on its trailer, parked on grass',
  },
  {
    to: '/equipment#support',
    eyebrow: 'Support',
    title: 'Blowers, Tanks and Conveyors',
    summary: 'Paragon dry bulk blowers, a self-erecting water tank and the RM-Series conveyor.',
    photo: 'diesel-blower',
    photoAlt: 'A 74 HP diesel dry bulk blower on a two-axle trailer',
    plate: true,
  },
];

/** The service band's rows: the work, and the one fact that sells it. */
const serviceRows = [
  { to: '/services#repairs', name: 'Emergency Repairs', note: 'Qualified technicians, 24/7' },
  {
    to: '/services#preventative-maintenance',
    name: 'Preventative Maintenance',
    note: 'Weekly or monthly plans',
  },
  { to: '/services#fabrication', name: 'Custom Fabrication', note: 'Plant, silo, tank and structural' },
  { to: '/rentals', name: 'Equipment Rentals', note: 'Pigs, blowers, tanks and a crane' },
];

export default function Home() {
  useSeo(metadata, [localBusinessSchema(), faqSchema(faqs)]);

  return (
    <>
      {/* The hero splits the way the design does: the type on the logo's navy,
          the crew under a plant filling the right side to the screen's edge.
          On a phone the photo follows the type rather than sitting behind it,
          so the headline never has to fight a photograph for contrast. */}
      <section className="band-dark relative overflow-hidden bg-band-navy">
        <div className="lg:grid lg:min-h-[40rem] lg:grid-cols-[57fr_43fr]">
          <div className="container-page flex items-center py-14 sm:py-16 lg:ml-auto lg:mr-0 lg:max-w-[52rem] lg:py-24 lg:pr-16">
            {/* Three steps of space, each on a container: label to title is the
                tightest, title to lede is one step wider, and the actions sit a
                step wider again. */}
            <div className="flex flex-col items-start gap-10">
              <div className="flex flex-col items-start gap-6">
                <div className="flex flex-col items-start gap-5">
                  <p className="eyebrow-rule font-display text-xs font-bold uppercase tracking-eyebrow text-accent-inverse">
                    Houston · San Marcos · Dallas
                  </p>
                  <h1 className="display max-w-[11ch] text-5xl text-ink-inverse sm:text-6xl lg:text-[4.25rem]">
                    Batch plants built and kept running.
                  </h1>
                </div>
                <p className="max-w-[34rem] text-lg leading-relaxed text-ink-inverse-muted">
                  Southbelt builds the BP-14, DP-12 and SBM-12 batch plants, stocks parts for the
                  plant you already run, and repairs equipment with technicians available 24/7.
                </p>
              </div>
              {/* Stacked full width on a phone, where two buttons sized to their
                  own labels sit at ragged widths and neither reads as the
                  primary one. */}
              <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Link to="/contact?topic=repair#request" className="btn btn-lg btn-tan">
                  Request Service
                </Link>
                <Link to="/parts" className="btn btn-lg btn-sky-outline">
                  Browse Parts
                </Link>
              </div>
            </div>
          </div>
          {/* The largest thing on the first screen at desktop widths, so it is
              fetched at high priority rather than left to queue. */}
          <div className="media-frame relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto">
            <Photo
              name="crew-under-plant"
              alt="Two Southbelt crew members in hard hats and safety vests looking up at the steel of a batch plant"
              sizes="(min-width: 1024px) 43vw, 100vw"
              position="50% 40%"
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="band-sky" aria-label="Southbelt at a Glance">
        <dl className="container-page grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:py-12">
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col gap-1.5">
              <dt className="order-2 text-sm leading-snug">{stat.label}</dt>
              <dd className="order-1 font-display text-2xl font-extrabold leading-tight text-band-sky-ink sm:text-[1.75rem]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-page flex flex-col gap-10 py-16 lg:py-24">
        <SectionHeading
          eyebrow="Built In-House"
          title="Plants and plant equipment"
          intro="Batch plants and pugmills, plus the silos, storage pigs, blowers, tanks and conveyors that go around them."
        >
          <Link to="/equipment" className="btn btn-md btn-outline">
            All Equipment
          </Link>
        </SectionHeading>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipmentCards.map((card) => (
            <EquipmentCard key={card.to} {...card} />
          ))}
        </div>
      </section>

      <section className="section-defer [--section-intrinsic:40rem] bg-surface-sunken lg:grid lg:grid-cols-[44fr_56fr]">
        <div className="media-frame relative aspect-[4/3] lg:aspect-auto">
          <Photo
            name="welders-shop"
            alt="A welder working inside a steel frame on the floor of the Southbelt fabrication shop"
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="container-page py-16 lg:ml-0 lg:max-w-[46rem] lg:py-24 lg:pl-16">
          <div className="flex flex-col items-start gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="eyebrow">Service and Repair</p>
                <h2 className="text-3xl leading-tight sm:text-4xl">Keep the plant running</h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Qualified technicians for emergency repairs, maintenance on a weekly or monthly
                schedule, and fabrication from our own shops, for the concrete and material
                handling equipment you run.
              </p>
            </div>
            <ul className="w-full border-t border-line">
              {serviceRows.map((row) => (
                <li key={row.name} className="border-b border-line">
                  <Link
                    to={row.to}
                    className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <span className="font-display text-lg font-bold text-ink transition-colors duration-fast group-hover:text-accent-text">
                      {row.name}
                    </span>
                    <span className="text-sm text-ink-muted">{row.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/contact?topic=repair#request" className="btn btn-md btn-primary">
              Request Service
            </Link>
          </div>
        </div>
      </section>

      <section className="band-dark section-defer [--section-intrinsic:44rem] bg-band-navy">
        <div className="container-page flex flex-col gap-10 py-16 lg:py-24">
          <SectionHeading
            tone="dark"
            eyebrow="Parts Counter"
            title="The parts a plant goes through"
            intro="Build a list against your plant and send it as one request. A sales rep reaches out in the order requests come in."
          >
            <Link to="/parts" className="btn btn-md btn-tan">
              Browse All Parts
            </Link>
          </SectionHeading>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((category) => (
              <PartTile key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-defer [--section-intrinsic:14rem] border-b border-line">
        <div className="container-page flex flex-col gap-6 py-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="eyebrow text-ink-muted">Brands We Stock and Service</h2>
            <Link
              to="/parts#brands"
              className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent-text"
            >
              All Brands
              <ArrowRight size={iconSize.chrome} aria-hidden="true" />
            </Link>
          </div>
          <BrandRow brands={featuredBrands} />
        </div>
      </section>

      <section className="section-defer [--section-intrinsic:30rem] container-page flex flex-col gap-10 py-16 lg:py-24">
        <SectionHeading
          eyebrow="Three Yards"
          title="Closer to the plant that needs us"
          intro="Houston is headquarters. San Marcos sits between Austin and San Antonio, and the Dallas yard is in Alvarado."
        />
        <LocationCards />
      </section>

      <section className="section-defer [--section-intrinsic:36rem] border-t border-line bg-surface-sunken">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:py-24">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="eyebrow">Questions</p>
              <h2 className="text-3xl leading-tight sm:text-4xl">You ask, we answer</h2>
            </div>
            <p className="max-w-md leading-relaxed text-ink-muted">
              Anything not covered here goes to{' '}
              <a
                href={`mailto:${company.email.sales}`}
                className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent-text"
              >
                {company.email.sales}
              </a>
              , or call the nearest yard.
            </p>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CallToAction />
    </>
  );
}
