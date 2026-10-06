import { brandLogo } from '../../content/brands';

/**
 * The makers' logos, grey until the pointer reaches them, so a row of sixteen
 * other companies' colours does not outshout the page it sits on. Each logo is
 * cut to the same 3:1 white canvas, trimmed to the mark, so sixteen marks drawn
 * at different sizes read at one size, on a white plate in both themes.
 */
export default function BrandRow({ brands, className = '' }) {
  return (
    <ul className={`grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 ${className}`.trim()}>
      {brands.map((brand) => (
        <li
          key={brand.slug}
          className="group flex h-20 items-center justify-center rounded bg-white px-4"
          title={brand.name}
        >
          <img
            src={brandLogo(brand.slug)}
            alt={brand.name}
            width="360"
            height="120"
            loading="lazy"
            className="h-auto max-h-14 w-full max-w-[9rem] object-contain opacity-70 grayscale transition-[filter,opacity] duration-base ease-quart-out group-hover:opacity-100 group-hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );
}
