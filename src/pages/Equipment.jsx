import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CallToAction from '../components/sections/CallToAction';
import EquipmentCard from '../components/sections/EquipmentCard';
import PageHeader from '../components/sections/PageHeader';
import SectionHeading from '../components/sections/SectionHeading';
import Photo from '../components/media/Photo';
import { equipment, equipmentGroups, equipmentIn } from '../content/equipment';
import { useSeo } from '../lib/seo';
import { breadcrumbSchema, equipmentSchema } from '../lib/structured-data';
import { iconSize } from '../lib/icon-size';

export const metadata = {
  title: 'Concrete Batch Plants, Pugmills, Silos and Blowers',
  description:
    'The BP-14, BP-14 Augerless, DP-12 and SBM-12 batch plants, portable and stationary pugmills, vertical and storage pigs, Paragon blowers, water tanks and conveyors.',
  canonical: '/equipment',
  openGraph: { type: 'website' },
};

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Equipment', path: '/equipment' },
];

const jsonLd = [breadcrumbSchema(trail), ...equipment.map(equipmentSchema)];

export default function Equipment() {
  useSeo(metadata, jsonLd);

  return (
    <>
      <PageHeader
        eyebrow="Equipment"
        title="Batch plants, pugmills and the equipment around them"
        intro="Southbelt designs and builds its own batch plants, pugmills and silos, and sells, rents and repairs the storage pigs, blowers, water tanks and conveyors that work beside them."
        photo={{
          name: 'alliance-plant',
          alt: 'A completed batch plant with its silo, batchers and mixer trucks under a clear sky',
        }}
      >
        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
          <Link to="/contact?topic=quote#request" className="btn btn-lg btn-tan">
            Request a Quote
          </Link>
          <Link to="/equipment/used" className="btn btn-lg btn-sky-outline">
            Used Equipment
          </Link>
        </div>
      </PageHeader>

      {/* Sticks under the header so the jump list is still reachable from the
          bottom of a long page. It sits a layer below the header and clears
          the header's own height, so the two stack rather than overlap. */}
      <nav
        className="sticky top-header z-sticky border-b border-line bg-surface-veil backdrop-blur"
        aria-label="Equipment Groups"
      >
        <div className="container-page">
          <div className="chip-rail py-3">
            {equipmentGroups.map((group) => (
              <a
                key={group.slug}
                href={`#${group.slug}`}
                className="shrink-0 whitespace-nowrap rounded px-3 py-2 font-display text-sm font-bold text-ink-muted transition-colors duration-fast hover:bg-surface-sunken hover:text-ink"
              >
                {group.name}
              </a>
            ))}
            <Link
              to="/equipment/used"
              className="shrink-0 whitespace-nowrap rounded px-3 py-2 font-display text-sm font-bold text-ink-muted transition-colors duration-fast hover:bg-surface-sunken hover:text-ink"
            >
              Used Equipment
            </Link>
          </div>
        </div>
      </nav>

      <div className="container-page flex flex-col divide-y divide-line">
        {equipmentGroups.map((group) => (
          <section
            key={group.slug}
            id={group.slug}
            aria-labelledby={`${group.slug}-heading`}
            className="flex flex-col gap-10 py-16 lg:py-20"
          >
            <SectionHeading
              id={`${group.slug}-heading`}
              eyebrow={`${equipmentIn(group.slug).length} ${
                equipmentIn(group.slug).length === 1 ? 'Machine' : 'Machines'
              }`}
              title={group.name}
              intro={group.blurb}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {equipmentIn(group.slug).map((item) => (
                <EquipmentCard
                  key={item.slug}
                  to={`/equipment/${item.slug}`}
                  eyebrow={item.eyebrow}
                  title={item.name}
                  summary={item.summary}
                  photo={item.photo}
                  photoAlt={item.photoAlt}
                  photoPosition={item.photoPosition}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="section-defer [--section-intrinsic:28rem] bg-surface-sunken">
        <div className="container-page grid gap-8 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
          <div className="media-frame aspect-[16/10] rounded-md">
            <Photo
              name="used-pugmill-hoppers"
              alt="The feeder hoppers and conveyor frame of a used pugmill in the yard"
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col gap-2">
              <p className="eyebrow">Used and Rental</p>
              <h2 className="text-3xl leading-tight sm:text-4xl">Buy used, or rent</h2>
            </div>
            <p className="max-w-xl leading-relaxed text-ink-muted">
              Used equipment comes and goes from the yards daily: pugmills, hoppers, silos, blowers,
              storage pigs and conveyors, sold as-is, where-is. Storage pigs, blowers, a water tank,
              an auger, a boom crane and an insulated frac tank are also for rent.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/equipment/used"
                className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent-text"
              >
                Used Equipment
                <ArrowRight size={iconSize.chrome} aria-hidden="true" />
              </Link>
              <Link
                to="/rentals"
                className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent-text"
              >
                Equipment Rentals
                <ArrowRight size={iconSize.chrome} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        title="Planning a plant?"
        body="Tell us what you are building and where, and the people who price plants will get back to you."
        action={{ to: '/contact?topic=plant#request', label: 'Talk About a Plant' }}
      />
    </>
  );
}
