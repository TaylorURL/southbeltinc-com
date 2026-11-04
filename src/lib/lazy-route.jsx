import { lazy } from 'react';
import { withBuildRefresh } from './chunk-recovery';

/**
 * A route split into its own chunk, which can be fetched before anybody asks
 * for it and then renders without suspending.
 *
 * React.lazy alone suspends on the first render of a route even when its code
 * already arrived, because it only learns the import settled a microtask
 * later. That one suspended frame is enough to swap the page for the
 * placeholder and pull the footer up the screen. So the loaded page is kept
 * here once it lands, and a route that has it renders it directly; only a
 * route whose code is still on the wire goes through lazy.
 *
 * `preload` starts the fetch and swallows a failure, because it runs on a
 * hover or in idle time, and a prefetch that missed is no reason to reload the
 * page. The render path keeps the build refresh: a chunk that is gone when the
 * page actually needs it still reloads onto the current build.
 */
export function lazyRoute(load) {
  let Loaded = null;
  let pending = null;

  const fetchModule = () => {
    pending ??= load().then(
      (module) => {
        Loaded = module.default;
        return module;
      },
      (error) => {
        pending = null;
        throw error;
      }
    );
    return pending;
  };

  const Lazy = lazy(withBuildRefresh(fetchModule));

  function RouteModule(props) {
    return Loaded ? <Loaded {...props} /> : <Lazy {...props} />;
  }

  RouteModule.preload = () => {
    fetchModule().catch(() => {});
  };

  return RouteModule;
}
