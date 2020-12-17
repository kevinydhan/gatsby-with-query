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

const withQuery: WithQuery = (Component, useQueryHook) => {
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
