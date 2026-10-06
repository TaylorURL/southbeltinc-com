import { Check, Copy } from 'lucide-react';
import { iconSize } from '../../lib/icon-size';

/**
 * What a request page shows once it has handed the message to the mail
 * program: the message itself, and a button that copies it. A machine with no
 * mail program configured opens nothing, and a visitor who can see and copy the
 * message is not stuck.
 */
export default function SentRequest({ sent, copied, onCopy, recipient, headingLevel = 2 }) {
  if (!sent) return null;
  const Heading = `h${headingLevel}`;
  return (
    <div className="rise-in flex flex-col items-start gap-6 rounded-md border border-line-strong bg-surface-sunken p-5">
      <div className="flex w-full flex-col gap-3">
        <Heading className="text-base">Your Request</Heading>
        <p className="text-sm leading-relaxed text-ink-muted">
          If your mail program did not open, copy this and send it to{' '}
          <a href={`mailto:${recipient}`} className="font-medium text-ink-body underline">
            {recipient}
          </a>
          .
        </p>
        <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded border border-line-strong bg-surface-raised p-4 font-sans text-sm text-ink-body">
          {sent.body}
        </pre>
      </div>
      {/* The pinned width keeps the button from resizing when the label swaps
          to the shorter Copied. */}
      <button type="button" onClick={onCopy} className="btn btn-md btn-quiet min-w-[10.5rem]">
        {copied ? (
          <Check size={iconSize.text} aria-hidden="true" />
        ) : (
          <Copy size={iconSize.text} aria-hidden="true" />
        )}
        {copied ? 'Copied' : 'Copy Request'}
      </button>
    </div>
  );
}
