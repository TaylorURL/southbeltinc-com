import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
import Breadcrumbs from '../components/sections/Breadcrumbs';
import CallToAction from '../components/sections/CallToAction';
import FormField from '../components/forms/FormField';
import PartCard from '../components/sections/PartCard';
import NotFound from './NotFound';
import { company } from '../content/company';
import { categoryBySlug } from '../content/part-categories';
import { equipmentBySlug } from '../content/equipment';
import { serviceBySlug } from '../content/services';
import { partBySlug, parts } from '../content/parts';
import { useQuote } from '../lib/quote-context';
import { fitDescription, useSeo } from '../lib/seo';
import { breadcrumbSchema, partSchema } from '../lib/structured-data';
import { iconSize } from '../lib/icon-size';

/** Head metadata for one part page, built from the catalog entry it renders. */
export const metadata = (part) => ({
  title: `${part.name} | Batch Plant Parts`,
  description: fitDescription(
    part.summary,
    `Quoted by the parts counter at ${company.name} in Texas.`,
    'Quoted by the Southbelt parts counter in Texas.'
  ),
  canonical: '/parts/' + part.slug,
  openGraph: { type: 'website' },
});

export default function PartDetail() {
  const { slug } = useParams();
  const part = partBySlug[slug];

  if (!part) return <NotFound />;
  return <PartPage key={part.slug} part={part} />;
}

/**
 * Keyed on the slug by its parent so that navigating between two parts remounts
 * the page. Without the remount, the quantity and details a visitor typed for
 * one part would carry over onto the next one they open.
 */
function PartPage({ part }) {
  const { addItem, has } = useQuote();
  const [quantity, setQuantity] = useState(1);
  const [details, setDetails] = useState('');
  const [justAdded, setJustAdded] = useState(false);
  const onList = has(part.slug);

  // The button itself confirms the add for two seconds; the appearing review
  // link alone is easy to miss below the fold of the panel.
  useEffect(() => {
    if (!justAdded) return undefined;
    const timer = window.setTimeout(() => setJustAdded(false), 2000);
    return () => window.clearTimeout(timer);
  }, [justAdded]);
  const category = categoryBySlug[part.category];
  const related = parts.filter(
    (item) => item.category === part.category && item.slug !== part.slug
  );

  // The trail below and the markup are built from one list, so a crumb cannot
  // be shown to a reader and withheld from a crawler or the other way round.
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Parts', path: '/parts' },
    ...(category ? [{ name: category.name, path: `/parts?category=${category.slug}` }] : []),
    { name: part.name, path: `/parts/${part.slug}` },
  ];

  useSeo(metadata(part), [partSchema(part), breadcrumbSchema(trail)]);

  return (
    <>
      <Breadcrumbs trail={trail} />

      <article className="container-page grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr] lg:py-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="eyebrow">{category?.name}</p>
            <h1 className="text-3xl sm:text-4xl">{part.name}</h1>
            <p className="text-lg leading-relaxed text-ink-muted">{part.summary}</p>
            <p className="prose-body">{part.description}</p>
            {part.brands.length > 0 && (
              <div className="flex flex-col gap-3 pt-2">
                <h2 className="eyebrow">Brands</h2>
                <ul className="flex flex-wrap gap-2">
                  {part.brands.map((brand) => (
                    <li
                      key={brand}
                      className="rounded-sm border border-line bg-surface-sunken px-3 py-1.5 text-sm font-medium text-ink-body"
                    >
                      {brand}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(part.service || part.equipment) && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                {part.equipment && (
                  <Link
                    to={`/equipment/${part.equipment}`}
                    className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent-text"
                  >
                    {equipmentBySlug[part.equipment]?.name}
                    <ArrowRight size={iconSize.chrome} aria-hidden="true" />
                  </Link>
                )}
                {part.service && (
                  <Link
                    to={`/services#${part.service}`}
                    className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent-text"
                  >
                    {serviceBySlug[part.service]?.name}
                    <ArrowRight size={iconSize.chrome} aria-hidden="true" />
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl">What a Quote Needs</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {part.askFor.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded border border-line bg-surface-sunken px-4 py-3 text-sm text-ink-body"
                >
                  <span className="icon-lead text-ink-faint">
                    <Check size={iconSize.text} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="card flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-lg">Add to Your Quote List</h2>
              <p className="text-sm leading-relaxed text-ink-muted">
                Collect everything you need, then send it as one request.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="max-w-[7rem]">
                {/* Clamping waits for blur; clamping per keystroke would snap the
                  field back to 1 the moment someone clears it to retype. */}
                <FormField
                  id="quantity"
                  label="Quantity"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  className="tabular-nums"
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(
                      event.target.value === '' ? '' : Math.max(1, Number(event.target.value) || 1)
                    )
                  }
                  onBlur={() => {
                    if (quantity === '') setQuantity(1);
                  }}
                />
              </div>

              <FormField
                id="details"
                label="Plant and Part Details"
                as="textarea"
                rows="4"
                hint={`Include ${part.askFor.join(', ').toLowerCase()}.`}
                value={details}
                onChange={(event) => setDetails(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  addItem(part, Math.max(1, Number(quantity) || 1), details);
                  setJustAdded(true);
                }}
                className="btn btn-lg btn-primary w-full"
              >
                {justAdded ? (
                  <Check size={iconSize.text} aria-hidden="true" />
                ) : (
                  <Plus size={iconSize.text} aria-hidden="true" />
                )}
                {justAdded ? 'Added' : 'Add to Quote'}
              </button>

              {/* The live region has to exist before its content changes, so the
                  wrapper stays mounted and only the link comes and goes. */}
              <div aria-live="polite">
                {onList && (
                  <Link to="/quote" className="rise-in btn btn-md btn-outline w-full">
                    Review Quote List
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* The page ground rather than the sunken surface, and no rule of its own:
          the closing band below is tinted and ruled, and a second ruled band
          straight above it reads as one block split by a double line. The space
          and the heading are what open this section. */}
      {related.length > 0 && (
        <section className="section-defer [--section-intrinsic:25.5rem]">
          <div className="container-page flex flex-col gap-8 py-14">
            <h2 className="text-2xl">More in {category?.name}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PartCard key={item.slug} part={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CallToAction
        title="Can't find the part?"
        body="The catalog is a portion of what we carry. Tell us the part, the brand and the plant it goes on, and we will look for it."
        action={{ to: '/contact?topic=parts#request', label: 'Ask the Parts Counter' }}
      />
    </>
  );
}
