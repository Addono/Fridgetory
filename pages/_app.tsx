import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import { Layout, Row, Col } from 'antd'

import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { persistCache } from 'apollo-cache-persist'
import fetch from 'node-fetch'

import Loading from '../components/Loading'
import { SharedSearchProvider } from '../components/Search/useSharedSearch'
import SearchInput from '../components/Search/SearchInput'

import '../styles.css'

const cache = new InMemoryCache()

const ProvideApollo = ({ children }: { children: React.ReactNode }) => {
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

  if (!client) {
    return <Loading />
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

const _app = ({ Component, pageProps }: any) => {
  // Get the version of the application from the environment variables
  const { version } = process.env

  return (
    <>
      <SharedSearchProvider>
        <Layout className={'layout'}>
          <Head>
            <title>Fridgetory</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
          </Head>

          <Layout.Header style={{ height: 64, position: 'fixed', zIndex: 1, width: '100%', padding: '0 2em' }}>
            <Row style={{ flexFlow: 'row' }}>
              <Col flex={'content'} style={{ color: 'white', paddingRight: '1em', fontWeight: 'bold' }}>
                Fridgetory
              </Col>
              <Col flex={'auto'}>
                <SearchInput />
              </Col>
            </Row>
          </Layout.Header>

          <Layout.Content style={{ marginTop: 64 }}>
            <ProvideApollo>
              <Component {...pageProps} />
            </ProvideApollo>
          </Layout.Content>

          <Layout.Footer style={{ textAlign: 'center' }}>
            <a href={'https://aknapen.nl'} target="_blank" rel="noopener noreferrer" style={{ color: 'grey' }}>
              2020&nbsp;©&nbsp;Adriaan Knapen
            </a>
            {version && (
              <>
                -
                <a
                  href={`https://github.com/Addono/Fridgetory/releases/tag/v${version}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'grey' }}
                >
                  v{version}
                </a>
              </>
            )}
          </Layout.Footer>
        </Layout>
      </SharedSearchProvider>
    </>
  )
}

export default _app
