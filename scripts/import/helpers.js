import intersect from 'lodash.intersection';
import superagent from 'superagent';
import extendWithDelay from 'superagent-retry-delay';

extendWithDelay(superagent);
export const get = superagent.get;

export function getDefaultCategory (publications) {
  return Object.keys(publications).find(key => {
    if (('collections' in publications[key]) === false) {
      return key;
    }
  });
}

export function getCategory (id, publications, type) {
  return Object.keys(publications).find(key => {
    const {collections} = publications[key];

    if (collections && collections[type]) {
      if (Array.isArray(id)) {
        const result = intersect(id, [collections[type]]);

        if (result.length) {
          return result.pop();
        }
      }
      else if (collections[type] === id) {
        return key;
      }
    }
  });
}

export function cleanUrl (maybeUrl) {
  try {
    const url = new URL(maybeUrl);
    return url.toString();
  }
  catch (error) {
    if (typeof maybeUrl === 'string' && maybeUrl.match(/^(.+\.[\w]+)(?<!.*@.*)\/?.*$/)) {
      return 'http://' + maybeUrl.trim();
    }
    return maybeUrl;
  }
}

export const LANG_MAP = new Map([
  ['décembre', 'december'],
  ['decembre', 'december'],
  ['novembre', 'november'],
  ['octobre', 'october'],
  ['septembre', 'september'],
  ['août', 'august'],
  ['aout', 'august'],
  ['juillet', 'july'],
  ['juin', 'june'],
  ['mai', 'may'],
  ['avril', 'april'],
  ['mars', 'march'],
  ['février', 'february'],
  ['fevrier', 'february'],
  ['janvier', 'january'],
])
export const MONTH_MAP = new Map([
  ['12', 'december'],
  ['11', 'november'],
  ['10', 'october'],
  ['09', 'september'],
  ['08', 'august'],
  ['07', 'july'],
  ['06', 'june'],
  ['05', 'may'],
  ['04', 'april'],
  ['03', 'march'],
  ['02', 'february'],
  ['01', 'january'],
])

const ALLOWED_TYPES = new Map([
  ['year', 0],
  ['month', 1],
  ['day', 2],
])

export function cleanDate (string) {
  return (string.match(/(\d{4}([\\/\-]\d{2}){0,2}(?=\s?[\/,][\s$])){1,2}/) || [])[0]
  || string
      .toLocaleLowerCase()
      .replace(/^(\w+)\s(\d{4})/, (m, month, year) => `${year}-${[...MONTH_MAP].find(([key, value]) => value === month)[0]}`)
      .replace(/^(\d{1,2})[\s\/\-](\d{4})/, (m, month, year) => `${year}-${month}`)
      .replace(/^(\d{1,2})(-\d{1,2})? (\w+) (\d{4})/, (m, day, day2, month, year) => `${year}-${month}-${day}`)
  || string;
}

export function translateDate (string) {
  const lcString = string.toLocaleLowerCase()

  for (const [fr, en] of LANG_MAP) {
    if (lcString.includes(fr)) {
      return lcString.replace(fr, en)
    }
  }

  return string
}

export function matchMonth(dateString, value) {
  return dateString.toLowerCase().match(new RegExp(`(^|\\D)(0?${Number(value)}|${MONTH_MAP.get(value)})(\\D|$)`));
}

export function matchDay(dateString, value) {
  return dateString.match(new RegExp(`(^|\\D)0?${Number(value)}(\\D|$)`));
}

export function toDate (string) {
  if (!string || typeof string !== 'string') {
    return string
  }

  const formatter = new Intl.DateTimeFormat('fr-FR', {formatMatcher: 'basic', year: 'numeric', month: '2-digit', day: '2-digit'})
  const dateString = translateDate(string);
  const d = new Date(cleanDate(dateString));

  if (Number.isNaN(d.getTime())) {
    throw new RangeError(`La date [${string}] ne peut être convertie.`)
  }

  return formatter.formatToParts(d)
    .filter(({type}) => ALLOWED_TYPES.has(type))
    .sort((a, b) => ALLOWED_TYPES.get(a.type) - ALLOWED_TYPES.get(b.type))
    .filter(({type, value}) => {
      return dateString.match(new RegExp(`(^|\\D)${value}(\\D|$)`)) || (type === 'day' && matchDay(dateString, value)) || (type === 'month' && matchMonth(dateString, value))
    })
    .map(({value}) => value)
    .join('-')
    .toString();
}
