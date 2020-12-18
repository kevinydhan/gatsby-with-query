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

describe("withQuery's return value", () => {
  it('returns a function', () => {
    const WithQueryHOC = withQuery(DivComponent, emptyQueryHook)
    expect(typeof WithQueryHOC).toBe('function')
  })
})

describe('WithQueryHOC.displayName', () => {
  it('is defined', () => {
    const WithQueryHOC = withQuery(DivComponent, emptyQueryHook)
    expect(WithQueryHOC.displayName).toBeDefined()
  })

  it('is a string', () => {
    const WithQueryHOC = withQuery(DivComponent, emptyQueryHook)
    expect(typeof WithQueryHOC.displayName).toBe('string')
  })

  it('contains Component.displayName', () => {
    const NameTestComponent = () => createElement('div')
    const WithQueryHOC = withQuery(NameTestComponent, emptyQueryHook)
    const containsName = WithQueryHOC.displayName.includes('NameTestComponent')
    expect(containsName).toBe(true)
  })

  it('creates higher-order components with different displayName values', () => {
    const NameTestComponent1 = () => createElement('div')
    const NameTestComponent2 = () => createElement('div')
    const WithQueryHOC1 = withQuery(NameTestComponent1, emptyQueryHook)
    const WithQueryHOC2 = withQuery(NameTestComponent2, emptyQueryHook)

    expect(WithQueryHOC1.displayName === WithQueryHOC2.displayName).toBe(false)
  })
})
