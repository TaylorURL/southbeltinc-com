import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Mail } from 'lucide-react';
import CallToAction from '../components/sections/CallToAction';
import FaqList from '../components/sections/FaqList';
import PageHeader from '../components/sections/PageHeader';
import SectionHeading from '../components/sections/SectionHeading';
import Photo from '../components/media/Photo';
import ContactFields from '../components/forms/ContactFields';
import FormErrorSummary from '../components/forms/FormErrorSummary';
import FormField from '../components/forms/FormField';
import SentRequest from '../components/forms/SentRequest';
import { company } from '../content/company';
import {
  rentalFaqs,
  rentalFleet,
  rentalFreight,
  rentalSteps,
  rentalTimeFrames,
} from '../content/rentals';
import { focusField, useContactForm } from '../lib/contact-form';
import { buildRentalRequest, useSentRequest } from '../lib/request-email';
import { useSeo } from '../lib/seo';
import { faqSchema } from '../lib/structured-data';
import { iconSize } from '../lib/icon-size';

export const metadata = {
  title: 'Equipment Rentals: Storage Pigs, Blowers and Tanks',
  description:
    'Rent storage pigs, diesel and electric blowers, a self-erecting water tank, a 1350 CF auger, a boom crane or an insulated frac tank from Southbelt in Texas.',
  canonical: '/rentals',
  openGraph: { type: 'website' },
};

const jsonLd = faqSchema(rentalFaqs);

export default function Rentals() {
  const { contact, errors, change, blur, validate } = useContactForm();
  const [equipment, setEquipment] = useState('');
  const [equipmentError, setEquipmentError] = useState('');
  const [yard, setYard] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [freight, setFreight] = useState(rentalFreight[0]);
  const [shipTo, setShipTo] = useState('');
  const [notes, setNotes] = useState('');
  const { sent, copied, send, copyRequest } = useSentRequest();

  useSeo(metadata, jsonLd);

  const checkEquipment = (value) => (value ? '' : 'Choose the equipment you want to rent.');

  function pick(name) {
    setEquipment(name);
    setEquipmentError('');
    document.getElementById('rental-request')?.scrollIntoView({ behavior: 'smooth' });
    // Focus follows the scroll, so a keyboard user lands in the form they were
    // sent to rather than back on the card they pressed.
    window.setTimeout(() => focusField('name'), 400);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const problem = checkEquipment(equipment);
    setEquipmentError(problem);
    const firstBad = validate(problem ? { equipment: problem } : {});
    if (firstBad) {
      focusField(firstBad);
      return;
    }
    send(buildRentalRequest({ contact, equipment, yard, timeFrame, freight, shipTo, notes }));
  }

  return (
    <>
      <PageHeader
        eyebrow="Equipment Rentals"
        title="Rent the equipment, keep the job moving"
        intro="Storage pigs, blowers, a self-erecting water tank, an auger, a boom crane and an insulated frac tank, with pickup from a yard or delivery by Southbelt."
        photo={{
          name: 'storage-pig-side',
          alt: 'A Southbelt portable storage pig with its ladder, parked on grass',
        }}
      >
        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
          <a href="#rental-request" className="btn btn-lg btn-tan">
            Start a Rental Request
          </a>
          <a href={`mailto:${company.email.rentals}`} className="btn btn-lg btn-sky-outline">
            {company.email.rentals}
          </a>
        </div>
      </PageHeader>

      <section
        className="container-page flex flex-col gap-10 py-16 lg:py-20"
        aria-labelledby="fleet"
      >
        <SectionHeading
          id="fleet"
          eyebrow="Rental Fleet"
          title="What you can rent"
          intro="Rentals can also be bought. Ask about purchase terms on any unit."
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rentalFleet.map((unit) => (
            <li key={unit.slug} className="card flex flex-col overflow-hidden">
              <div
                className={`aspect-[16/10] border-b border-line ${
                  unit.cutout ? 'product-plate p-5' : 'media-frame'
                }`}
              >
                <Photo
                  name={unit.photo}
                  alt={unit.photoAlt}
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
                  className={`h-full w-full ${unit.cutout ? 'object-contain' : 'object-cover'}`}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg sm:text-xl">{unit.name}</h3>
                  {unit.note && <p className="text-sm text-ink-muted">{unit.note}</p>}
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => pick(unit.name)}
                    className="btn btn-md btn-primary"
                  >
                    Rent This
                  </button>
                  {unit.detail && (
                    <Link
                      to={unit.detail}
                      className="inline-flex items-center gap-2 font-display text-sm font-bold text-ink-body transition-colors duration-fast hover:text-accent-text"
                    >
                      Specifications<span className="sr-only"> for the {unit.name}</span>
                      <ArrowRight size={iconSize.chrome} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="band-dark bg-band-navy" aria-labelledby="how-renting-works">
        <div className="container-page flex flex-col gap-10 py-16 lg:py-20">
          <SectionHeading
            id="how-renting-works"
            tone="dark"
            eyebrow="How It Works"
            title="Three steps to a rental"
          />
          <ol className="grid gap-6 md:grid-cols-3">
            {rentalSteps.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col gap-3 border-t-2 border-[color:var(--tan)] pt-5"
              >
                <span className="font-display text-4xl font-extrabold italic text-[color:var(--tan)]">
                  {index + 1}
                </span>
                <h3 className="text-xl text-ink-inverse">{step.title}</h3>
                <p className="leading-relaxed text-ink-inverse-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="rental-request"
        className="container-page grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr] lg:py-20"
        aria-labelledby="rental-request-heading"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p className="eyebrow">Rental Request</p>
              <h2 id="rental-request-heading" className="text-3xl leading-tight">
                Tell us what you need
              </h2>
            </div>
            <p className="leading-relaxed text-ink-muted">
              One of our team members will reach out in the order your request is received.
            </p>
          </div>

          {/* noValidate hands the messages to the form rather than to the
              browser, so every field explains itself the same way everywhere. */}
          <form onSubmit={handleSubmit} noValidate className="card flex flex-col gap-6 p-6 lg:p-8">
            <FormErrorSummary
              errors={{ ...errors, equipment: equipmentError }}
              labels={{ name: 'Name', email: 'Email', equipment: 'Rental Desired' }}
            />
            <ContactFields contact={contact} errors={errors} onChange={change} onBlur={blur} />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="equipment"
                label="Rental Desired"
                as="select"
                required
                error={equipmentError}
                value={equipment}
                onChange={(event) => {
                  setEquipment(event.target.value);
                  if (equipmentError) setEquipmentError('');
                }}
                onBlur={(event) => setEquipmentError(checkEquipment(event.target.value))}
              >
                <option value="">Select Equipment</option>
                {rentalFleet.map((unit) => (
                  <option key={unit.slug} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </FormField>
              <FormField
                id="time-frame"
                label="Time Frame"
                as="select"
                value={timeFrame}
                onChange={(event) => setTimeFrame(event.target.value)}
              >
                <option value="">Select a Time Frame</option>
                {rentalTimeFrames.map((frame) => (
                  <option key={frame} value={frame}>
                    {frame}
                  </option>
                ))}
              </FormField>
              <FormField
                id="yard"
                label="Southbelt Location"
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
              <fieldset className="flex flex-col gap-2">
                <legend className="field-label mb-2">Freight</legend>
                <div className="flex min-h-control flex-wrap items-center gap-x-6 gap-y-2">
                  {rentalFreight.map((option) => (
                    <label key={option} className="flex items-center gap-2 text-sm text-ink-body">
                      <input
                        type="radio"
                        name="freight"
                        value={option}
                        checked={freight === option}
                        onChange={() => setFreight(option)}
                        className="h-4 w-4 accent-[color:var(--navy-800)]"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {freight === 'Southbelt Delivery' && (
              <FormField
                id="ship-to"
                label="Ship to Location"
                hint="The job site address, or the nearest town."
                autoComplete="street-address"
                value={shipTo}
                onChange={(event) => setShipTo(event.target.value)}
              />
            )}

            <FormField
              id="notes"
              label="Additional Information"
              as="textarea"
              rows="4"
              hint="The project, start date, and anything else the rentals desk should know."
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="btn btn-lg btn-primary shrink-0 whitespace-nowrap">
                <Mail size={iconSize.text} aria-hidden="true" />
                Send Rental Request
              </button>
              <p className="text-sm text-ink-muted">
                Opens your mail program addressed to{' '}
                <span className="whitespace-nowrap font-medium text-ink-body">
                  {company.email.rentals}
                </span>
              </p>
            </div>

            <SentRequest
              sent={sent}
              copied={copied}
              onCopy={copyRequest}
              recipient={company.email.rentals}
              headingLevel={3}
            />
          </form>
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <div className="card flex flex-col gap-3 p-6">
            <h2 className="text-lg">New Customer?</h2>
            <p className="text-sm leading-relaxed text-ink-muted">
              Opening an account starts with the credit application. Fill it in and send it with
              your request.
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
          <div className="card flex flex-col items-start gap-4 p-6">
            <img
              src="/brand/partners/taca.webp"
              alt="Texas Aggregates and Concrete Association"
              width="262"
              height="98"
              loading="lazy"
              className="h-10 w-auto rounded bg-white p-1"
            />
            <p className="text-sm leading-relaxed text-ink-muted">
              Southbelt is a proud member of the Texas Aggregates &amp; Concrete Association.
            </p>
          </div>
        </aside>
      </section>

      <section className="section-defer [--section-intrinsic:24rem] border-t border-line bg-surface-sunken">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:py-20">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Questions</p>
            <h2 className="text-3xl leading-tight">Renting from Southbelt</h2>
          </div>
          <FaqList faqs={rentalFaqs} />
        </div>
      </section>

      <CallToAction
        title="Need it longer, or need to own it?"
        body="Rentals can be bought. Call the nearest yard or write to the rentals desk and we will go over the terms."
        action={{ to: '/contact?topic=rental#request', label: 'Ask About a Rental' }}
      />
    </>
  );
}
