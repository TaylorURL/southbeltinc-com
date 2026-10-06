import { company } from '../../content/company';

/**
 * The company's own logo: the black-outlined oval with the navy and sky diamond
 * and the heavy italic name. It is the raster the company publishes, trimmed to
 * its drawn edge and cut at three widths, because the lockup's type and
 * diamond are one drawing and setting the name as HTML beside a mark would be a
 * different logo.
 *
 * It is drawn for a white ground. `plate` decides what it sits on: `theme`
 * follows the header, which needs no plate in the light theme and takes one in
 * the dark; `white` always draws the white pill, which is how it sits on the
 * black footer, where the black outline would otherwise vanish.
 *
 * `imageClass` sets the rendered width, and `sizes` restates it for the browser,
 * so it picks the cut for the screen's density and no more. The two travel
 * together: a width changed in one and not the other fetches the wrong cut.
 */
export default function Logo({
  imageClass = 'w-36',
  sizes = '144px',
  plate = 'theme',
  className = '',
}) {
  const plateClass =
    plate === 'white' ? 'rounded-full bg-white px-4 py-2' : 'logo-plate';
  return (
    <span className={`inline-flex shrink-0 items-center ${plateClass} ${className}`.trim()}>
      <img
        src="/brand/logo-400.webp"
        srcSet="/brand/logo-200.webp 200w, /brand/logo-400.webp 400w, /brand/logo-600.webp 600w"
        sizes={sizes}
        width="3038"
        height="946"
        alt={company.name}
        className={`h-auto ${imageClass}`}
      />
    </span>
  );
}
