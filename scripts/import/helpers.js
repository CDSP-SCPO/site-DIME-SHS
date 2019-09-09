import intersect from 'lodash.intersection';

export function getDefaultCategory (publications) {
  return Object.keys(publications).find(key => {
    if (('collections' in publications[key]) === false) {
      return key;
    }
  });
}

export function getCategory (id, publications, type) {
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
}

export function cleanUrl (maybeUrl) {
  try {
    const url = new URL(maybeUrl);
    return url.toString();
  }
  catch (error) {
    if (typeof maybeUrl === 'string' && maybeUrl.match(/^(.+\.[\w]+)(?<!.*@.*)\/?.*$/)) {
      return 'http://' + maybeUrl.trim();
    }
    return maybeUrl;
  }
}
