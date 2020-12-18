# gatsby-with-query

`withQuery` is a higher-order component that is used to decouple [Gatsby][gh-gatsby]'s static queries.

<br>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

<br>

## Installation

```sh
npm i gatsby-with-query
```

```sh
yarn gatsby-with-query
```

<br>

## Usage

Create the following:

- your GraphQL query using Gatsby's `graphql()`
- a React hook which invokes Gatsby's `useStaticQuery()` and returns either all or a subset of your component's `props`

```tsx
// App.query.tsx
import { graphql, useStaticQuery } from 'gatsby'

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

Then, import the React hook and `withQuery()` into your component's file:

```tsx
// App.tsx
import React, { FunctionComponent } from 'react'
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

<br>

Alternatively, you can have your React component, GraphQL query, and React query hook in the same file:

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

[gh-gatsby]: https://github.com/gatsbyjs/gatsby
