import React, { useEffect, useState } from 'react'

import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { persistCache } from 'apollo-cache-persist'
import fetch from 'node-fetch'

import Loading from '../components/Loading'

import '../styles.css'

const cache = new InMemoryCache()

export default ({ Component, pageProps }: any) => {
  const [client, setClient] = useState<ApolloClient<Object> | undefined>()

  useEffect(() => {
    const getClient = async () => {
      await persistCache({
        cache,
        // @ts-ignore
        storage: window.localStorage,
      })

      const client = new ApolloClient({
        cache,
        link: ApolloLink.from([
          createHttpLink({
            uri: '/api/graphql',
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
