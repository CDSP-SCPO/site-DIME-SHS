#!/usr/bin/env node

'use strict';

const parse = require('@iarna/toml/parse-stream');
const {createReadStream} = require('fs');
const {writeFile} = require('fs').promises;
const {join} = require('path');
const importers = require('../scripts/import/index.js');
const {stringify} = require('yaml').default;

const [,, type, source] = process.argv;

const importer = importers[type];
const stream = createReadStream(join(__dirname, '..', 'config.toml'));

parse(stream)
  .then(config => importer(source, config.params))
  .then(({items, publications}) => {
    const categories = Object.keys(publications);
    const writes = categories.map(category => {
      const filename = join(__dirname, '..', 'data', 'publications', `${category}.yml`);
      const data = items.filter(d => d.category === category);

      if (data.length === 0) {
        return Promise.resolve();
      }

      return writeFile(filename, stringify(data), {flag: 'a'});
    });

    return Promise.all(writes);
  })
  .catch(error => console.error(error.message));
