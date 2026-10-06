import { photo } from '../../content/photos';

/**
 * One of the company's photographs, with every cut in the srcset and the
 * original's box, so the space is held from the first paint and the browser
 * picks the smallest file that fills it.
 *
 * `sizes` is required in spirit: it is the rendered width at each breakpoint,
 * and the default of the full viewport is right only for a full-bleed band. A
 * photo below the first screen loads lazily unless `priority` says it is the
 * largest thing on that screen.
 */
export default function Photo({
  name,
  alt,
  sizes = '100vw',
  className = '',
  position,
  priority = false,
}) {
  const { src, srcSet, width, height } = photo(name);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
