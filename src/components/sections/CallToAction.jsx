import { Link } from 'react-router-dom';
import { mainPhone, phoneHref } from '../../content/company';

/**
 * The closing band, in the logo's sky, repeated at the foot of the content
 * pages. One heavy italic line, one sentence, and two actions: the request,
 * and the number for whoever would rather call.
 */
export default function CallToAction({
  title = 'Plant down or planning a new one?',
  body = 'Call the yard nearest you, or send the details and our sales team will get back to you.',
  action = { to: '/contact?topic=repair#request', label: 'Request Service' },
}) {
  return (
    <section className="band-sky section-defer [--section-intrinsic:16rem]">
      <div className="container-page flex flex-col items-start gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-20">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="display text-3xl text-band-sky-ink sm:text-4xl lg:text-[2.75rem]">{title}</h2>
          <p className="text-base leading-relaxed text-band-sky-ink sm:text-lg">{body}</p>
        </div>
        {/* shrink-0 keeps the pair on one line beside the heading, and on a
            phone they go full width so the two do not sit at ragged widths. */}
        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center lg:shrink-0">
          <Link to={action.to} className="btn btn-lg btn-on-sky">
            {action.label}
          </Link>
          <a href={phoneHref} className="btn btn-lg btn-on-sky-outline">
            Call {mainPhone}
          </a>
        </div>
      </div>
    </section>
  );
}
