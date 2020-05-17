import React from "react";
import '../styles.css'
import fetch from 'node-fetch'
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: '/api/graphql',
// @ts-ignore
        fetch: fetch,
    })
})

export default ({ Component, pageProps }: any) => (
    <ApolloProvider client={client}>
        <Component {...pageProps} />
    </ApolloProvider>
)
