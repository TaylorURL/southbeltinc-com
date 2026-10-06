import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Photo from '../media/Photo';
import { iconSize } from '../../lib/icon-size';

/**
 * A parts category as the counter shows it: the product shot on a white plate,
 * and a black foot with the name and a tan arrow. Built for the navy band, where
 * the white plates and black feet are the contrast.
 */
export default function PartTile({ category }) {
  return (
    <Link
      to={`/parts?category=${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-md transition-transform duration-base ease-quart-out hover:-translate-y-0.5"
    >
      <div className="product-plate aspect-[16/8] px-6 py-3">
        <Photo
          name={category.photo}
          alt={category.photoAlt}
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex items-center justify-between gap-4 bg-black px-5 py-4">
        <span className="font-display text-lg font-bold text-white">{category.name}</span>
        <ArrowRight
          size={iconSize.feature - 8}
          aria-hidden="true"
          className="text-[color:var(--tan)] transition-transform duration-fast group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
