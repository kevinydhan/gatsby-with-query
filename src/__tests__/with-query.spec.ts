import withQuery from '../with-query'

describe('withQuery object', () => {
  it('is defined', () => {
    expect(withQuery).toBeDefined()
  })

  it('is a function', () => {
    expect(typeof withQuery).toBe('function')
  })

  it('returns a function', () => {
    const WithQueryHOC = withQuery(
      () => null,
      () => ({})
    )
    expect(typeof WithQueryHOC).toBe('function')
  })
})

describe("withQuery's arguments", () => {
  it('accepts as React component as its first argument', () => {
    expect(true)
  })
})
