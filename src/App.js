import React from 'react'
import { Router, Link } from '@reach/router'
import { ApolloProvider } from '@apollo/react-hooks'
import styled from 'styled-components'
import client from './api_client'
import { Home, Feature, Opinions, Happiness } from './pages'

const Container = styled.div`
    display: grid;
    grid-template-columns: 160px auto;
`

const NavLink = styled(Link)`
    display: block;
    padding: 9px 20px;
    text-decoration: none;
    cursor: pointer;
`

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Container>
                <div>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/features">Features</NavLink>
                    <NavLink to="/opinions">Opinions</NavLink>
                    <NavLink to="/happiness">Happiness</NavLink>
                </div>
                <Router>
                    <Home path="/" />
                    <Feature path="/features" />
                    <Opinions path="/opinions" />
                    <Happiness path="/happiness" />
                </Router>
            </Container>
        </ApolloProvider>
    )
}

export default App
