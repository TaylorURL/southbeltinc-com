import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { iconSize } from '../../lib/icon-size';

/**
 * The trail above a nested page. It is built from the same list the
 * BreadcrumbList structured data is, so a crumb cannot be shown to a reader and
 * withheld from a crawler or the other way round. On a phone it scrolls as one
 * row rather than wrapping: a trail broken over two lines stops reading as a
 * path.
 */
export default function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-surface-sunken">
      <div className="container-page py-3">
        <ol className="chip-rail items-center font-display text-sm font-bold">
          {trail.map((crumb, index) => {
            const last = index === trail.length - 1;
            return (
              <li key={crumb.path} className="flex shrink-0 items-center gap-2 whitespace-nowrap">
                {index > 0 && (
                  <ChevronRight size={iconSize.chrome} className="text-ink-faint" aria-hidden="true" />
                )}
                {last ? (
                  <span className="text-ink" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="text-ink-muted transition-colors duration-fast hover:text-accent-text"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
