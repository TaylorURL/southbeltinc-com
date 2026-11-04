import { useId, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { iconSize } from '../../lib/icon-size';

/**
 * Questions as a set of things to open: a card apiece, the answer revealed in
 * place. Native disclosure, so it works before the bundle runs and a find in
 * page reaches a closed answer.
 *
 * One answer is open at a time. The shared `name` is what does it in a browser
 * that knows exclusive disclosure, before any script runs; the toggle handler
 * does the same for one that does not, by closing the others when one opens.
 */
export default function FaqList({ faqs }) {
  const name = useId();
  const listRef = useRef(null);

  const closeOthers = (event) => {
    const opened = event.currentTarget;
    if (!opened.open || !listRef.current) return;
    listRef.current.querySelectorAll('details[open]').forEach((other) => {
      if (other !== opened) other.open = false;
    });
  };

  return (
    <div ref={listRef} className="flex flex-col gap-3">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          name={name}
          onToggle={closeOthers}
          className="faq-item group card px-5 py-4"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold text-ink group-open:text-accent-text [&::-webkit-details-marker]:hidden">
            {faq.question}
            <ChevronDown
              size={iconSize.text}
              aria-hidden="true"
              className="shrink-0 text-ink-faint transition-transform duration-base ease-quart-out group-open:rotate-180"
            />
          </summary>
          <p className="rise-in mt-3 leading-relaxed text-ink-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
