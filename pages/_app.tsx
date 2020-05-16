import React from "react";
import '../styles.css'
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: '/api/graphql',
    })
})

export default ({ Component, pageProps }: any) => (
    <ApolloProvider client={client}>
        <Component {...pageProps} />
    </ApolloProvider>
)
