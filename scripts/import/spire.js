'use strict';

const {get} = require('superagent');
const {getCategory, getDefaultCategory} = require('./helpers.js');
const {parse} = require('fast-xml-parser');

const getType = (type) => {
  return type.split('/').pop();
}

const getUrl = (urls) => {
  return urls
    .filter(url => /^http/.test(url))
    .filter(url => !/spire.(.+)\/resources\//.test(url))
    .pop();
};

const importer = (source, {publicationsMapping:mappingConfig, publications, publicationsLabels}) => {
  const DEFAULT_CATEGORY = getDefaultCategory(publications);
  const {spire:publicationsMapping} = mappingConfig;

  return get(source)
    .then(({text}) => {
      const records = parse(text)['OAI-PMH'].ListRecords.record;
      const items = records.map(item => {
        const metadata = item.metadata['oai_dc:dc'];
        const {identifier:id} = item.header;

        const {['dc:title']:title, ['dc:date']:date, ['dc:creator']:authors} = metadata;
        const {['dc:type']:types} = metadata;
        const {['dc:publisher']:publication, ['dc:source']:source} = metadata;

        const category = getCategory(item.header.setSpec, publications, 'spire');
        const url = getUrl(metadata['dc:identifier']);

        const itemType = getType(types.pop());
        const type = publicationsMapping[itemType] || itemType;
        if (publicationsLabels.indexOf(type) === -1) {
          throw new RangeError(`[Import Spire] Le mapping '${type}' de l'item #${id} (${title}) est inconnu. Il est à configurer dans le fichier config.toml au niveau de l'ancre '[params.publicationsMapping.spire]'.`);
        }

        return {
          id,
          title,
          authors: Array.isArray(authors) ? authors : [authors],
          date: Array.isArray(date) ? date.join(', ') : date,
          url,
          type,
          source,
          publication,
          category: category || DEFAULT_CATEGORY,
        };
      });

      return {items, publications};
    })
};

module.exports = importer;
