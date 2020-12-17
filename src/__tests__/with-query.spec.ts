import withQuery from '../with-query'

test('is a function', () => {
  expect(typeof withQuery).toBe('function')
})

test('returns a function', () => {
  expect(typeof withQuery()).toBe('function')
})
