import { Link } from 'react-router-dom';
import { Check, Download } from 'lucide-react';
import CallToAction from '../components/sections/CallToAction';
import PageHeader from '../components/sections/PageHeader';
import Photo from '../components/media/Photo';
import { services } from '../content/services';
import { useSeo } from '../lib/seo';
import { serviceSchema } from '../lib/structured-data';
import { iconSize } from '../lib/icon-size';

export const metadata = {
  title: 'Batch Plant Manufacturing, Fabrication and Repair in Texas',
  description:
    'Plant manufacturing, fabrication, 24/7 repairs, preventative maintenance plans, and conveyor belting with full vulcanization, from Southbelt yards in Houston, San Marcos and Dallas.',
  canonical: '/services',
  openGraph: { type: 'website' },
};

export default function Services() {
  useSeo(metadata, services.map(serviceSchema));

  return (
    <>
      <PageHeader
        eyebrow="Industrial Service"
        title="Building, fixing and maintaining the plant"
        intro="Southbelt manufactures plants, fabricates the steel around them, repairs equipment with technicians available 24/7, and keeps plants on a maintenance schedule."
        photo={{
          name: 'structural-fabrication',
          alt: 'Welded steel structure taking shape on the floor of the Southbelt shop',
        }}
      >
        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
          <Link to="/contact?topic=repair#request" className="btn btn-lg btn-tan">
            Request Service
          </Link>
          <Link to="/contact?topic=plant#request" className="btn btn-lg btn-sky-outline">
            Talk About a Plant
          </Link>
        </div>
      </PageHeader>

      {/* Sticks under the header so the jump list is still reachable from the
          bottom of a page five sections long, which is the only place a reader
          is likely to want it. It sits a layer below the header and clears the
          header's own height, so the two stack rather than overlap. */}
      <nav
        className="sticky top-header z-sticky border-b border-line bg-surface-veil backdrop-blur"
        aria-label="Services"
      >
        <div className="container-page">
          {/* The rail keeps the five names on one line at every width; on a phone
              it scrolls instead of stacking into a block that would push the
              first service off the screen. */}
          <div className="chip-rail py-3">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className="shrink-0 whitespace-nowrap rounded px-3 py-2 font-display text-sm font-bold text-ink-muted transition-colors duration-fast hover:bg-surface-sunken hover:text-ink"
              >
                {service.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="container-page flex flex-col divide-y divide-line">
        {services.map((service, index) => (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-heading`}
            className="grid gap-10 py-16 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-20"
          >
            {/* Alternating sides gives a long page a rhythm; on a phone the photo
                always leads, so every section opens the same way. */}
            <div
              className={`media-frame aspect-[4/3] rounded-md lg:sticky lg:top-40 ${
                index % 2 === 1 ? 'lg:order-2' : ''
              }`}
            >
              <Photo
                name={service.photo}
                alt={service.photoAlt}
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col items-start gap-8">
              <div className="flex flex-col gap-4">
                <p className="eyebrow-rule">{String(index + 1).padStart(2, '0')}</p>
                <h2 id={`${service.slug}-heading`} className="text-3xl leading-tight sm:text-4xl">
                  {service.name}
                </h2>
                <p className="text-lg leading-relaxed text-ink-body">{service.summary}</p>
                {service.description.map((paragraph) => (
                  <p key={paragraph} className="prose-body">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className={`grid w-full gap-5 ${service.groups.length > 1 ? 'xl:grid-cols-2' : ''}`}>
                {service.groups.map((group) => (
                  <div key={group.title} className="card flex flex-col gap-4 p-5">
                    <h3 className="border-b border-line pb-3 text-base">{group.title}</h3>
                    <ul className="flex flex-col gap-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-body">
                          <span className="icon-lead text-accent-text">
                            <Check size={iconSize.chrome} aria-hidden="true" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link to={`/contact?topic=${service.cta.topic}#request`} className="btn btn-md btn-primary">
                  {service.cta.label}
                </Link>
                {service.download && (
                  <a
                    href={service.download.href}
                    download
                    className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent-text"
                  >
                    <Download size={iconSize.chrome} aria-hidden="true" />
                    {service.download.label}
                  </a>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <CallToAction />
    </>
  );
}
