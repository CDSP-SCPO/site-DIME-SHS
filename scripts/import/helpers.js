'use strict';

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

    if (collections && collections[type] && collections[type] === id) {
      return key;
    }
  });
};

module.exports = {getDefaultCategory, getCategory};
