#!/usr/bin/env node

'use strict';

import {debuglog} from 'util';
import fs, {createReadStream} from 'fs';
import {join} from 'path';
import parse from '@iarna/toml/parse-stream';
import {stringify} from 'yaml';
import importers from '../scripts/import/index.js';

const {writeFile} = fs.promises;
const [,, type, source] = process.argv;
const debug = debuglog('import');

const importer = importers[type];
const stream = createReadStream(join(__dirname, '..', 'config.toml'));

parse(stream)
  .then(config => importer(source, config.params))
  .catch(error => {
    console.error(error);
    console.error(`\x1B[30;41mL'import a été annulé et aucun fichier n'a été mis à jour.\x1B[0m`);
    process.exit(1);
  })
  .then(({items, publications}) => {
    debug('Attempting to write %d %s items in data/publications', items.length, type)

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
  .catch(error => console.error(error) && process.exit(1));
