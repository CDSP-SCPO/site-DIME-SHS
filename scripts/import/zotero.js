'use strict';

const request = require('superagent');
const {getCategory, getDefaultCategory} = require('./helpers.js');

const ALLOWED_TYPES = [
  'author',
  'bookAuthor',
  'presenter',
  'reviewedAuthor',
];

const getAuthors = (creators) => {
  return creators
      .filter(({creatorType}) => ALLOWED_TYPES.indexOf(creatorType) !== -1)
      .map(({name, firstName, lastName}) => name || `${lastName}, ${firstName}`);
};

const getSource = (data) => {
  return data.publisher || data.conferenceName || data.blogTitle || data.manuscriptType || data.meetingName || data.place || null;
};

const importer = (source, {publicationsMapping:mappingConfig, publications, publicationsLabels}) => {
  return request
      .get(source)
      // TODO
      // The Zotero API returns at most 100 items in a response.
      // If the number of publication comes to exceed 100,
      // some additional logic is needed to handle pagination of responses.
      .query({limit: 100})
      .then(({body}) => {
        const DEFAULT_CATEGORY = getDefaultCategory(publications);
        const {zotero:publicationsMapping} = mappingConfig;

        const items = body.filter(d => d.data.collections).map(item => {
          const categoryId = item.data.collections.pop();
          const category = getCategory(categoryId, publications, 'zotero');

          const {key:id, title, url, date, itemType, creators} = item.data;
          const {issue, pages, volume, publicationTitle:publication} = item.data;
          const type = publicationsMapping[itemType] || itemType;

          if (publicationsLabels.indexOf(type) === -1) {
            console.error('%s : mapping pas configuré dans config.toml', type);
          }

          return {
            id,
            title,
            authors: getAuthors(creators),
            date,
            url,
            type,
            issue,
            pages,
            publication,
            volume,
            source: getSource(item.data),
            category: category || DEFAULT_CATEGORY,
          };
        });

        return {items, publications};
      })
};

module.exports = importer;
