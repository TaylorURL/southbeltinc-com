import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download, PackageSearch, Search } from 'lucide-react';
import BrandRow from '../components/sections/BrandRow';
import CallToAction from '../components/sections/CallToAction';
import FaqList from '../components/sections/FaqList';
import PageHeader from '../components/sections/PageHeader';
import PartCard from '../components/sections/PartCard';
import { brands } from '../content/brands';
import { company } from '../content/company';
import { partsFaqs } from '../content/faq';
import { categoryBySlug, partCategories } from '../content/part-categories';
import { searchParts } from '../content/parts';
import { fitDescription, useSeo } from '../lib/seo';
import { faqSchema } from '../lib/structured-data';
import { iconSize } from '../lib/icon-size';

/**
 * The catalog filters by query string, so the head follows the category in
 * view while the canonical stays on the one indexable address, `/parts`.
 */
export const metadata = (category) => ({
  title: category
    ? `${category.name} for Concrete Batch Plants`
    : 'Concrete Batch Plant Parts in Texas',
  description: category
    ? fitDescription(
        category.blurb,
        'Quoted by the parts counter at Southbelt yards in Houston, San Marcos and Dallas.',
        'Quoted by the Southbelt parts counter.'
      )
    : 'Motors, gearboxes, bearings, dust collection, pneumatics, pumps, valves, conveyor parts and blower service kits for concrete batch plants, from Southbelt in Texas.',
  canonical: '/parts',
  openGraph: { type: 'website' },
});

const jsonLd = faqSchema(partsFaqs);

export default function Parts() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const activeCategory = params.get('category');
  const category = activeCategory ? categoryBySlug[activeCategory] : null;

  useSeo(metadata(category), jsonLd);

  const results = useMemo(() => {
    const matches = searchParts(query);
    return activeCategory ? matches.filter((part) => part.category === activeCategory) : matches;
  }, [query, activeCategory]);

  function selectCategory(slug) {
    // replace keeps a run of filter clicks from filling the back button.
    setParams(slug ? { category: slug } : {}, { replace: true });
  }

  return (
    <>
      <PageHeader
        eyebrow="Industrial Replacement Parts"
        title={category ? category.name : 'Parts for the plant you already run'}
        intro={
          category
            ? category.blurb
            : 'Bearings, motors, pneumatics, pumps and the rest of the plant, from three Texas yards. Add what you need to a quote list and send it as one request. Should an item be absent from our stock, we can procure it for you.'
        }
        photo={{
          name: 'parts-counter',
          alt: 'The Southbelt parts counter, with shelving of stock behind it',
        }}
      >
        <a
          href="/brochures/southbelt-belting-and-line-card.pdf"
          download
          className="btn btn-lg btn-sky-outline w-full sm:w-auto"
        >
          <Download size={iconSize.text} aria-hidden="true" />
          Download the Line Card
        </a>
      </PageHeader>

      <div className="container-page flex flex-col gap-6 py-10 lg:py-14">
        {/* Search leads, because a visitor who knows the part name is the one with
            the shortest path to a quote. The count sits beside it so a filter that
            narrows to nothing says so before the reader scrolls to find out. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={iconSize.text}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
              aria-hidden="true"
            />
            <label htmlFor="part-search" className="sr-only">
              Search Parts or Brands
            </label>
            <input
              id="part-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Parts or Brands"
              className="field pl-10"
            />
          </div>
          <p className="text-sm text-ink-muted" aria-live="polite">
            {results.length} {results.length === 1 ? 'part' : 'parts'}
            {category ? ` in ${category.name}` : ''}
          </p>
        </div>

        {/* Thirteen filters left to wrap stack many rows deep on a phone and
            push the catalog below the fold. The rail holds them to one
            scrolling row at that width. */}
        <div className="chip-rail items-center">
          <button
            type="button"
            aria-pressed={!activeCategory}
            onClick={() => selectCategory(null)}
            className={`btn btn-md shrink-0 whitespace-nowrap ${activeCategory ? 'btn-outline' : 'btn-action'}`}
          >
            All Parts
          </button>
          {partCategories.map((item) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={activeCategory === item.slug}
              onClick={() => selectCategory(item.slug)}
              className={`btn btn-md shrink-0 whitespace-nowrap ${
                activeCategory === item.slug ? 'btn-action' : 'btn-outline'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {results.length > 0 ? (
          <>
            {/* The cards carry h3 under the h1, so the level between them has to
                exist for the list to be reachable by heading. */}
            <h2 className="sr-only">Parts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((part) => (
                <PartCard key={part.slug} part={part} />
              ))}
            </div>
          </>
        ) : (
          // The same dashed panel the empty quote list uses, so the two dead ends
          // on the parts path read as one state and not as a page that broke.
          <div className="flex flex-col items-center gap-6 rounded-md border-2 border-dashed border-line-strong bg-surface-sunken p-10 text-center">
            <div className="flex flex-col items-center gap-3">
              <PackageSearch
                size={iconSize.feature}
                className="text-ink-faint"
                aria-hidden="true"
              />
              <h2 className="text-xl">No parts match that search</h2>
              <p className="max-w-md text-ink-muted">
                The catalog is a portion of what we carry. Send the part, the brand and the plant it
                goes on to{' '}
                <a
                  href={`mailto:${company.email.sales}`}
                  className="text-ink underline transition-colors duration-fast hover:text-accent-text"
                >
                  {company.email.sales}
                </a>{' '}
                and we will look for it.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                selectCategory(null);
              }}
              className="btn btn-lg btn-primary"
            >
              Show All Parts
            </button>
          </div>
        )}
      </div>

      <section
        id="brands"
        aria-labelledby="brands-heading"
        className="section-defer [--section-intrinsic:24rem] border-t border-line bg-surface-sunken"
      >
        <div className="container-page flex flex-col gap-8 py-16 lg:py-20">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Brands</p>
            <h2 id="brands-heading" className="text-3xl leading-tight">
              Brands we work with
            </h2>
          </div>
          <BrandRow brands={brands} />
        </div>
      </section>

      <section className="section-defer [--section-intrinsic:24rem]">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:py-20">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Questions</p>
            <h2 className="text-3xl leading-tight">You ask, we answer</h2>
          </div>
          <FaqList faqs={partsFaqs} />
        </div>
      </section>

      <CallToAction
        title="Can't find the part?"
        body="The catalog is a portion of what we carry. Tell us the part, the brand and the plant it goes on, and we will look for it."
        action={{ to: '/contact?topic=parts#request', label: 'Ask the Parts Counter' }}
      />
    </>
  );
}
