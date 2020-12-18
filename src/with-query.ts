import { FunctionComponent, createElement } from 'react'

interface UseQueryHook<Props> {
  (receivedProps: Partial<Props>): Partial<Props>
}

/**
 * @template Props - React component's `props`
 *
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
export type WithQuery = <Props = Record<string, unknown>>(
  Component: FunctionComponent<Props>,
  useQueryHook: UseQueryHook<Props>
) => FunctionComponent<Partial<Props>>

/**
 * Returns a higher-order component which invokes the input hook and renders
 * the input component.
 *
 * @param Component - Base React component
 * @param useQueryHook - React hook which executes `useStaticQuery()` from
 * `gatsby`
 *
 * @returns - Higher-order component
 */
const withQuery: WithQuery = (Component, useQueryHook) => {
  if (typeof Component !== 'function') {
    throw new Error(
      `Expected a React component as the first argument for withQuery(). Instead, got: ${typeof Component}.`
    )
  }

  if (typeof useQueryHook !== 'function') {
    throw new Error(
      `Expected a function as the second argument for withQuery(). Instead, got: ${typeof useQueryHook}.`
    )
  }

  const WithQueryHOC: ReturnType<WithQuery> = (receivedProps) => {
    const props = useQueryHook(receivedProps)

    /**
     * @todo
     * - Figure out the proper typing for `props`
     */
    // eslint-disable-next-line
    // @ts-ignore
    return createElement(Component, props)
  }

  const componentName = Component.displayName || Component.name || 'Component'
  WithQueryHOC.displayName = `WithQuery${componentName}`

  return WithQueryHOC
}

export default withQuery
