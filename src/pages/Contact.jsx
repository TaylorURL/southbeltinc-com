import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download, Mail } from 'lucide-react';
import ContactFields from '../components/forms/ContactFields';
import FormErrorSummary from '../components/forms/FormErrorSummary';
import FormField from '../components/forms/FormField';
import SentRequest from '../components/forms/SentRequest';
import LocationCards from '../components/sections/LocationCards';
import PageHeader from '../components/sections/PageHeader';
import { company } from '../content/company';
import { focusField, useContactForm } from '../lib/contact-form';
import { buildContactRequest, deskFor, requestTopics, topicByValue, useSentRequest } from '../lib/request-email';
import { useSeo } from '../lib/seo';
import { localBusinessSchema } from '../lib/structured-data';
import { iconSize } from '../lib/icon-size';

export const metadata = {
  title: 'Contact Southbelt: Houston, San Marcos and Dallas',
  description:
    'Call Southbelt in Houston at 713-645-9099, San Marcos at 830-372-8929 or Dallas at 682-518-6622, or send a request for parts, service, quotes or rentals.',
  canonical: '/contact',
  openGraph: { type: 'website' },
};

/** The three inboxes, and what each one handles. */
const desks = [
  { key: 'sales', label: 'Sales', note: 'Parts, service, repairs and used equipment' },
  { key: 'quotes', label: 'Quotes', note: 'Batch plants, pugmills and equipment' },
  { key: 'rentals', label: 'Rentals', note: 'Rental requests and applications' },
];

export default function Contact() {
  const [params] = useSearchParams();
  // A link from elsewhere on the site names the topic, so the form opens
  // already addressed to the desk that handles it. Keyed on it, so following a
  // second topic link from this page readdresses the form rather than keeping
  // the first one.
  const topic = topicByValue[params.get('topic')] ? params.get('topic') : '';
  return <ContactPage key={topic} initialTopic={topic} />;
}

function ContactPage({ initialTopic }) {
  const { contact, errors, change, blur, validate } = useContactForm();
  const [topic, setTopic] = useState(initialTopic);
  const [yard, setYard] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const { sent, copied, send, copyRequest } = useSentRequest();

  useSeo(metadata, localBusinessSchema());

  const recipient = deskFor(topic);
  const hint =
    topicByValue[topic]?.hint ||
    'What you need, the equipment it is for, and which yard is closest to you.';

  function checkMessage(value) {
    return value.trim() ? '' : 'Say what you need, so the right desk can answer it in one reply.';
  }

  function handleSubmit(event) {
    event.preventDefault();
    const problem = checkMessage(message);
    setMessageError(problem);
    // Focus lands on the first thing that needs fixing rather than leaving the
    // reader to find it, which on a phone means scrolling back up a full screen.
    const firstBad = validate(problem ? { message: problem } : {});
    if (firstBad) {
      focusField(firstBad);
      return;
    }
    send(buildContactRequest({ contact, topic, yard, message }));
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Cement and industrial assistance"
        intro="Call the yard closest to you, or send a request below and it goes straight to the desk that handles it."
        photo={{
          name: 'field-truck',
          alt: 'A Southbelt service truck at a job site, with two crew members working at its bed beside an aggregate pile',
        }}
      />

      <section
        aria-labelledby="yards-heading"
        className="container-page flex flex-col gap-8 py-14 lg:py-20"
      >
        <div className="flex flex-col gap-2">
          <p className="eyebrow">Three Locations in Texas</p>
          <h2 id="yards-heading" className="text-3xl leading-tight">
            Call the nearest yard
          </h2>
        </div>
        <LocationCards detailed />
      </section>

      <div
        id="request"
        className="section-defer [--section-intrinsic:48rem] border-t border-line bg-surface-sunken"
      >
        <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.3fr_1fr] lg:py-20">
          <section aria-labelledby="request-heading" className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="eyebrow">Send a Request</p>
              <h2 id="request-heading" className="text-3xl leading-tight">
                Tell us what you need
              </h2>
              <p className="leading-relaxed text-ink-muted">
                One of our team members will reach out in the order your request is received.
              </p>
            </div>

            {/* noValidate hands the messages to the form rather than to the
                browser, so every field explains itself the same way everywhere. */}
            <form onSubmit={handleSubmit} noValidate className="card flex flex-col gap-6 p-6 lg:p-8">
              <FormErrorSummary
                errors={{ ...errors, message: messageError }}
                labels={{ name: 'Name', email: 'Email', message: 'Your Request' }}
              />
              <ContactFields contact={contact} errors={errors} onChange={change} onBlur={blur} />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  id="topic"
                  label="What It's About"
                  as="select"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                >
                  <option value="">Select a Topic</option>
                  {requestTopics.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </FormField>
                <FormField
                  id="yard"
                  label="Nearest Yard"
                  as="select"
                  value={yard}
                  onChange={(event) => setYard(event.target.value)}
                >
                  <option value="">Select a Yard</option>
                  {company.locations.map((location) => (
                    <option key={location.slug} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </FormField>
              </div>

              <FormField
                id="message"
                label="Your Request"
                as="textarea"
                rows="6"
                required
                error={messageError}
                hint={hint}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  if (messageError) setMessageError('');
                }}
                onBlur={(event) => setMessageError(checkMessage(event.target.value))}
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="btn btn-lg btn-primary shrink-0 whitespace-nowrap">
                  <Mail size={iconSize.text} aria-hidden="true" />
                  Send Request
                </button>
                {/* The address follows the topic, so the visitor sees which
                    inbox the message is going to before it opens. */}
                <p className="text-sm text-ink-muted" aria-live="polite">
                  Opens your mail program addressed to{' '}
                  <span className="whitespace-nowrap font-medium text-ink-body">{recipient}</span>
                </p>
              </div>

              <SentRequest
                sent={sent}
                copied={copied}
                onCopy={copyRequest}
                recipient={sent?.recipient || recipient}
                headingLevel={3}
              />
            </form>
          </section>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="card flex flex-col gap-6 p-6">
              <h2 className="text-lg">Email a Desk</h2>
              <ul className="flex flex-col gap-5 text-sm">
                {desks.map((desk) => (
                  <li key={desk.key} className="flex items-start gap-3">
                    <span className="icon-lead text-accent-text">
                      <Mail size={iconSize.text} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <a
                        href={`mailto:${company.email[desk.key]}`}
                        className="break-words font-display font-bold text-ink transition-colors duration-fast hover:text-accent-text"
                      >
                        {company.email[desk.key]}
                      </a>
                      <p className="text-ink-muted">{desk.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card flex flex-col gap-3 p-6">
              <h2 className="text-lg">New Customer?</h2>
              <p className="text-sm leading-relaxed text-ink-muted">
                Opening an account starts with the credit application.
              </p>
              <a
                href="/brochures/southbelt-credit-application.pdf"
                download
                className="inline-flex items-center gap-2 font-display text-sm font-bold text-accent-text"
              >
                <Download size={iconSize.chrome} aria-hidden="true" />
                Download the Credit Application
              </a>
            </div>

            {company.hours.length > 0 && (
              <div className="card flex flex-col gap-6 p-6">
                <h2 className="text-lg">Hours</h2>
                <dl className="flex flex-col gap-3 text-sm">
                  {company.hours.map((entry) => (
                    <div key={entry.days} className="flex justify-between gap-4">
                      <dt className="text-ink-muted">{entry.days}</dt>
                      <dd className="font-medium tabular-nums text-ink">{entry.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
