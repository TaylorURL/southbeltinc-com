import PageHeader from '../components/sections/PageHeader';
import { company, mainPhone, phoneHref } from '../content/company';
import { usedDisclaimer } from '../content/used-equipment';
import { useSeo } from '../lib/seo';

/**
 * The terms describe this website, not the service agreement behind a job. The
 * site takes no payment, opens no account, and ships nothing, so everything
 * below is about the pages and the catalog. A purchase order, a rental
 * agreement, or a service contract is signed separately and says what it
 * says; nothing here changes it.
 *
 * The one thing a reader is here to check is what pressing send commits them
 * to, so that is a table near the top rather than a paragraph six sections
 * down. The page ends on the three ways to reach a person, because a reader
 * who got to the bottom of the terms has a question the terms did not answer.
 */
export const metadata = {
  title: 'Terms of Use: This Site and Its Content',
  description:
    'The terms for using this website: what a request is and is not, how used equipment is sold, what the catalog covers, and how the text and images may be used.',
  canonical: '/terms',
  openGraph: { type: 'website' },
};

/** What pressing send does, and the thing each request is repeatedly mistaken for. */
const REQUESTS = [
  {
    what: 'A service request',
    starts: 'A conversation about the work and when it can be done',
    stops: 'It does not book a visit or hold a date',
  },
  {
    what: 'A rental request',
    starts: 'A conversation about the unit, the dates and the freight',
    stops: 'It does not reserve the equipment',
  },
  {
    what: 'A quote request',
    starts: 'A priced reply for the parts or equipment you named',
    stops: 'It does not reserve stock or place an order',
  },
  {
    what: 'A price we quote',
    starts: 'A figure that holds for the period the quote states',
    stops: 'It is not a stock confirmation',
  },
];

/** The three desks, each with what it is for, at the foot of the page. */
const DESKS = [
  { label: 'Call', value: mainPhone, href: phoneHref, note: 'Houston headquarters' },
  {
    label: 'Sales',
    value: company.email.sales,
    href: `mailto:${company.email.sales}`,
    note: 'Parts, service, and anything on this page',
  },
  {
    label: 'Quotes',
    value: company.email.quotes,
    href: `mailto:${company.email.quotes}`,
    note: 'Plants and equipment',
  },
];

export default function Terms() {
  useSeo(metadata);

  return (
    <>
      <PageHeader eyebrow="Terms" title="Terms of use" />

      <div className="container-page flex max-w-prose flex-col gap-8 py-14 lg:py-20">
        <p className="text-sm text-ink-faint">
          Last updated <time dateTime="2026-10-05">October 5, 2026</time>
        </p>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl">What this site is</h2>
          <p className="leading-relaxed text-ink-muted">
            This website describes the equipment {company.legalName} builds, sells and rents, the
            parts it supplies and the services it performs, and gives you a way to ask for any of
            them.
          </p>
          <p className="leading-relaxed text-ink-muted">
            Using it means you accept what is on this page. If you do not, the phone number and the
            email addresses work just as well.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl">Requests are not orders</h2>
          {/* Wider than a phone, so it scrolls in its own box rather than
              taking the page sideways with it. */}
          <div className="overflow-x-auto">
            <table className="fact-table">
              <caption className="sr-only">
                What each kind of request starts, and what it does not do
              </caption>
              <thead>
                <tr>
                  <th scope="col">What You Send</th>
                  <th scope="col">What It Starts</th>
                  <th scope="col">What It Does Not Do</th>
                </tr>
              </thead>
              <tbody>
                {REQUESTS.map((request) => (
                  <tr key={request.what}>
                    <th scope="row">{request.what}</th>
                    <td>{request.starts}</td>
                    <td>{request.stops}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed text-ink-muted">
            Work is scheduled, equipment is rented and parts are sold once we have replied and you
            have accepted the price and terms in that reply.
          </p>
        </section>

        {/* New equipment and parts carry no price, and used equipment carries
            one but no warranty. They are the same question - what does the
            page commit to - so they are set as a pair. */}
        <section className="section-defer [--section-intrinsic:14rem] grid gap-6 sm:grid-cols-2">
          <h2 className="text-xl sm:col-span-2">Prices and descriptions</h2>
          <div className="flex flex-col gap-3">
            <h3 className="text-base">New equipment and parts are quoted</h3>
            <p className="leading-relaxed text-ink-muted">
              No price is published for new equipment or parts. Specifications and brochures
              describe the standard build, and what you get is settled in the quote.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-base">Used equipment is sold as-is</h3>
            <p className="leading-relaxed text-ink-muted">{usedDisclaimer}</p>
          </div>
        </section>

        <section className="section-defer [--section-intrinsic:11rem] flex flex-col gap-3">
          <h2 className="text-xl">The text and images on these pages</h2>
          <p className="leading-relaxed text-ink-muted">
            The wording, the photographs, the brochures, and the company mark belong to{' '}
            {company.legalName}. You are welcome to read them, print them, and send them to a
            colleague.
          </p>
          <p className="leading-relaxed text-ink-muted">
            Republishing them, or using the mark on anything that is not ours, needs our written
            permission first.
          </p>
        </section>

        <section className="section-defer [--section-intrinsic:8rem] flex flex-col gap-3">
          <h2 className="text-xl">Links to other sites</h2>
          <p className="leading-relaxed text-ink-muted">
            Where a page links somewhere else, that site is run by someone else and follows its own
            terms.
          </p>
          <p className="leading-relaxed text-ink-muted">We link to it because it was useful.</p>
        </section>

        <section className="section-defer [--section-intrinsic:6rem] flex flex-col gap-3">
          <h2 className="text-xl">Governing law</h2>
          <p className="leading-relaxed text-ink-muted">
            {company.legalName} operates from Texas, and the laws of the State of Texas govern the
            use of this website.
          </p>
        </section>

        <section className="section-defer [--section-intrinsic:12rem] flex flex-col gap-4">
          <h2 className="text-xl">Reaching a person</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {DESKS.map((desk) => (
              <li key={desk.label} className="card flex flex-col gap-2 p-5">
                <p className="eyebrow">{desk.label}</p>
                <a
                  href={desk.href}
                  className="break-words font-display text-sm font-bold text-ink transition-colors duration-fast hover:text-accent-text"
                >
                  {desk.value}
                </a>
                <p className="text-sm leading-relaxed text-ink-muted">{desk.note}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
