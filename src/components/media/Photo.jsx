import { useCallback, useState } from 'react';
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
 *
 * A lazy photo fades in once it has loaded. A priority one does not: it is on
 * the first screen, which the shell has usually drawn already, and fading it
 * would blink out a photo the reader is looking at. One that fails to load is
 * revealed all the same, so the alt text and the placeholder show rather than
 * nothing.
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
  const [loaded, setLoaded] = useState(false);
  const reveal = useCallback(() => setLoaded(true), []);
  // A photo already in the cache can finish before the handler below is
  // listening, so the element is checked once it exists as well.
  const check = useCallback((img) => {
    if (img?.complete) setLoaded(true);
  }, []);
  const fades = !priority;
  return (
    <img
      ref={fades ? check : undefined}
      onLoad={fades ? reveal : undefined}
      onError={fades ? reveal : undefined}
      data-loaded={fades && loaded ? '' : undefined}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={fades ? `photo-reveal ${className}`.trim() : className}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
