import { createElement } from 'react'
import withQuery from '../with-query'

const DivComponent = () => createElement('div')
const emptyQueryHook = () => ({})

describe('withQuery object', () => {
  it('is defined', () => {
    expect(withQuery).toBeDefined()
  })

  it('is a function', () => {
    expect(typeof withQuery).toBe('function')
  })

  it('returns a function', () => {
    const WithQueryHOC = withQuery(DivComponent, emptyQueryHook)
    expect(typeof WithQueryHOC).toBe('function')
  })
})

describe("withQuery's arguments", () => {
  it('does not immediately create the React component passed as its first argument', () => {
    const MockComponent = jest.fn(DivComponent)
    const WithQueryHOC = withQuery(MockComponent, emptyQueryHook)

    expect(MockComponent.mock.calls.length).toBe(0)

    createElement(WithQueryHOC)
    expect(MockComponent.mock.calls.length).toBe(1)
  })
})
