import withQuery from '../with-query'

describe('withQuery', () => {
  it('is defined', () => {
    expect(withQuery).toBeDefined()
  })

  it('is a function', () => {
    expect(typeof withQuery).toBe('function')
  })

  it('returns a function', () => {
    const WithQueryHOC = withQuery()
    expect(typeof WithQueryHOC).toBe('function')
  })
})
