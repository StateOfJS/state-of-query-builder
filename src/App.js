import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import client from './api_client'
import { FeatureUsage } from './blocks'

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <FeatureUsage feature="proxies" year={2019} />
            </div>
        </ApolloProvider>
    )
}

export default App
