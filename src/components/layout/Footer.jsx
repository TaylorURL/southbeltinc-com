/**
 * The black band at the foot of every page: the logo on its white pill and
 * what the company does, three short columns of destinations with tan heads,
 * the three yards, and the legal line.
 *
 * The yards are here as well as on the home and contact pages because the
 * address and the number of the nearest yard are what a visitor comes to the
 * bottom of a page for, whichever page they are on.
 */
import { Link } from 'react-router-dom';
import { Facebook } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { addressOf, company, mainPhone, mapHref, phoneHref, telHref } from '../../content/company';
import { iconSize } from '../../lib/icon-size';
import { currentYear } from '../../lib/local-time';

const columns = [
  {
    title: 'Equipment',
    links: [
      { to: '/equipment/bp-14-batch-plant', label: 'BP-14 Batch Plant' },
      { to: '/equipment/bp-14-augerless-batch-plant', label: 'BP-14 Augerless' },
      { to: '/equipment/dp-12-decumulating-plant', label: 'DP-12 Plant' },
      { to: '/equipment#pugmills', label: 'Pugmills' },
      { to: '/equipment/used', label: 'Used Equipment' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/services', label: 'Services' },
      { to: '/parts', label: 'Parts' },
      { to: '/rentals', label: 'Rentals' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ],
  },
];

const linkClass = 'transition-colors duration-fast hover:text-white';

export default function Footer({ children }) {
  const year = currentYear();

  return (
    <footer className="band-dark tan-stripe flex flex-col bg-band-black pt-14 text-ink-inverse-muted">
      <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
        <div className="flex flex-col items-start gap-5">
          <Link to="/" aria-label={`${company.name} Home`}>
            <Logo plate="white" imageClass="w-36" sizes="144px" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed">
            Concrete batch plants, parts, repair and fabrication from three Texas yards.
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="flex flex-col gap-4">
            <h2 className="font-display text-xs font-bold uppercase tracking-eyebrow text-[color:var(--tan)]">
              {column.title}
            </h2>
            <ul className="flex flex-col gap-3 text-sm">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="flex flex-col gap-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-eyebrow text-[color:var(--tan)]">
            Reach Us
          </h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a href={`mailto:${company.email.sales}`} className={linkClass}>
                {company.email.sales}
              </a>
            </li>
            <li>
              <a href={phoneHref} className={`${linkClass} tabular-nums`}>
                {mainPhone}
              </a>
            </li>
            {company.social.facebook && (
              <li>
                <a
                  href={company.social.facebook}
                  className={`${linkClass} inline-flex items-center gap-2`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Facebook size={iconSize.chrome} aria-hidden="true" />
                  Facebook
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container-page mt-12">
        <ul className="grid gap-6 border-t border-line-inverse pt-8 sm:grid-cols-3">
          {company.locations.map((location) => (
            <li key={location.slug} className="flex flex-col gap-1 text-sm">
              <p className="font-display font-bold text-white">{location.name}</p>
              <a href={mapHref(location)} className={linkClass} target="_blank" rel="noreferrer">
                {addressOf(location)}
              </a>
              <a href={telHref(location.phone)} className={`${linkClass} tabular-nums`}>
                {location.phone}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 border-t border-line-inverse">
        <div className="container-page flex flex-col gap-4 py-5 text-xs text-ink-inverse-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="tabular-nums">
            &copy; {year} {company.legalName}
          </p>
          {/* The theme control lives with the other site-wide settings rather
              than in the header, where it would compete with the one action a
              visitor came for. */}
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/privacy" className={linkClass}>
              Privacy
            </Link>
            <Link to="/terms" className={linkClass}>
              Terms
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* The attribution rail the shell passes down. It paints no ground and
          names no ink, so it takes both from this band. */}
      {children}
    </footer>
  );
}
