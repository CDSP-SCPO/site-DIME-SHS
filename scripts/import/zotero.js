import {debuglog} from 'util';
import request from 'superagent';
import {parse as parseLinkHeader} from 'http-link-header';
import {getCategory, getDefaultCategory, cleanUrl, toDate} from './helpers.js';

const debug = debuglog('import:zotero');

const ALLOWED_AUTHOR_TYPES = [
  'author',
  'bookAuthor',
  'presenter',
  'reviewedAuthor',
];

const getAuthors = (creators) => {
  return creators
      .filter(({creatorType}) => ALLOWED_AUTHOR_TYPES.indexOf(creatorType) !== -1)
      .map(({name, firstName, lastName}) => name || `${lastName}, ${firstName}`)
      .map(name => name.trim().replace(/,+$/, ''))
};

const getSource = (data) => {
  return data.publisher || data.conferenceName || data.blogTitle || data.manuscriptType || data.meetingName || data.place || null;
};


export async function* paginate (url) {
  while (url) {
    const {header, body} = await request.get(url);
    debug('paginating to %s', url);

    url = header.link && parseLinkHeader(header.link).rel('next').length
      ? parseLinkHeader(header.link).rel('next')[0].uri
      : undefined;

    yield body;
  }
}

export function parseBody (body, {publications, mappingConfig, publicationsLabels}) {
  const DEFAULT_CATEGORY = getDefaultCategory(publications);
  const {zotero:publicationsMapping} = mappingConfig;

  return body.filter(d => d.data.collections).map(item => {
    const categoryId = item.data.collections.pop();
    const category = getCategory(categoryId, publications, 'zotero');

    const {key:id, title, url, itemType, creators} = item.data;
    const {issue, pages, volume, publicationTitle:publication} = item.data;
    const type = publicationsMapping[itemType] || itemType;
    const date = toDate(item.data.date);

    if (publicationsLabels.indexOf(type) === -1) {
      throw new RangeError(`[Import Zotero] Le mapping '${type}' de l'item #${id} (${title}) est inconnu. Il est à configurer dans le fichier config.toml au niveau de l'ancre '[params.publicationsMapping.zotero]'.`);
    }

    return {
      id,
      title,
      authors: getAuthors(creators),
      date,
      date_sort: new Date(date),
      url: cleanUrl(url),
      type,
      issue,
      pages,
      publication,
      volume,
      source: getSource(item.data),
      category: category || DEFAULT_CATEGORY,
    };
  });
}

export default async function importer (source, {publicationsMapping:mappingConfig, publications, publicationsLabels}) {
  const items = [];

  for await (const body of paginate(source)) {
    items.push(...parseBody(
      body,
      {mappingConfig, publications, publicationsLabels}
    ));
  }

  return {publications, items};
};
