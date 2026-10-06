import { useCallback, useEffect, useState } from 'react';
import { company } from '../content/company';

/**
 * Requests leave as email rather than through a backend, so the site has no
 * server, no database, and nothing holding customer details. The composed
 * message is the deliverable: the desk that receives it has to be able to act
 * on it without opening the site or asking a follow-up question, which is why
 * the plant details ride along with each part and each request names its yard.
 *
 * Each request goes to the desk that handles it. Plant, pugmill and equipment
 * quotes go to quotes@, which is the address on every brochure; rentals go to
 * rentals@; parts, service and everything else go to sales@.
 *
 * The plain text is built separately from the mailto link so the request page
 * can show it on screen. A mailto opens nothing on a machine with no mail
 * client configured, and a visitor who can see and copy the message is not
 * stuck.
 */

/**
 * What a general request can be about, the desk each one reaches, and the hint
 * under the message field for it. `value` is what a link passes as
 * `?topic=` to open the contact form with the topic already chosen.
 */
export const requestTopics = [
  {
    value: 'quote',
    label: 'Equipment Quote',
    desk: 'quotes',
    hint: 'The machine or model, how you would use it, and where it would go.',
  },
  {
    value: 'plant',
    label: 'Plant Manufacturing',
    desk: 'quotes',
    hint: 'The plant you are planning, its site, and the timeline you are working to.',
  },
  {
    value: 'parts',
    label: 'Parts',
    desk: 'sales',
    hint: 'The part, the brand and part number if you have them, and the plant it goes on.',
  },
  {
    value: 'repair',
    label: 'Repair',
    desk: 'sales',
    hint: 'The equipment, what it is doing, and where it is.',
  },
  {
    value: 'maintenance',
    label: 'Preventative Maintenance',
    desk: 'sales',
    hint: 'The plant, its equipment, and whether you want weekly or monthly service.',
  },
  {
    value: 'fabrication',
    label: 'Fabrication',
    desk: 'sales',
    hint: 'What you need built, with sizes or drawings if you have them.',
  },
  {
    value: 'belting',
    label: 'Conveyor Belting',
    desk: 'sales',
    hint: 'Belt width and length, the conveyor it runs on, and whether it needs installing.',
  },
  {
    value: 'used',
    label: 'Used Equipment',
    desk: 'sales',
    hint: 'The listing you are asking about, or what you are looking for.',
  },
  {
    value: 'rental',
    label: 'Rental',
    desk: 'rentals',
    hint: 'The equipment, how long you need it, and where it is going.',
  },
  {
    value: 'other',
    label: 'Something Else',
    desk: 'sales',
    hint: 'Tell us what you need and which yard is closest to you.',
  },
];

export const topicByValue = Object.fromEntries(requestTopics.map((topic) => [topic.value, topic]));

/** The address a topic's desk answers at. */
export const deskFor = (topicValue) =>
  company.email[topicByValue[topicValue]?.desk || 'sales'];

function formatQuoteLines(items) {
  return items
    .map((item, index) => {
      const detail = item.details.trim();
      // The list allows a transiently empty quantity while its field is being
      // edited; the email always carries a real number.
      const quantity = Math.max(1, Number(item.quantity) || 1);
      const lines = [`${index + 1}. ${item.name} (qty ${quantity})`];
      if (detail) lines.push(`   ${detail.replace(/\n/g, '\n   ')}`);
      return lines.join('\n');
    })
    .join('\n');
}

function formatContact(contact) {
  return [
    `Name:    ${contact.name}`,
    contact.company ? `Company: ${contact.company}` : '',
    `Email:   ${contact.email}`,
    contact.phone ? `Phone:   ${contact.phone}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

function toMailto(recipient, subject, body) {
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** @returns {{ subject: string, body: string, mailto: string, recipient: string }} */
export function buildQuoteRequest({ contact, items, notes, yard }) {
  const recipient = company.email.sales;
  const subject = `Parts quote request: ${contact.company || contact.name}`;
  const body = [
    formatContact(contact),
    yard ? `Yard:    ${yard}` : '',
    '',
    'Parts requested:',
    formatQuoteLines(items),
    '',
    notes.trim() ? `Notes:\n${notes.trim()}` : '',
  ]
    .join('\n')
    .trim();

  return { subject, body, recipient, mailto: toMailto(recipient, subject, body) };
}

/** @returns {{ subject: string, body: string, mailto: string, recipient: string }} */
export function buildContactRequest({ contact, topic, yard, message }) {
  const recipient = deskFor(topic);
  const label = topicByValue[topic]?.label;
  const subject = label
    ? `${label} request: ${contact.company || contact.name}`
    : `Request: ${contact.company || contact.name}`;
  const head = [
    formatContact(contact),
    label ? `About:   ${label}` : '',
    yard ? `Yard:    ${yard}` : '',
  ].filter(Boolean);
  const body = [head.join('\n'), message.trim()].join('\n\n').trim();

  return { subject, body, recipient, mailto: toMailto(recipient, subject, body) };
}

/** @returns {{ subject: string, body: string, mailto: string, recipient: string }} */
export function buildRentalRequest({ contact, equipment, yard, timeFrame, freight, shipTo, notes }) {
  const recipient = company.email.rentals;
  const subject = `Rental request: ${equipment || 'equipment'} for ${contact.company || contact.name}`;
  const rental = [
    `Rental:     ${equipment}`,
    timeFrame ? `Time frame: ${timeFrame}` : '',
    yard ? `Yard:       ${yard}` : '',
    freight ? `Freight:    ${freight}` : '',
    shipTo.trim() ? `Ship to:    ${shipTo.trim()}` : '',
  ].filter(Boolean);
  const body = [
    formatContact(contact),
    rental.join('\n'),
    notes.trim() ? `Details:\n${notes.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  return { subject, body, recipient, mailto: toMailto(recipient, subject, body) };
}

/**
 * The plain mailto for a machine's quote button: addressed to the quotes desk,
 * with the model in the subject, so the reply comes from the people who price
 * plants and they know which one from the first line.
 */
export function equipmentQuoteHref(item) {
  const subject = `Quote request: ${item.name}`;
  const body = [
    `I would like a quote on the ${item.name}.`,
    '',
    'Name:',
    'Company:',
    'Phone:',
    'Where the equipment will go:',
    'Timeline:',
    '',
  ].join('\n');
  return toMailto(company.email.quotes, subject, body);
}

/**
 * Holds the request a page has just handed to the mail program, and the state
 * of the button that copies it.
 *
 * Every request page does the same thing once the form validates: hand the
 * message to the mail program, keep it on screen for a visitor whose machine
 * opened nothing, and offer it as a copy. The pages differ only in what they
 * compose, so the composed message is the argument and the rest lives here.
 */
export function useSentRequest() {
  const [sent, setSent] = useState(null);
  const [copied, setCopied] = useState(false);

  // The label reverts on its own, so the button offers the copy again; a
  // permanent "Copied" reads as a dead control. The timer lives in an effect
  // rather than in the handler so leaving the page clears it.
  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const send = useCallback((request) => {
    setSent(request);
    setCopied(false);
    window.location.href = request.mailto;
  }, []);

  const copyRequest = useCallback(async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(`To: ${sent.recipient}\nSubject: ${sent.subject}\n\n${sent.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }, [sent]);

  return { sent, copied, send, copyRequest };
}
