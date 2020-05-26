import React, { useEffect } from 'react'
import '../styles.css'
import fetch from 'node-fetch'
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { useState } from 'react'

import { persistCache } from 'apollo-cache-persist'

import Loading from '../components/Loading'

const GRAPHQL_HOST = process.env.GRAPHQL_HOST ?? ''

const cache = new InMemoryCache()

export default ({ Component, pageProps }: any) => {
  const [client, setClient] = useState<ApolloClient<Object> | undefined>()

  useEffect(() => {
    const getClient = async () => {
      await persistCache({
        cache,
        storage: localStorage,
      })

      const client = new ApolloClient({
        cache,
        link: ApolloLink.from([
          createHttpLink({
            uri: `${GRAPHQL_HOST}/api/graphql`,
            // @ts-ignore
            fetch: fetch,
          }),
        ]),
      })

      setClient(client)
    }

    if (!client) {
      getClient()
    }
  }, [])

  return client ? (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  ) : (
    <Loading />
  )
}
