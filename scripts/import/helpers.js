'use strict';

const intersect = require('lodash.intersection');

const getDefaultCategory = (publications) => {
  return Object.keys(publications).find(key => {
    if (('collections' in publications[key]) === false) {
      return key;
    }
  });
};

const getCategory = (id, publications, type) => {
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
};

module.exports = {getDefaultCategory, getCategory};
