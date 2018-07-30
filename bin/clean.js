#!/usr/bin/env node

'use strict';

const parse = require('@iarna/toml/parse-stream');
const {createReadStream} = require('fs');
const {writeFile} = require('fs').promises;
const {join} = require('path');
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
