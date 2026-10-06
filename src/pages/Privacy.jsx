/**
 * The policy states what the site does, so it is only correct while the code
 * matches it. Four things carry information today: the request forms and quote
 * buttons, which compose an email in the visitor's own mail program; the quote
 * list and the theme, which stay in their browser; and the one script in
 * index.html that does send data off the page, the error reporter. There is no
 * analytics. Anything else wired in - a counter, a form backend, an embedded
 * map, a chat widget - is described here in the same edit.
 *
 * The question the page exists to answer is which of those leave the browser
 * and where they go, and that is a table rather than six paragraphs to read in
 * order. It leads, and the prose under it is where a reader goes for the one
 * row they came about.
 */
import PageHeader from '../components/sections/PageHeader';
import { company } from '../content/company';
import { useSeo } from '../lib/seo';

export const metadata = {
  title: 'Privacy: How This Site Handles Your Information',
  description:
    'What this website stores and sends: forms that open your own mail program, an error reporter, and a quote list kept in your browser. No analytics, no advertising.',
  canonical: '/privacy',
  openGraph: { type: 'website' },
};

/** Every path by which anything typed or observed here could leave the browser. */
const FLOWS = [
  {
    what: 'The request forms and quote buttons',
    goes: 'Your own mail program, when you press send',
    holds: 'What you typed, as a draft you can still edit',
  },
  {
    what: 'Your quote list',
    goes: 'Nowhere: your browser, on your device',
    holds: 'Part names, quantities, and the plant details you added',
  },
  {
    what: 'The theme you pick',
    goes: 'Nowhere: your browser, on your device',
    holds: 'Light or dark',
  },
  {
    what: 'The error reporter',
    goes: 'Our own server',
    holds: 'The error, the page address, and your browser version',
  },
  {
    what: 'Request logs',
    goes: 'The hosting provider',
    holds: 'Standard web server logs, including IP addresses',
  },
];

export default function Privacy() {
  useSeo(metadata);

  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy" />

      <div className="container-page flex max-w-prose flex-col gap-8 py-14 lg:py-20">
        <p className="text-sm text-ink-faint">
          Last updated <time dateTime="2026-10-05">October 5, 2026</time>
        </p>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl">What leaves your browser</h2>
          {/* The table is wider than a phone, so it scrolls in its own box
              rather than taking the page sideways with it. */}
          <div className="overflow-x-auto">
            <table className="fact-table">
              <caption className="sr-only">
                Every path by which information could leave your browser on this site
              </caption>
              <thead>
                <tr>
                  <th scope="col">What</th>
                  <th scope="col">Where It Goes</th>
                  <th scope="col">What It Carries</th>
                </tr>
              </thead>
              <tbody>
                {FLOWS.map((flow) => (
                  <tr key={flow.what}>
                    <th scope="row">{flow.what}</th>
                    <td>{flow.goes}</td>
                    <td>{flow.holds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section-defer [--section-intrinsic:8rem] flex flex-col gap-3">
          <h2 className="text-xl">The forms</h2>
          <p className="leading-relaxed text-ink-muted">
            The contact, rental and quote forms, and the quote buttons on the equipment pages,
            don&apos;t post anywhere. They assemble a message and hand it to the mail program on
            your device.
          </p>
          <p className="leading-relaxed text-ink-muted">
            You send it yourself. Until you do, what you typed hasn&apos;t left your computer.
          </p>
        </section>

        <section className="section-defer [--section-intrinsic:10rem] flex flex-col gap-3">
          <h2 className="text-xl">Errors, and no analytics</h2>
          <p className="leading-relaxed text-ink-muted">
            If something on a page breaks, an error reporter sends us the error, the page it happened
            on, and your browser version, so we can fix it. It carries nothing you typed into a
            form.
          </p>
          <p className="leading-relaxed text-ink-muted">
            The site runs no analytics, no page counter and no advertising scripts.
          </p>
        </section>

        <section className="section-defer [--section-intrinsic:12rem] flex flex-col gap-3">
          <h2 className="text-xl">Your quote list</h2>
          <p className="leading-relaxed text-ink-muted">
            Parts you add to a quote list are stored by your browser on your own device, so the list
            survives closing the tab.
          </p>
          <p className="leading-relaxed text-ink-muted">
            The theme you pick is stored the same way.
          </p>
          <p className="leading-relaxed text-ink-muted">
            Clearing the list, or clearing your browser&apos;s site data, removes both. Neither is
            transmitted anywhere.
          </p>
        </section>

        <section className="section-defer [--section-intrinsic:9rem] flex flex-col gap-3">
          <h2 className="text-xl">Email you send us</h2>
          <p className="leading-relaxed text-ink-muted">
            Email sent to {company.email.sales}, {company.email.quotes} or {company.email.rentals}{' '}
            is kept as business correspondence, and is used to answer your request and service
            your account.
          </p>
          <p className="leading-relaxed text-ink-muted">
            It isn&apos;t sold, and it isn&apos;t shared for marketing.
          </p>
        </section>

        <section className="section-defer [--section-intrinsic:12rem] flex flex-col gap-3">
          <h2 className="text-xl">Hosting, fonts, and questions</h2>
          <p className="leading-relaxed text-ink-muted">
            The site is served by a hosting provider that records standard request logs, including
            IP addresses, for security and reliability.
          </p>
          <p className="leading-relaxed text-ink-muted">
            The typefaces are served from this site, so no font host receives a request from your
            browser.
          </p>
          <p className="leading-relaxed text-ink-muted">
            Anything else, write to{' '}
            <a
              href={`mailto:${company.email.sales}`}
              className="text-ink underline transition-colors duration-fast hover:text-accent-text"
            >
              {company.email.sales}
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
