import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * A client-side route change keeps the previous scroll position, which lands a
 * visitor halfway down the page they just opened. Anchor links are left alone so
 * the service links from the footer still jump to their section.
 *
 * Going back is the exception: the browser drops its own scroll restoration once
 * the router takes over the history entry, so the position of each page is kept
 * here and put back on a POP. Without it, backing out of a part lands at the top
 * of the catalog rather than on the row the visitor came from.
 *
 * Focus follows the scroll. A screen reader left on the footer link that started
 * the navigation would otherwise have to walk the whole new page to find out
 * where it is.
 *
 * The jumps between pages are instant. The document scrolls smoothly for an
 * anchor on the same page, and left to that, a new page would open by gliding
 * up from wherever the last one was read to.
 */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());
  const previous = useRef(key);
  const lastPath = useRef(pathname);

  useEffect(() => {
    const store = positions.current;
    const leaving = previous.current;
    previous.current = key;
    return () => store.set(leaving, window.scrollY);
  }, [key]);

  useEffect(() => {
    const samePage = lastPath.current === pathname;
    lastPath.current = pathname;
    if (hash && navigationType !== 'POP') {
      // The router does not scroll to a fragment, and the target is often on a
      // page whose chunk is still loading, so the element is looked for over a
      // few frames rather than once. The page's scroll-padding clears the
      // sticky header when it lands.
      let frame = 0;
      let tries = 0;
      const id = decodeURIComponent(hash.slice(1));
      const seek = () => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ block: 'start', behavior: samePage ? 'smooth' : 'instant' });
          return;
        }
        if (tries++ < 90) frame = window.requestAnimationFrame(seek);
      };
      seek();
      return () => window.cancelAnimationFrame(frame);
    }
    if (hash) return undefined;
    if (navigationType === 'POP') {
      window.scrollTo({ top: positions.current.get(key) ?? 0, behavior: 'instant' });
      return undefined;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    const main = document.getElementById('main');
    if (main) main.focus({ preventScroll: true });
    return undefined;
  }, [pathname, hash, key, navigationType]);

  return null;
}
