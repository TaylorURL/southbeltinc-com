/**
 * The opening of a content section: a navy eyebrow, an extra-bold heading, and
 * an optional line under it, with the section's one action set to the right on
 * a wide screen. `tone="dark"` is for the navy bands, where the eyebrow turns
 * tan and the type white.
 *
 * `id` goes on the heading, so a section can be linked to by name.
 */
export default function SectionHeading({ eyebrow, title, intro, id, tone = 'light', children }) {
  const dark = tone === 'dark';
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex max-w-2xl flex-col gap-4">
        <div className="flex flex-col gap-2">
          {eyebrow && (
            <p className={`eyebrow ${dark ? 'text-accent-inverse' : ''}`.trim()}>{eyebrow}</p>
          )}
          <h2
            id={id}
            className={`text-3xl leading-tight sm:text-4xl ${dark ? 'text-ink-inverse' : ''}`.trim()}
          >
            {title}
          </h2>
        </div>
        {intro && (
          <p
            className={`text-base leading-relaxed sm:text-lg ${
              dark ? 'text-ink-inverse-muted' : 'text-ink-muted'
            }`}
          >
            {intro}
          </p>
        )}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}
