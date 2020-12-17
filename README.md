# gatsby-with-query

A higher-order component used to decouple Gatsby's static queries

<br>
<hr>

### Example 1

```tsx
// App.tsx
import React, { FunctionComponent } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import withQuery from 'gatsby-with-query'
import useGetSiteMetadataQuery from './App.query'

interface AppProps {
  title: string
  description: string
}

export const App: FunctionComponent<AppProps> = ({ title, description }) => (
  <main>
    <h1>{title}</h1>
    <p>{description}</p>
  </main>
)

export default withQuery<AppProps>(App, useGetSiteMetadataQuery)
```

```tsx
// App.query.tsx
import { graphql } from 'gatsby'

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

const useGetSiteMetadataQuery = () => {
  const queriedProps = useStaticQuery(query)
  return queriedProps.site.siteMetadata
}

export default useGetSiteMetadataQuery
```

<br>
<hr>

### Example 2

```tsx
// App.tsx
import React, { FunctionComponent } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import withQuery from 'gatsby-with-query'

interface AppProps {
  title: string
  description: string
}

export const App: FunctionComponent<AppProps> = ({ title, description }) => (
  <main>
    <h1>{title}</h1>
    <p>{description}</p>
  </main>
)

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

export default withQuery<AppProps>(App, () => {
  const queriedProps = useStaticQuery(query)
  return queriedProps.site.siteMetadata
})
```

<br>
<hr>

### Example 3(?)

```tsx
// App.tsx
import React, { FunctionComponent } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import withQuery from 'gatsby-with-query'

interface AppProps {
  title: string
  description: string
}

export const App: FunctionComponent<AppProps> = ({ title, description }) => (
  <main>
    <h1>{title}</h1>
    <p>{description}</p>
  </main>
)

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

export default withQuery<AppProps>(() => (
  <StaticQuery query={query}>
    {(queriedProps) => <App {...queriedProps} />}
  </StaticQuery>
))
```
