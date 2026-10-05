import test from 'node:test'
import assert from 'node:assert/strict'
import { parseWatchlist } from '../src/lib/watchlist.js'

const movie = { id: 1, media_type: 'movie', title: 'A film', poster_path: '/poster.jpg', release_date: '2025-01-01', vote_average: 8 }
const serialize = items => JSON.stringify({ version: 1, items })

test('empty storage produces an empty list', () => {
  assert.deepEqual(parseWatchlist(null), [])
})

test('movie and TV IDs remain distinct and identical entries deduplicate', () => {
  const tv = { ...movie, media_type: 'tv', title: 'A series' }
  assert.deepEqual(parseWatchlist(serialize([movie, tv, movie])), [movie, tv])
})

test('optional metadata is normalized and unknown fields are discarded', () => {
  assert.deepEqual(parseWatchlist(serialize([{ id: 2, media_type: 'movie', title: 'Minimal', poster_path: 42, vote_average: '9', unexpected: 'value' }])), [
    { id: 2, media_type: 'movie', title: 'Minimal', poster_path: null, release_date: '', vote_average: 0 },
  ])
})

test('malformed JSON and incompatible storage versions are surfaced', () => {
  assert.throws(() => parseWatchlist('{'))
  assert.throws(() => parseWatchlist(JSON.stringify({ version: 2, items: [] })), /could not be read/)
  assert.throws(() => parseWatchlist(JSON.stringify({ version: 1, items: {} })), /could not be read/)
})

test('invalid media types, IDs, titles and null entries are rejected', () => {
  for (const invalid of [null, { ...movie, media_type: 'person' }, { ...movie, id: -1 }, { ...movie, id: 1.5 }, { ...movie, title: 10 }]) {
    assert.throws(() => parseWatchlist(serialize([invalid])), /invalid data/)
  }
})
