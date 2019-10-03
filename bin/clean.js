#!/usr/bin/env node

'use strict';

import parse from '@iarna/toml/parse-stream';
import {createReadStream} from 'fs';
import fs from 'fs';
import {join} from 'path';

const {writeFile} = fs.promises;
const stream = createReadStream(join(__dirname, '..', 'config.toml'));

parse(stream)
  .then(config => {
    const categories = Object.keys(config.params.publications);

    const writes = categories.map(category => {
      const filename = join(__dirname, '..', 'data', 'publications', `${category}.yml`);

      return writeFile(filename, '', {flag: 'w'});
    });

    return Promise.all(writes);
  });
