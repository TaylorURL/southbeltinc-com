/**
 * The frame's top: a black strip with the three yards' numbers, and a white bar
 * with the logo, six destinations and the one action.
 *
 * Equipment is the one destination that is a set rather than a page - nine
 * machines in three groups, plus the used list - so it is the one trigger that
 * opens a panel. The panel runs the full width of the screen under the bar and
 * lays the three groups side by side, each machine with its photo and one
 * line, because a visitor choosing a plant reads across the groups to find the
 * right one, and a single column of nine names is a list to scroll rather than
 * a set to compare.
 *
 * The dim behind an open panel or menu starts at the bar's bottom edge. It is
 * drawn inside the header, so laid over the whole screen it would also sit on
 * the bar's own white ground and grey the bar out from under its links.
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
import { keepModelsWhole } from '../../lib/keep-models-whole';
import Logo from './Logo';
import Photo from '../media/Photo';
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

const menuLine = 'h-0.5 w-5 bg-current transition-[transform,opacity] duration-base ease-quart-out';

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
          <Link
            to="/"
            className="min-w-0"
            aria-label={`${company.name} Home`}
            onClick={closeMobile}
          >
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
              className="btn btn-md btn-tan hidden whitespace-nowrap sm:inline-flex"
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
        </div>

        {/* The dim lets the pointer through: the panel opens on a hover, so
            moving off it onto the page is what closes it, and a click there
            lands on the page rather than on a sheet over it. */}
        {panelOpen && (
          <>
            <div
              aria-hidden="true"
              className="fade-in pointer-events-none absolute inset-x-0 top-full z-behind hidden h-[100dvh] bg-[color:var(--overlay-soft)] lg:block"
            />
            <div className="drop-in absolute inset-x-0 top-full z-dropdown hidden lg:block">
              <EquipmentPanel onNavigate={closePanel} />
            </div>
          </>
        )}

        {mobileOpen && (
          <>
            <button
              type="button"
              tabIndex={-1}
              onClick={closeMobile}
              aria-hidden="true"
              className="fade-in absolute inset-x-0 top-full z-behind h-[100dvh] bg-overlay active:transform-none lg:hidden"
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
                  className="btn btn-lg btn-tan my-4"
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
                <Phone
                  size={iconSize.chrome}
                  aria-hidden="true"
                  className="text-[color:var(--tan)] md:hidden"
                />
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
 * The equipment panel: the three groups as columns, each machine with its photo
 * and the one fact that tells it from its neighbours, then a navy card for the
 * two other ways to get equipment - used, and rented. The foot row is the way
 * into the full list.
 *
 * The photos are decorative here, because the name beside each one says what
 * it is, so they carry no alt text of their own and are only fetched once the
 * panel first opens.
 */
function EquipmentPanel({ onNavigate }) {
  return (
    <div
      className="border-t border-line bg-surface-raised shadow-card-hover"
      onBlur={(event) => {
        const header = event.currentTarget.closest('header');
        if (!header || !header.contains(event.relatedTarget)) onNavigate();
      }}
    >
      <div className="container-page grid grid-cols-[repeat(3,minmax(0,1fr))_17rem] gap-8 py-8 xl:grid-cols-[repeat(3,minmax(0,1fr))_19rem] xl:gap-10">
        {equipmentGroups.map((group) => (
          <div key={group.slug} className="flex flex-col gap-4">
            <Link
              to={`/equipment#${group.slug}`}
              onClick={onNavigate}
              className="border-b border-line pb-3 font-display text-xs font-bold uppercase tracking-eyebrow text-accent-text transition-colors duration-fast hover:text-ink"
            >
              {group.name}
            </Link>
            <ul className="flex flex-col gap-1">
              {equipmentIn(group.slug).map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/equipment/${item.slug}`}
                    onClick={onNavigate}
                    className="group -mx-2 flex items-center gap-3 rounded-md p-2 transition-colors duration-fast hover:bg-surface-sunken"
                  >
                    <span className="media-frame h-12 w-16 shrink-0 rounded">
                      <Photo
                        name={item.photo}
                        alt=""
                        sizes="64px"
                        position={item.photoPosition}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-display text-sm font-bold text-ink transition-colors duration-fast group-hover:text-accent-text">
                        {keepModelsWhole(item.shortName)}
                      </span>
                      <span className="text-xs leading-snug text-ink-muted">{item.menuLine}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="band-dark flex flex-col self-start overflow-hidden rounded-md bg-band-navy">
          <div className="media-frame aspect-[16/9]">
            <Photo
              name="used-pugmill-hoppers"
              alt=""
              sizes="19rem"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 p-5">
            <div className="flex flex-col gap-2">
              <p className="eyebrow-rule font-display text-xs font-bold uppercase tracking-eyebrow text-accent-inverse">
                Used and Rental
              </p>
              <p className="font-display text-lg font-bold leading-tight text-ink-inverse">
                Buy used, or rent by the job
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { to: '/equipment/used', label: 'Used Equipment' },
                { to: '/rentals', label: 'Equipment Rentals' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onNavigate}
                  className="group inline-flex items-center gap-2 font-display text-sm font-bold text-ink-inverse transition-colors duration-fast hover:text-[color:var(--tan)]"
                >
                  {link.label}
                  <ArrowRight
                    size={iconSize.chrome}
                    aria-hidden="true"
                    className="text-[color:var(--tan)] transition-transform duration-fast group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-surface-sunken">
        <div className="container-page flex items-center justify-between gap-6 py-3.5">
          <p className="text-sm text-ink-muted">
            Batch plants and pugmills built in-house, and serviced from three Texas yards.
          </p>
          <Link
            to="/equipment"
            onClick={onNavigate}
            className="group inline-flex items-center gap-2 font-display text-sm font-bold text-accent-text"
          >
            All Equipment
            <ArrowRight
              size={iconSize.chrome}
              aria-hidden="true"
              className="transition-transform duration-fast group-hover:translate-x-0.5"
            />
          </Link>
        </div>
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
