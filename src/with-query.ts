import { createElement, FunctionComponent } from 'react'

/**
 * @param Component <br>
 * - can be a `FunctionComponent`
 * - can be a class `Component`
 * - (?) can be a class `PureComponent`
 *   - Do `Component` and `PureComponent` have the same type signature?
 *
 * @param useQueryHook <br>
 * - should return an object literal
 * - should return a subset of the component's `props` OR all of the `props`
 * - (?) should call Gatsby's `useStaticQuery()`
 *
 * @returns `WithQueryHOC`
 * - should accept a subset of the component's `props` OR all of the `props`
 *   - any overlapping `props.<key>` should preferred
 */
export type WithQuery = <Props = Record<string, never>>(
  Component: FunctionComponent<Props>,
  useQueryHook: () => Props
) => FunctionComponent<ReturnType<typeof useQueryHook>>

const withQuery: WithQuery = (Component, useQueryHook) => {
  const WithQueryHOC: ReturnType<WithQuery> = (receivedProps) => {
    const queriedProps = useQueryHook()
    return createElement(Component, {
      ...queriedProps,
      ...receivedProps,
    })
  }

  const componentName = Component.displayName || Component.name || 'Component'
  WithQueryHOC.displayName = `WithQuery${componentName}`

  return WithQueryHOC
}

export default withQuery
