import Photo from '../media/Photo';

/**
 * The navy band at the top of every page below the home page. It is the home
 * hero's material - the logo's navy, the tan rule before the eyebrow, the heavy
 * italic headline - so every page opens in the same voice.
 *
 * With a `photo`, the band splits the way the home hero does: the type on the
 * navy, the photograph filling the right half to the edge of the screen. A
 * machine page leads with the machine. Without one, the band carries a faint
 * grid so it reads as the same material rather than a flat fill.
 *
 * Every gap lives on a container rather than on the element below it, because
 * three of the four children are optional: a margin belonging to the survivor
 * leaves a hole the size of the missing one.
 */
export default function PageHeader({ eyebrow, title, intro, photo, children }) {
  const text = (
    <div className="flex flex-col items-start gap-8">
      <div className="flex flex-col items-start gap-5">
        <div className="flex flex-col items-start gap-4">
          {eyebrow && (
            <p
              data-hero="eyebrow"
              className="eyebrow-rule font-display text-xs font-bold uppercase tracking-eyebrow text-accent-inverse"
            >
              {eyebrow}
            </p>
          )}
          <h1 className="display max-w-3xl text-4xl text-ink-inverse sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
        </div>
        {intro && (
          <p data-hero="intro" className="max-w-prose text-lg leading-relaxed text-ink-inverse-muted">
            {intro}
          </p>
        )}
      </div>
      {children}
    </div>
  );

  if (photo) {
    return (
      <section data-hero="band" className="band-dark relative overflow-hidden bg-band-navy">
        <div className="lg:grid lg:min-h-[30rem] lg:grid-cols-2">
          <div className="container-page flex items-center py-14 lg:mr-0 lg:max-w-[42rem] lg:py-20 lg:pr-12">
            {text}
          </div>
          <div className="media-frame relative aspect-[4/3] lg:aspect-auto">
            <Photo
              name={photo.name}
              alt={photo.alt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              position={photo.position}
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-hero="band" className="band-dark relative overflow-hidden bg-surface-inverse-wash">
      <div className="absolute inset-0 bg-grid bg-grid-tile opacity-60" aria-hidden="true" />
      <div className="container-page relative pb-16 pt-12 lg:pb-20 lg:pt-16">{text}</div>
    </section>
  );
}
