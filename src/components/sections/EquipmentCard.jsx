import { Link } from 'react-router-dom';
import Photo from '../media/Photo';

/**
 * A photo card for a machine or a group of them: the photograph on top, a navy
 * eyebrow, a black heading and one line. The whole card is the link, through
 * the heading's stretched hit area, so the lift on hover promises a click the
 * card can honor.
 *
 * `plate` draws the photo on white and contains it rather than cropping it, for
 * a cut-out shot on white.
 */
export default function EquipmentCard({
  to,
  eyebrow,
  title,
  summary,
  photo,
  photoAlt,
  photoPosition,
  plate = false,
  headingLevel = 3,
  sizes = '(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw',
}) {
  const Heading = `h${headingLevel}`;
  return (
    <article className="card card-lift group relative flex flex-col overflow-hidden">
      <div
        className={`aspect-[16/10] border-b border-line ${plate ? 'product-plate p-4' : 'media-frame'}`}
      >
        <Photo
          name={photo}
          alt={photoAlt}
          sizes={sizes}
          position={photoPosition}
          className={`h-full w-full ${plate ? 'object-contain' : 'object-cover'} transition-transform duration-base ease-quart-out group-hover:scale-[1.02]`}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Heading className="text-lg sm:text-xl">
          <Link
            to={to}
            className="transition-colors duration-fast after:absolute after:inset-0 group-hover:text-accent-text"
          >
            {title}
          </Link>
        </Heading>
        {summary && <p className="text-sm leading-relaxed text-ink-muted">{summary}</p>}
      </div>
    </article>
  );
}
