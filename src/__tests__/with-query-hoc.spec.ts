import { isValidElement } from 'react'
import withQuery from '../with-query'

describe("WithQueryHOC's arguments", () => {
  xit('', () => {
    expect(true)
  })
})

describe("WithQueryHOC's return value", () => {
  xit('is a React element', () => {
    const WithQueryHOC = withQuery()
    expect(isValidElement(WithQueryHOC)).toBe(true)
  })
})
