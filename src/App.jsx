import { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ClickSpark from './components/app/ClickSpark';
import Layout from './components/layout/Layout';
import RouteFallback from './components/app/RouteFallback';
import RoutePreloader from './components/app/RoutePreloader';
import ScrollToTop from './components/app/ScrollToTop';
import { QuoteProvider } from './components/app/QuoteProvider';
import Home from './pages/Home';
import { lazyRoute } from './lib/lazy-route';

/**
 * Every route but the home page is its own chunk. Imported statically, the
 * catalog, the equipment pages, the request forms, and the legal text all land in the entry bundle,
 * so a visitor reading the home page waits for code for pages they will never
 * open. Split, each page costs one request at the moment somebody asks for it,
 * and the placeholder below holds the space while it arrives.
 *
 * The home page is the exception because it is the page most visitors land on,
 * and a boundary that falls back on the first render paints a placeholder the
 * height of a skeleton and then a page ten times taller, which shoves the
 * footer down the screen and counts against the layout shift score. Resolved
 * synchronously, React's first commit is the finished page.
 *
 * Each loader goes through lazyRoute, which keeps the build refresh - a tab
 * still holding the previous build asks for a chunk filename the host has
 * replaced, reloads onto the current document, and lands on the page rather
 * than on an error screen - and lets the chunk be fetched ahead of the click.
 */
const Equipment = lazyRoute(() => import('./pages/Equipment'));
const EquipmentDetail = lazyRoute(() => import('./pages/EquipmentDetail'));
const UsedEquipment = lazyRoute(() => import('./pages/UsedEquipment'));
const Rentals = lazyRoute(() => import('./pages/Rentals'));
const Services = lazyRoute(() => import('./pages/Services'));
const Parts = lazyRoute(() => import('./pages/Parts'));
const PartDetail = lazyRoute(() => import('./pages/PartDetail'));
const QuoteRequest = lazyRoute(() => import('./pages/QuoteRequest'));
const About = lazyRoute(() => import('./pages/About'));
const Contact = lazyRoute(() => import('./pages/Contact'));
const Privacy = lazyRoute(() => import('./pages/Privacy'));
const Terms = lazyRoute(() => import('./pages/Terms'));
const NotFound = lazyRoute(() => import('./pages/NotFound'));

/**
 * Which chunk a path will need, in the order the router ranks them: the used
 * list ahead of the machine pages it shares a prefix with. A path that matches
 * none is the home page, which is in the entry bundle, or a page that does not
 * exist, which is not worth fetching ahead.
 */
const chunks = [
  [/^\/equipment\/?$/, Equipment],
  [/^\/equipment\/used\/?$/, UsedEquipment],
  [/^\/equipment\/[^/]+\/?$/, EquipmentDetail],
  [/^\/rentals\/?$/, Rentals],
  [/^\/services\/?$/, Services],
  [/^\/parts\/?$/, Parts],
  [/^\/parts\/[^/]+\/?$/, PartDetail],
  [/^\/quote\/?$/, QuoteRequest],
  [/^\/about\/?$/, About],
  [/^\/contact\/?$/, Contact],
  [/^\/privacy\/?$/, Privacy],
  [/^\/terms\/?$/, Terms],
];

const preloadPath = (pathname) => {
  const match = chunks.find(([pattern]) => pattern.test(pathname));
  if (match) match[1].preload();
};

const preloadAll = () => {
  chunks.forEach(([, route]) => route.preload());
  NotFound.preload();
};

/**
 * Whether the app has committed once. The entrance below is for a page that is
 * arriving, and on the first commit nothing is: the shell in index.html has
 * already drawn the first screen, so the route React resolves synchronously is
 * a page the reader is looking at rather than one appearing.
 */
let committed = false;

/**
 * The route's entrance. It carries the fade and short rise for a page that
 * replaces something else on screen - the next route on a navigation, and the placeholder on a
 * chunk that has just landed - and no fade for the one route that is already
 * drawn when React reaches it, where the animation would blink the page out and
 * then hold it, and the photo behind it, at zero opacity until the bundle had
 * run.
 *
 * The choice is taken at mount and kept. Adding the class to a live element
 * replays the animation, so a re-render for any other reason would fade a page
 * the reader is part way through reading.
 */
function RouteEntrance({ children }) {
  const [entering] = useState(() => committed);
  return <div className={entering ? 'page-in' : undefined}>{children}</div>;
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    committed = true;
  }, []);

  return (
    <QuoteProvider>
      <ScrollToTop />
      <RoutePreloader preload={preloadPath} preloadAll={preloadAll} />
      <ClickSpark />
      <Layout>
        {/* The boundary is keyed on the path so each route mounts its own. A
            navigation is a transition, and React holds a boundary already on
            screen at its old content rather than swapping in a fallback, so one
            boundary shared across routes shows the page being left for as long
            as the next chunk takes and the placeholder never renders. */}
        <Suspense key={pathname} fallback={<RouteFallback />}>
          {/* Inside the boundary and keyed on the path, so the page that
              replaces the placeholder fades in rather than appearing between two
              frames, and the placeholder itself keeps its own entrance. */}
          <RouteEntrance key={pathname}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/equipment" element={<Equipment />} />
              {/* Listed ahead of the slug route for readability; the router
                  ranks the static segment first either way. */}
              <Route path="/equipment/used" element={<UsedEquipment />} />
              <Route path="/equipment/:slug" element={<EquipmentDetail />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/services" element={<Services />} />
              <Route path="/parts" element={<Parts />} />
              <Route path="/parts/:slug" element={<PartDetail />} />
              <Route path="/quote" element={<QuoteRequest />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RouteEntrance>
        </Suspense>
      </Layout>
    </QuoteProvider>
  );
}
