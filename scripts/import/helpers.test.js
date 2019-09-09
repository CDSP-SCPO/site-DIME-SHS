import test from 'ava';
import {cleanUrl} from './helpers.js';

test('cleanUrl() should prefix incomplete URL with http://', (t) => {
  t.deepEqual(cleanUrl('example.com/'), 'http://example.com/')
  t.deepEqual(cleanUrl('www.example.com'), 'http://www.example.com')
})

test('cleanUrl() should preserve existing scheme', (t) => {
  t.deepEqual(cleanUrl('ftp://example.com'), 'ftp://example.com/')
  t.deepEqual(cleanUrl('git+ssh://example.com/org/repo.git'), 'git+ssh://example.com/org/repo.git')
})

test('cleanUrl() should skip something which does not look like a URL', (t) => {
  t.deepEqual(cleanUrl('contact@example.com'), 'contact@example.com')
  t.deepEqual(cleanUrl('foo bar'), 'foo bar')
  t.deepEqual(cleanUrl(null), null)
  t.deepEqual(cleanUrl(undefined), undefined)
})
