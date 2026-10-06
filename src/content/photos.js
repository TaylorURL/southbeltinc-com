/**
 * Every photograph the site shows, cut to WebP at the widths listed. The cuts
 * are made from the company's own originals, so the width and height here are
 * the original's: an `img` given them reserves the right box before the file
 * arrives, whichever cut the browser picks.
 *
 * A name is the file stem under public/photos. Adding a photo means cutting it
 * at these widths and adding a line here; nothing else hard-codes a path.
 */
const photos = {
  'crew-under-plant': { widths: [480, 800, 1200, 1600], width: 4480, height: 6720 },
  'bp-14-plant': { widths: [480, 800, 1200, 1600], width: 4160, height: 2340 },
  'bp-14-augerless-plant': { widths: [480, 800, 1200], width: 1400, height: 1050 },
  'dp-12-plant': { widths: [480, 800, 1200, 1600], width: 3888, height: 3168 },
  'sbm-12-plant': { widths: [480, 800, 1200, 1600], width: 2400, height: 975 },
  'portable-pugmill': { widths: [480, 800, 1200, 1600], width: 2048, height: 1536 },
  'stationary-pugmill': { widths: [480, 800, 1200, 1600], width: 2048, height: 1536 },
  'vertical-pigs': { widths: [480, 800, 1200, 1600], width: 4296, height: 4480 },
  'storage-pig': { widths: [480, 800, 1200, 1600], width: 6720, height: 4480 },
  'storage-pig-side': { widths: [480, 800, 1200, 1600], width: 6720, height: 4480 },
  'paragon-blowers': { widths: [480, 800, 1200, 1600], width: 6720, height: 4480 },
  'water-tank': { widths: [480, 800, 1200, 1600], width: 6720, height: 4480 },
  'water-tank-rental': { widths: [480, 800, 1200, 1600], width: 2016, height: 1512 },
  'rm-conveyor': { widths: [480, 800, 1200, 1600], width: 2550, height: 1956 },
  'auger-1350': { widths: [480, 800, 1200, 1600], width: 3024, height: 2520 },
  'boom-crane': { widths: [480, 800, 1200, 1600], width: 6720, height: 4480 },
  'frac-tank': { widths: [480, 800, 1200, 1600], width: 2560, height: 1440 },
  'welders-shop': { widths: [480, 800, 1200, 1600], width: 2838, height: 3245 },
  'plant-structure': { widths: [480, 800, 1200, 1600], width: 6720, height: 4480 },
  'fabrication-hopper': { widths: [480, 800, 1200, 1600], width: 3000, height: 4000 },
  'vertical-silos': { widths: [480, 800, 1200, 1600], width: 6720, height: 4480 },
  'structural-fabrication': { widths: [480, 800, 1200, 1600], width: 4032, height: 3024 },
  'blower-repair': { widths: [480, 800, 1200, 1600], width: 3024, height: 4032 },
  'maintenance-team': { widths: [480, 800, 1200, 1600], width: 2479, height: 3076 },
  'belting-racks': { widths: [480, 800, 1200, 1600], width: 3024, height: 4032 },
  'parts-counter': { widths: [480, 800, 1200, 1600], width: 6720, height: 4480 },
  'front-desk': { widths: [480, 800], width: 1080, height: 932 },
  'field-truck': { widths: [480, 800, 1200, 1600], width: 3024, height: 2688 },
  'shop-conveyor': { widths: [480, 800, 1200, 1600], width: 6720, height: 4480 },
  'shop-tank': { widths: [480, 800, 1200, 1600], width: 6720, height: 4480 },
  'alliance-plant': { widths: [480, 800, 1200, 1600], width: 6720, height: 4480 },
  'yard-houston': { widths: [480, 800, 1200, 1600], width: 3870, height: 1075 },
  'yard-san-marcos': { widths: [480, 800], width: 1003, height: 876 },
  'yard-dallas': { widths: [480, 800, 1200], width: 1433, height: 1168 },
  'used-pugmill': { widths: [480, 800, 1200, 1600], width: 1920, height: 1440 },
  'used-pugmill-hoppers': { widths: [480, 800, 1200, 1600], width: 1920, height: 1440 },
  'used-feeder-hopper': { widths: [480, 800], width: 1093, height: 820 },
  'used-vertical-silo': { widths: [480, 800, 1200, 1600], width: 16320, height: 7612 },
  'diesel-blower': { widths: [480, 800], width: 3393, height: 2472 },
  'electric-blower': { widths: [480, 800], width: 3024, height: 2844 },
  'storage-pig-cutout': { widths: [480, 800], width: 1006, height: 466 },
  'part-motors': { widths: [480, 800], width: 1400, height: 935 },
  'part-bearings': { widths: [480, 800], width: 2560, height: 1707 },
  'part-dust-collection': { widths: [400], width: 400, height: 300 },
  'part-material-handling': { widths: [480, 800], width: 2560, height: 1725 },
  'part-pneumatics': { widths: [373], width: 373, height: 280 },
  'part-pumps': { widths: [373], width: 373, height: 280 },
};

/**
 * The attributes an `img` needs for a named photo: the second cut as the
 * fallback source, every cut in the srcset, and the intrinsic box.
 */
export function photo(name) {
  const entry = photos[name];
  if (!entry) throw new Error(`No photo named ${name}`);
  const { widths, width, height } = entry;
  const fallback = widths[Math.min(1, widths.length - 1)];
  return {
    src: `/photos/${name}-${fallback}.webp`,
    srcSet: widths.map((w) => `/photos/${name}-${w}.webp ${w}w`).join(', '),
    width,
    height,
  };
}
