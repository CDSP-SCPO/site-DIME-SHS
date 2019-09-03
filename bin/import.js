#!/usr/bin/env node

'use strict';

import parse from '@iarna/toml/parse-stream';
import fs, {createReadStream} from 'fs';
import {join} from 'path';
import importers from '../scripts/import/index.js';
import {stringify} from 'yaml';

const {writeFile} = fs.promises;
const [,, type, source] = process.argv;

const importer = importers[type];
const stream = createReadStream(join(__dirname, '..', 'config.toml'));

parse(stream)
  .then(config => importer(source, config.params))
  .then(({items, publications}) => {
    const categories = Object.keys(publications);
    const writes = categories.map(category => {
      const filename = join(__dirname, '..', 'data', 'publications', `${category}.yml`);
      const data = items.filter(d => d.category === category)
        .sort((d1, d2) => d1.id > d2.id ? 1 : -1);

      if (data.length === 0) {
        return Promise.resolve();
      }

      return writeFile(filename, stringify(data), {flag: 'a'});
    });

    return Promise.all(writes);
  })
  .catch(error => console.error(error.message));
