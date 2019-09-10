import test from 'ava';
import {cleanUrl, toDate, translateDate, cleanDate} from './helpers.js';


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

test('translateDate() translates FR strings into EN', (t) => {
    t.deepEqual(translateDate('12 december 2014'), '12 december 2014')
    t.deepEqual(translateDate('12 décembre 2014'), '12 december 2014')
})

test('cleanDate() prepares an invalid date', (t) => {
  t.deepEqual(cleanDate('2018-10-03 / 2018-10-05'), '2018-10-03')
  t.deepEqual(cleanDate('2016, 1983'), '2016')
  t.deepEqual(cleanDate('2015-01, 2015-01, 1887'), '2015-01')
  t.deepEqual(cleanDate('2012-02-03, 1944'), '2012-02-03')
  t.deepEqual(cleanDate('12-13 décembre 2014'), '12-13 décembre 2014')
  t.deepEqual(cleanDate('01/2015'), '2015-01')
})

test('toDate() should transform a string into a sortable date string', (t) => {
    t.deepEqual(toDate(undefined), undefined)
    t.deepEqual(toDate('12 décembre 2014'), '2014-12-12')
    t.deepEqual(toDate('12-13 décembre 2014'), '2014-12-12')
    t.deepEqual(toDate('January 1, 2019'), '2019-01-01')
    t.deepEqual(toDate('2016/01/01'), '2016-01-01')
    t.deepEqual(toDate('2016-05-12'), '2016-05-12')
    t.deepEqual(toDate('2017'), '2017')
    t.deepEqual(toDate('2016-12'), '2016-12')
    t.deepEqual(toDate('May 2016'), '2016-05')
    t.deepEqual(toDate('01/2015'), '2015-01-01')  // "bug", because month+day are equal
    t.deepEqual(toDate('2018-10-03 / 2018-10-05'), '2018-10-03')
    t.deepEqual(toDate('2016, 1983'), '2016')
    t.deepEqual(toDate('2012-02-03, 1944'), '2012-02-03')
    t.deepEqual(toDate('2014, 2006'), '2014')
})
