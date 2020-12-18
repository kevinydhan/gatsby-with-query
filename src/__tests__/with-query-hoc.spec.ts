/**
 * TypeScript linting is disabled to test for invalid arguments.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createElement, isValidElement } from 'react'
import withQuery from '../with-query'

const DivComponent = () => createElement('div')
const emptyQueryHook = () => ({})

describe('WithQueryHOC', () => {
  it('returns a React element', () => {
    const WithQueryHOC = withQuery(DivComponent, emptyQueryHook)
    const CreatedWithQueryHOC = createElement(WithQueryHOC)
    expect(isValidElement(CreatedWithQueryHOC)).toBe(true)
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
