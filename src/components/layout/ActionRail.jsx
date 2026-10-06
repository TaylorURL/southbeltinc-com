import { Link } from 'react-router-dom';
import { ClipboardList, Phone } from 'lucide-react';
import { phoneHref } from '../../content/company';
import { iconSize } from '../../lib/icon-size';

/**
 * The two actions the site exists to produce, pinned to the bottom edge on
 * anything smaller than a desktop.
 *
 * The yards' numbers are in the strip above the bar and in the footer, and on a
 * phone both are a scroll away from wherever the reader has got to. This is the
 * copy that is not, for the operator standing beside a plant that has stopped.
 * Call rings headquarters, which is the main line.
 *
 * Two actions, and nothing else: a rail that also carried a menu and a search
 * would be a second navigation bar, and what makes this one work is that
 * pressing either half is unambiguous.
 *
 * Its height is reserved on the page column through --rail-height rather than
 * the rail covering whatever the page ends with. The token is zero past the
 * large breakpoint, where the rail is hidden, so the reservation goes with it.
 */
export default function ActionRail() {
  return (
    <div className="action-rail">
      <div className="container-page grid grid-cols-2 gap-3 py-2">
        <a href={phoneHref} className="btn btn-md btn-action whitespace-nowrap">
          <Phone size={iconSize.text} aria-hidden="true" />
          Call
        </a>
        <Link to="/contact?topic=quote#request" className="btn btn-md btn-primary whitespace-nowrap">
          <ClipboardList size={iconSize.text} aria-hidden="true" />
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
