/**
 * TypeScript linting is disabled to test for invalid arguments.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
    const WithQueryHOC = withQuery(DivComponent, 1)
    expect(typeof WithQueryHOC).toBe('function')
  })
})

describe("withQuery's arguments", () => {
  /**
   * @todo
   * - Update the test to handle for `React.Component` and `React.PureComponent`
   */
  it('should throw an error if the first argument is not a React component', () => {
    expect(() => withQuery(1, emptyQueryHook)).toThrowError()
    expect(() => withQuery('string', emptyQueryHook)).toThrowError()
    expect(() => withQuery({}, emptyQueryHook)).toThrowError()
    expect(() => withQuery([], emptyQueryHook)).toThrowError()
    expect(() => withQuery(null, emptyQueryHook)).toThrowError()
    expect(() => withQuery(undefined, emptyQueryHook)).toThrowError()
  })

  it('should throw an error if the second argument is not a function', () => {
    expect(() => withQuery(DivComponent, 1)).toThrowError()
    expect(() => withQuery(DivComponent, 'string')).toThrowError()
    expect(() => withQuery(DivComponent, {})).toThrowError()
    expect(() => withQuery(DivComponent, [])).toThrowError()
    expect(() => withQuery(DivComponent, null)).toThrowError()
    expect(() => withQuery(DivComponent, undefined)).toThrowError()
  })
})
