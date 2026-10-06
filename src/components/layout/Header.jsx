/**
 * The frame's top: a black strip with the three yards' numbers, and a white bar
 * with the logo, six destinations and the one action.
 *
 * Equipment is the one destination that is a set rather than a page - eleven
 * machines in four groups, plus the used list - so it is the one trigger that
 * opens a panel. The panel is the width of the bar and lays the four groups
 * side by side, because a visitor choosing a plant reads across the groups to
 * find the right one, and a single column of eleven names is a list to scroll
 * rather than a set to compare.
 *
 * The strip carries the numbers because a plant that is down is a phone call
 * before it is a page visit, and the yard a caller wants is the nearest one. It
 * scrolls away with the page; the bar is what sticks, which is why the header
 * height token counts the bar alone.
 */
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, ChevronDown, ClipboardList, Phone } from 'lucide-react';
import { company, telHref } from '../../content/company';
import { equipmentGroups, equipmentIn } from '../../content/equipment';
import { useQuote } from '../../lib/quote-context';
import Logo from './Logo';
import { iconSize } from '../../lib/icon-size';

const flat = [
  { to: '/parts', label: 'Parts' },
  { to: '/services', label: 'Services' },
  { to: '/rentals', label: 'Rentals' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const navText =
  'relative py-1 font-display text-[0.8125rem] font-bold uppercase tracking-[0.06em] transition-colors duration-fast ' +
  "after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-accent after:content-[''] " +
  'after:transition-transform after:duration-base after:ease-quart-out';

const desktopLink = ({ isActive }) =>
  `${navText} ${isActive ? 'text-ink after:scale-x-100' : 'text-ink-body after:scale-x-0 hover:text-ink'}`;

const triggerClass = (open, active) =>
  `${navText} flex items-center gap-1 ${
    open || active ? 'text-ink after:scale-x-100' : 'text-ink-body after:scale-x-0 hover:text-ink'
  }`;

const mobileLink = ({ isActive }) =>
  `drop-in relative flex items-center py-4 pl-3 font-display text-sm font-bold uppercase tracking-[0.06em] transition-colors duration-fast ` +
  `before:absolute before:inset-y-3 before:left-0 before:w-0.5 before:bg-accent before:content-[''] ${
    isActive ? 'text-ink before:opacity-100' : 'text-ink-body before:opacity-0'
  }`;

const menuLine =
  'h-0.5 w-5 bg-current transition-[transform,opacity] duration-base ease-quart-out';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const { count } = useQuote();
  const toggleRef = useRef(null);
  const closeMobile = () => setMobileOpen(false);
  const closePanel = () => setPanelOpen(false);

  useEffect(() => {
    if (!panelOpen && !mobileOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setPanelOpen(false);
      setMobileOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [panelOpen, mobileOpen]);

  return (
    <>
      <UtilityBar />

      {/* The height sits on the bar rather than on the row inside it, so the
          hairline is drawn inside --header-height, the number the rest of the
          page offsets against, instead of adding a pixel to it. */}
      {/* Leaving the whole bar closes the panel, rather than leaving the
          trigger: the panel hangs below the bar but is inside it, so the
          pointer can travel from the trigger down into the panel. */}
      <header
        className="sticky top-0 z-sticky-nav h-header border-b border-line bg-header"
        onMouseLeave={closePanel}
      >
        <div className="container-page relative flex h-full items-center justify-between gap-6">
          <Link to="/" className="min-w-0" aria-label={`${company.name} Home`} onClick={closeMobile}>
            <Logo imageClass="w-[7.5rem] lg:w-36" sizes="(min-width: 1024px) 144px, 120px" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            <EquipmentTrigger
              open={panelOpen}
              onOpen={() => setPanelOpen(true)}
              onClose={closePanel}
            />
            {flat.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={desktopLink}
                onMouseEnter={closePanel}
                onFocus={closePanel}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {count > 0 && (
              <Link
                to="/quote"
                onClick={closeMobile}
                className="icon-btn relative text-ink-body hover:bg-surface-sunken hover:text-ink"
                aria-label={`Quote List, ${count} ${count === 1 ? 'part' : 'parts'}`}
              >
                <ClipboardList size={iconSize.text} aria-hidden="true" />
                <span
                  key={count}
                  className="pop-in absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[color:var(--tan)] px-1.5 text-xs font-bold tabular-nums text-black"
                  aria-hidden="true"
                >
                  {count}
                </span>
              </Link>
            )}
            <Link
              to="/contact?topic=quote#request"
              onClick={closeMobile}
              className="btn btn-md btn-primary hidden whitespace-nowrap sm:inline-flex"
            >
              Request a Quote
            </Link>

            <button
              type="button"
              ref={toggleRef}
              onClick={() => setMobileOpen((current) => !current)}
              className="icon-btn text-ink-body hover:bg-surface-sunken hover:text-ink lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
            >
              <span
                className="flex h-5 w-5 flex-col items-center justify-center gap-1"
                aria-hidden="true"
              >
                <span className={`${menuLine} ${mobileOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
                <span className={`${menuLine} ${mobileOpen ? 'scale-x-0 opacity-0' : ''}`} />
                <span
                  className={`${menuLine} ${mobileOpen ? '-translate-y-1.5 -rotate-45' : ''}`}
                />
              </span>
            </button>
          </div>

          {panelOpen && (
            <div
              className="drop-in absolute inset-x-5 top-full z-dropdown hidden pt-px sm:inset-x-8 lg:block"
            >
              <EquipmentPanel onNavigate={closePanel} />
            </div>
          )}
        </div>

        {panelOpen && (
          <button
            type="button"
            tabIndex={-1}
            onClick={closePanel}
            aria-hidden="true"
            className="fade-in fixed inset-0 top-header z-behind hidden bg-overlay active:transform-none lg:block"
          />
        )}

        {mobileOpen && (
          <>
            <button
              type="button"
              tabIndex={-1}
              onClick={closeMobile}
              aria-hidden="true"
              className="fade-in fixed inset-0 z-behind bg-overlay active:transform-none lg:hidden"
            />
            {/* The menu is measured against the visible viewport and scrolls
                inside itself, so every destination stays reachable on a short
                screen instead of running off the bottom with nothing to drag.
                Containing the overscroll stops the page behind it moving when
                the list reaches its end. */}
            <nav
              className="drop-in relative max-h-[calc(100dvh-var(--header-height))] overflow-y-auto overscroll-contain border-b border-line bg-header shadow-card-hover lg:hidden"
              aria-label="Main"
            >
              <div className="container-page flex flex-col py-2">
                <MobileEquipment onNavigate={closeMobile} />
                {flat.map((link) => (
                  <NavLink key={link.to} to={link.to} onClick={closeMobile} className={mobileLink}>
                    {link.label}
                  </NavLink>
                ))}
                <Link
                  to="/contact?topic=quote#request"
                  onClick={closeMobile}
                  className="btn btn-lg btn-primary my-4"
                >
                  Request a Quote
                </Link>
              </div>
            </nav>
          </>
        )}
      </header>
    </>
  );
}

/**
 * The black strip above the bar: what the company is on the left, in tan, and
 * the three yards' numbers on the right. On a phone the line about the company
 * goes, and the numbers scroll as one row rather than wrapping into three.
 */
function UtilityBar() {
  return (
    <div className="utility-bar band-dark">
      <div className="container-page flex items-center justify-between gap-6 py-2 text-xs">
        <p className="hidden text-[color:var(--tan)] md:block">
          Concrete batch plants, parts and service since {company.foundedYear}
        </p>
        <ul className="chip-rail items-center gap-x-6 md:gap-x-8" aria-label="Call a Yard">
          {company.locations.map((location) => (
            <li key={location.slug} className="shrink-0">
              <a
                href={telHref(location.phone)}
                className="inline-flex items-center gap-2 whitespace-nowrap text-ink-inverse-muted transition-colors duration-fast hover:text-white"
              >
                <Phone size={iconSize.chrome} aria-hidden="true" className="text-[color:var(--tan)] md:hidden" />
                <span>{location.name}</span>
                <span className="font-medium tabular-nums text-white">{location.phone}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EquipmentTrigger({ open, onOpen, onClose }) {
  return (
    <div
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onBlur={(event) => {
        // Focus moving into the panel keeps it open; the panel is a sibling of
        // the trigger in the bar, so the check is against the whole header.
        const header = event.currentTarget.closest('header');
        if (!header || !header.contains(event.relatedTarget)) onClose();
      }}
    >
      <NavLink
        to="/equipment"
        className={({ isActive }) => triggerClass(open, isActive)}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={onClose}
      >
        Equipment
        <ChevronDown
          size={iconSize.chrome}
          aria-hidden="true"
          className={`transition-transform duration-fast ${open ? 'rotate-180' : ''}`}
        />
      </NavLink>
    </div>
  );
}

/**
 * The equipment panel: the four groups as columns, each naming its machines,
 * and a foot row for the two other ways to get equipment - used, and rented -
 * beside the way into the full list.
 */
function EquipmentPanel({ onNavigate }) {
  return (
    <div
      className="overflow-hidden rounded-b-md border border-t-0 border-line bg-surface-raised shadow-card-hover"
      onBlur={(event) => {
        const header = event.currentTarget.closest('header');
        if (!header || !header.contains(event.relatedTarget)) onNavigate();
      }}
    >
      <div className="grid grid-cols-4 gap-6 p-6">
        {equipmentGroups.map((group) => (
          <div key={group.slug} className="flex flex-col gap-3">
            <Link
              to={`/equipment#${group.slug}`}
              onClick={onNavigate}
              className="font-display text-micro font-bold uppercase tracking-eyebrow text-accent-text"
            >
              {group.name}
            </Link>
            <ul className="flex flex-col gap-1">
              {equipmentIn(group.slug).map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/equipment/${item.slug}`}
                    onClick={onNavigate}
                    className="-mx-2 block rounded px-2 py-1.5 font-display text-sm font-bold text-ink transition-colors duration-fast hover:bg-surface-sunken"
                  >
                    {item.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-6 border-t border-line bg-surface-sunken px-6 py-4">
        <div className="flex flex-wrap items-center gap-6">
          <Link
            to="/equipment/used"
            onClick={onNavigate}
            className="font-display text-sm font-bold text-ink-body hover:text-accent-text"
          >
            Used Equipment
          </Link>
          <Link
            to="/rentals"
            onClick={onNavigate}
            className="font-display text-sm font-bold text-ink-body hover:text-accent-text"
          >
            Equipment Rentals
          </Link>
        </div>
        <Link
          to="/equipment"
          onClick={onNavigate}
          className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent-text"
        >
          All Equipment
          <ArrowRight size={iconSize.chrome} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function MobileEquipment({ onNavigate }) {
  return (
    <div className="border-b border-line py-2">
      <Link
        to="/equipment"
        onClick={onNavigate}
        className="drop-in flex items-center py-3 pl-3 font-display text-sm font-bold uppercase tracking-[0.06em] text-ink"
      >
        Equipment
      </Link>
      <ul className="grid grid-cols-1 gap-x-4 pb-2 pl-3 sm:grid-cols-2">
        {equipmentGroups.map((group) => (
          <li key={group.slug}>
            <Link
              to={`/equipment#${group.slug}`}
              onClick={onNavigate}
              className="flex items-center py-2.5 text-sm font-medium text-ink-body hover:text-ink"
            >
              {group.name}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to="/equipment/used"
            onClick={onNavigate}
            className="flex items-center py-2.5 text-sm font-medium text-ink-body hover:text-ink"
          >
            Used Equipment
          </Link>
        </li>
      </ul>
    </div>
  );
}
