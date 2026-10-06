import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, Download, Mail, Phone } from 'lucide-react';
import Breadcrumbs from '../components/sections/Breadcrumbs';
import CallToAction from '../components/sections/CallToAction';
import EquipmentCard from '../components/sections/EquipmentCard';
import PageHeader from '../components/sections/PageHeader';
import NotFound from './NotFound';
import { company, mainPhone, phoneHref } from '../content/company';
import { equipmentBySlug, equipmentGroups } from '../content/equipment';
import { specsBySlug } from '../content/equipment-specs';
import { equipmentQuoteHref } from '../lib/request-email';
import { fitDescription, useSeo } from '../lib/seo';
import { breadcrumbSchema, equipmentSchema } from '../lib/structured-data';
import { iconSize } from '../lib/icon-size';

const groupBySlug = Object.fromEntries(equipmentGroups.map((group) => [group.slug, group]));

/** Head metadata for one machine, built from the entry it renders. */
export const metadata = (item) => ({
  title: `${item.name} | Southbelt`,
  description: fitDescription(
    item.summary,
    'Specifications, brochure and quotes from Southbelt Repair and Supply in Texas.',
    'Specifications and quotes from Southbelt in Texas.'
  ),
  canonical: `/equipment/${item.slug}`,
  openGraph: { type: 'website' },
});

export default function EquipmentDetail() {
  const { slug } = useParams();
  const item = equipmentBySlug[slug];
  const specs = specsBySlug[slug];
  if (!item || !specs) return <NotFound />;
  return <EquipmentPage key={item.slug} item={item} specs={specs} />;
}

function EquipmentPage({ item, specs }) {
  const group = groupBySlug[item.group];
  const quoteHref = equipmentQuoteHref(item);
  const related = (specs.related || []).map((slug) => equipmentBySlug[slug]).filter(Boolean);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Equipment', path: '/equipment' },
    { name: group.name, path: `/equipment#${group.slug}` },
    { name: item.shortName, path: `/equipment/${item.slug}` },
  ];

  useSeo(metadata(item), [equipmentSchema(item), breadcrumbSchema(trail)]);

  return (
    <>
      <Breadcrumbs trail={trail} />

      <PageHeader
        eyebrow={group.name}
        title={item.name}
        intro={item.summary}
        photo={{ name: item.photo, alt: item.photoAlt, position: item.photoPosition }}
      >
        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <a href={quoteHref} className="btn btn-lg btn-tan">
            <Mail size={iconSize.text} aria-hidden="true" />
            Request a Quote
          </a>
          <a href={item.brochure} className="btn btn-lg btn-sky-outline" download>
            <Download size={iconSize.text} aria-hidden="true" />
            Download Brochure
          </a>
        </div>
      </PageHeader>

      {specs.figures.length > 0 && (
        <section aria-label="Key Figures" className="border-b border-line">
          <dl className="container-page grid grid-cols-2 gap-x-6 gap-y-6 py-8 sm:grid-cols-4">
            {specs.figures.map((figure) => (
              <div key={`${figure.value}-${figure.label}`} className="flex flex-col gap-1 border-l-2 border-[color:var(--tan)] pl-4">
                <dt className="order-2 text-sm text-ink-muted">{figure.label}</dt>
                <dd className="order-1 font-display text-xl font-extrabold leading-tight text-accent-text sm:text-2xl">
                  {figure.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1fr_22rem] lg:gap-16 lg:py-20">
        <div className="flex min-w-0 flex-col gap-12">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl leading-tight sm:text-3xl">{specs.headline}</h2>
            {specs.intro.map((paragraph) => (
              <p key={paragraph} className="prose-body text-base sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {specs.crossReference && (
            <section className="flex flex-col gap-4" aria-labelledby="cross-reference">
              <h2 id="cross-reference" className="text-xl">
                {specs.crossReference.title}
              </h2>
              {/* Wider than a phone, so it scrolls in its own box rather than
                  taking the page sideways with it. */}
              <div className="overflow-x-auto">
                <table className="fact-table min-w-[30rem]">
                  <caption className="sr-only">
                    Paragon blower models and their Gardner Denver, Tuthill and Drum equivalents
                  </caption>
                  <thead>
                    <tr>
                      {specs.crossReference.columns.map((column) => (
                        <th key={column} scope="col">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {specs.crossReference.rows.map(([model, ...rest]) => (
                      <tr key={model}>
                        <th scope="row">{model}</th>
                        {rest.map((cell) => (
                          <td key={cell} className="tabular-nums">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section className="flex flex-col gap-6" aria-labelledby="specifications">
            <h2 id="specifications" className="text-xl">
              Specifications
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {specs.sections.map((section) => (
                <div key={section.title} className="card flex flex-col gap-4 p-5">
                  <h3 className="border-b border-line pb-3 text-base">{section.title}</h3>
                  <ul className="flex flex-col gap-2.5">
                    {section.items.map((spec) => (
                      <li key={spec} className="flex gap-3 text-sm leading-relaxed text-ink-body">
                        <span className="icon-lead text-accent-text">
                          <Check size={iconSize.chrome} aria-hidden="true" />
                        </span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {specs.notes?.map((note) => (
              <p key={note} className="text-sm text-ink-muted">
                {note}
              </p>
            ))}
          </section>
        </div>

        {/* The prose column runs well past one screen, so the ways to ask for a
            price stay in view beside it rather than scrolling off the top. */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <div className="card flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg">Price This {item.shortName}</h2>
              <p className="text-sm leading-relaxed text-ink-muted">
                The quotes desk prices plants and equipment. Your email opens with the model
                already in the subject line.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a href={quoteHref} className="btn btn-lg btn-primary w-full">
                <Mail size={iconSize.text} aria-hidden="true" />
                Request a Quote
              </a>
              <a href={phoneHref} className="btn btn-md btn-outline w-full">
                <Phone size={iconSize.text} aria-hidden="true" />
                Call {mainPhone}
              </a>
            </div>
            <p className="text-xs text-ink-muted">
              Opens your mail program addressed to{' '}
              <span className="font-medium text-ink-body">{company.email.quotes}</span>
            </p>
          </div>

          <div className="card flex flex-col gap-3 p-6">
            <h2 className="text-base">Brochure</h2>
            <p className="text-sm leading-relaxed text-ink-muted">
              The {item.shortName} specification sheet, as a PDF.
            </p>
            <a
              href={item.brochure}
              download
              className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent-text"
            >
              <Download size={iconSize.chrome} aria-hidden="true" />
              Download Brochure
            </a>
          </div>

          {(item.rentable || specs.partsLink) && (
            <div className="card flex flex-col gap-3 p-6">
              {item.rentable && (
                <Link
                  to="/rentals"
                  className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent-text"
                >
                  Rent One Instead
                  <ArrowRight size={iconSize.chrome} aria-hidden="true" />
                </Link>
              )}
              {specs.partsLink && (
                <Link
                  to={specs.partsLink.to}
                  className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent-text"
                >
                  {specs.partsLink.label}
                  <ArrowRight size={iconSize.chrome} aria-hidden="true" />
                </Link>
              )}
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section-defer [--section-intrinsic:30rem] border-t border-line bg-surface-sunken">
          <div className="container-page flex flex-col gap-8 py-14 lg:py-20">
            <h2 className="text-2xl sm:text-3xl">Related equipment</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <EquipmentCard
                  key={other.slug}
                  to={`/equipment/${other.slug}`}
                  eyebrow={other.eyebrow}
                  title={other.name}
                  summary={other.summary}
                  photo={other.photo}
                  photoAlt={other.photoAlt}
                  photoPosition={other.photoPosition}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CallToAction />
    </>
  );
}
