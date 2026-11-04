/**
 * Model names like BP-14 and RM-Series carry a hyphen, and a browser will
 * break a line at any hyphen, which leaves "RM-" at the end of one line and
 * "Series" at the start of the next. A non-breaking hyphen looks the same and
 * keeps the name in one piece. It is applied where the copy is drawn rather
 * than in the content, so search, the structured data and the crawl files keep
 * the plain hyphen.
 */
const MODEL = /\b([A-Z]{2,3})-(\d+|Series)\b/g;

export function keepModelsWhole(text) {
  return typeof text === 'string' ? text.replace(MODEL, '$1‑$2') : text;
}
