import {debuglog} from 'util';
import {get} from 'superagent';
import {decode} from 'he';
import {getCategory, getDefaultCategory, cleanUrl, toDate} from './helpers.js';
import {parse} from 'fast-xml-parser';

const debug = debuglog('import:spire');

const getType = (type) => {
  return type.split('/').pop();
}

const getUrl = (urls) => {
  return urls
    .filter(url => /^http/.test(url))
    .filter(url => !/spire.(.+)\/resources\//.test(url))
    .pop();
};

export async function* paginate (url) {
  while (url) {
    const response = await get(url);
    debug('paginating to %s', url);
    const data = parse(response.text)['OAI-PMH'].ListRecords;

    url = data.resumptionToken
      ? url.replace(/(verb=ListRecords).*$/, "$1&resumptionToken="+data.resumptionToken)
      : undefined;

    yield data.record;
  }
}

export function parseRecords (records, {publications, mappingConfig, publicationsLabels}) {
  const DEFAULT_CATEGORY = getDefaultCategory(publications);
  const {spire:publicationsMapping} = mappingConfig;

  return records.map(item => {
    const metadata = item.metadata['oai_dc:dc'];
    const {identifier:id} = item.header;

    const {['dc:title']:title, ['dc:creator']:authors} = metadata;
    const {['dc:type']:types} = metadata;
    const {['dc:publisher']:publication, ['dc:source']:source} = metadata;

    const category = getCategory(item.header.setSpec, publications, 'spire');
    const url = getUrl(metadata['dc:identifier']);
    const date = Array.isArray(metadata['dc:date']) ? toDate(metadata['dc:date'][0]) : toDate(metadata['dc:date']);

    const itemType = getType(types.pop());
    const type = publicationsMapping[itemType] || itemType;
    if (publicationsLabels.indexOf(type) === -1) {
      console.log(metadata);
      throw new RangeError(`[Import Spire] Le mapping '${type}' de l'item #${id} (${title}) est inconnu. Il est à configurer dans le fichier config.toml au niveau de l'ancre '[params.publicationsMapping.spire]'.`);
    }

    return {
      id,
      title: decode(title),
      authors: Array.isArray(authors) ? authors : [authors],
      date,
      date_sort: new Date(date),
      url: cleanUrl(url),
      type,
      source,
      publication,
      category: category || DEFAULT_CATEGORY,
    };
  });
};

export default async function importer (source, {publicationsMapping:mappingConfig, publications, publicationsLabels}) {
  const items = [];

  for await (const records of paginate(source)) {
    items.push(...parseRecords(
      records,
      {mappingConfig, publications, publicationsLabels}
    ));
  }

  return {publications, items};
};
