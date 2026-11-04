import { useEffect } from 'react';

/**
 * Fetches a page's code before the click that asks for it, so moving between
 * pages is a swap rather than a wait.
 *
 * Two triggers. A pointer over a link, a finger landing on one, or focus
 * reaching one fetches that route: the gap between pointing and clicking is
 * usually longer than the chunk takes. And once the first page has finished
 * loading and the browser is idle, every route is fetched, so a visitor who
 * types an address or follows a link from an email still lands on a page
 * that is already here. The idle sweep is skipped on a connection that asks
 * to save data or reports itself as 2G.
 */
export default function RoutePreloader({ preload, preloadAll }) {
  useEffect(() => {
    const fromEvent = (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin) preload(url.pathname);
    };

    document.addEventListener('pointerover', fromEvent, { passive: true });
    document.addEventListener('touchstart', fromEvent, { passive: true });
    document.addEventListener('focusin', fromEvent);

    const connection = navigator.connection;
    const thrifty = Boolean(
      connection && (connection.saveData || /2g/.test(connection.effectiveType || ''))
    );
    const schedule =
      window.requestIdleCallback || ((callback) => window.setTimeout(callback, 1500));
    const cancel = window.cancelIdleCallback || window.clearTimeout;
    let idle = null;
    const sweep = () => {
      idle = schedule(preloadAll);
    };
    if (!thrifty) {
      if (document.readyState === 'complete') sweep();
      else window.addEventListener('load', sweep, { once: true });
    }

    return () => {
      document.removeEventListener('pointerover', fromEvent);
      document.removeEventListener('touchstart', fromEvent);
      document.removeEventListener('focusin', fromEvent);
      window.removeEventListener('load', sweep);
      if (idle !== null) cancel(idle);
    };
  }, [preload, preloadAll]);

  return null;
}
