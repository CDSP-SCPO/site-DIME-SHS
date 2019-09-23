import intersect from 'lodash.intersection';

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
  const translatedString = translateDate(string);

  return (translatedString.match(/(\d{4}([\\/\-]\d{2}){0,2}(?=\s?[\/,][\s$])){1,2}/) || [])[0]
  || translatedString
      .toLocaleLowerCase()
      .replace(/^(\w+)\s(\d{4})/, (m, month, year) => `${year}-${[...MONTH_MAP].find(([key, value]) => value === month)[0]}`)
      .replace(/^(\w+)\s(\d+),\s(\d{4})/, (m, month, day, year) => `${year}-${[...MONTH_MAP].find(([key, value]) => value === month)[0]}-${day.padStart(2, 0)}`)
      .replace(/^(\d{1,2})[\s\/\-](\d{4})/, (m, month, year) => `${year}-${month}`)
      .replace(/^(\d{1,2})(-\d{1,2})? (\w+) (\d{4})/, (m, day, day2, month, year) => `${year}-${month}-${day}`)
      .replace(/(-)(\w{2,})/, (m, sep, month) => {
        const foundMonth = [...MONTH_MAP].find(([digits, name]) => name === month)

        return foundMonth ? sep + foundMonth[0] : sep + month;
      })
  || translatedString;
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

  const dateString = cleanDate(string);

  if (Number.isNaN(new Date(dateString).getTime())) {
    throw new RangeError(`La date [${string}] ne peut être convertie.`)
  }

  return dateString.replace(/\//g, '-');
}
