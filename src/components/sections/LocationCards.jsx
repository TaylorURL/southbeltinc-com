import { MapPin, Phone } from 'lucide-react';
import Photo from '../media/Photo';
import { addressOf, company, mapHref, telHref } from '../../content/company';
import { iconSize } from '../../lib/icon-size';

/**
 * The three yards as cards: headquarters first, ringed in tan, then the two
 * branches. Each carries the street address, the number large enough to tap,
 * and a map link by address. `detailed` adds the building photo and the yard's
 * own line, for the contact page.
 */
export default function LocationCards({ detailed = false, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {company.locations.map((location, index) => {
        const hq = index === 0;
        return (
          <li
            key={location.slug}
            id={detailed ? location.slug : undefined}
            className={`card flex flex-col overflow-hidden ${
              hq ? 'border-2 border-[color:var(--tan)]' : ''
            }`}
          >
            {detailed && (
              <div className="media-frame aspect-[16/9] border-b border-line">
                <Photo
                  name={location.photo}
                  alt={location.photoAlt}
                  sizes="(min-width: 768px) 26rem, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex flex-col gap-1">
                <p className="eyebrow">{location.role}</p>
                <Heading className="text-xl">{location.name}</Heading>
              </div>
              <address className="text-sm not-italic leading-relaxed text-ink-muted">
                {location.street}
                <br />
                {location.city}, {location.state} {location.zip}
              </address>
              {detailed && <p className="text-sm leading-relaxed text-ink-body">{location.blurb}</p>}
              <div className="mt-auto flex flex-col gap-3">
                <a
                  href={telHref(location.phone)}
                  className="inline-flex items-center gap-2 font-display text-2xl font-extrabold tabular-nums text-accent-text transition-colors duration-fast hover:text-ink"
                >
                  {detailed && <Phone size={iconSize.text} aria-hidden="true" />}
                  {location.phone}
                </a>
                <a
                  href={mapHref(location)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink-body transition-colors duration-fast hover:text-accent-text"
                >
                  <MapPin size={iconSize.chrome} aria-hidden="true" />
                  Open in Google Maps
                  <span className="sr-only">: {addressOf(location)}</span>
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
