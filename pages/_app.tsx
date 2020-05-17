import React from 'react'
import '../styles.css'
import fetch from 'node-fetch'
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'

const GRAPHQL_HOST = process.env.GRAPHQL_HOST ?? ''

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    createHttpLink({
      uri: `${GRAPHQL_HOST}/api/graphql`,
      // @ts-ignore
      fetch: fetch,
    }),
  ]),
})

export default ({ Component, pageProps }: any) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
)
