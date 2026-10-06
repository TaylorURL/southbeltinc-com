import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { categoryBySlug } from '../../content/part-categories';
import { useQuote } from '../../lib/quote-context';
import { iconSize } from '../../lib/icon-size';

/**
 * One line of the catalog: its category, its name, the brands the counter
 * carries for it, and the two things a visitor does with it - put it on the
 * quote list, or read what a quote for it needs.
 */
export default function PartCard({ part }) {
  const { addItem, has } = useQuote();
  const onList = has(part.slug);
  const category = categoryBySlug[part.category];

  return (
    <article className="card flex flex-col gap-6 p-6">
      <div className="flex flex-1 flex-col gap-3">
        <p className="eyebrow">{category?.name}</p>
        <h3 className="text-lg">
          <Link
            to={`/parts/${part.slug}`}
            className="transition-colors duration-fast hover:text-accent-text"
          >
            {part.name}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-ink-muted">{part.summary}</p>
        {part.brands.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Brands">
            {part.brands.map((brand) => (
              <li
                key={brand}
                className="rounded-sm border border-line bg-surface-sunken px-2 py-1 text-xs font-medium text-ink-body"
              >
                {brand}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => addItem(part)}
          className={`btn btn-md ${onList ? 'btn-quiet' : 'btn-primary'}`}
          disabled={onList}
        >
          {onList ? (
            <>
              <Check size={iconSize.text} aria-hidden="true" /> On List
            </>
          ) : (
            <>
              <Plus size={iconSize.text} aria-hidden="true" /> Add to Quote
            </>
          )}
        </button>
        <Link
          to={`/parts/${part.slug}`}
          className="inline-flex items-center gap-2 font-display text-sm font-bold text-ink-body transition-colors duration-fast hover:text-accent-text"
        >
          Details<span className="sr-only"> for {part.name}</span>
          <ArrowRight size={iconSize.chrome} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
