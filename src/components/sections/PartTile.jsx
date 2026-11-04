import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Photo from '../media/Photo';
import { iconSize } from '../../lib/icon-size';

/**
 * A parts category as the counter shows it: the product shot on a white plate,
 * and a black foot with the name and a tan arrow. Built for the navy band, where
 * the white plates and black feet are the contrast.
 *
 * On a phone the tiles sit two to a row, so the plate goes squarer and the foot
 * smaller: one to a row made six tiles a screen and a half of scrolling for
 * what is a list of six names.
 */
export default function PartTile({ category }) {
  return (
    <Link
      to={`/parts?category=${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-md transition-transform duration-base ease-quart-out hover:-translate-y-0.5"
    >
      <div
        className={`product-plate aspect-[4/3] sm:aspect-[16/8] ${category.photoFill ? '' : 'p-3 sm:px-6'}`}
      >
        <Photo
          name={category.photo}
          alt={category.photoAlt}
          sizes="(min-width: 1024px) 24rem, 50vw"
          className={`h-full w-full ${category.photoFill ? 'object-cover' : 'object-contain'}`}
        />
      </div>
      <div className="flex flex-1 items-center justify-between gap-3 bg-black px-3 py-3 sm:gap-4 sm:px-5 sm:py-4">
        <span className="font-display text-sm font-bold leading-snug text-white sm:text-lg">
          {category.name}
        </span>
        <ArrowRight
          size={iconSize.feature - 8}
          aria-hidden="true"
          className="hidden shrink-0 text-[color:var(--tan)] transition-transform duration-fast group-hover:translate-x-1 sm:block"
        />
      </div>
    </Link>
  );
}
