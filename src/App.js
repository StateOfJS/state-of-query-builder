import React from 'react'
import { Router, Link } from '@reach/router'
import { ApolloProvider } from '@apollo/react-hooks'
import styled from 'styled-components'
import client from './api_client'
import { Home, FeatureUsage, Opinions, Happiness, DemographicsBar } from './pages'

const Container = styled.div`
    display: grid;
    grid-template-columns: 200px auto;
    padding-right: 30px;
`

const NavTitle = styled.h3`
    margin: 0;
    padding: 7px 20px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 16px;
`

const NavLink = styled(Link)`
    display: block;
    padding: 7px 20px;
    text-decoration: none;
    cursor: pointer;
    font-size: 14px;
`

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Container>
                <div>
                    <NavLink to="/">Home</NavLink>
                    <NavTitle>demographics</NavTitle>
                    <NavLink to="/demographics-bar">Demographics Bar</NavLink>
                    <NavTitle>features</NavTitle>
                    <NavLink to="/feature-usage">Feature Usage</NavLink>
                    <NavTitle>others</NavTitle>
                    <NavLink to="/opinions">Opinions</NavLink>
                    <NavLink to="/happiness">Happiness</NavLink>
                </div>
                <Router>
                    <Home path="/" />
                    <DemographicsBar path="/demographics-bar" />
                    <FeatureUsage path="/feature-usage" />
                    <Opinions path="/opinions" />
                    <Happiness path="/happiness" />
                </Router>
            </Container>
        </ApolloProvider>
    )
}

export default App
