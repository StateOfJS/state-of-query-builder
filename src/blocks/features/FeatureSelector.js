import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const QUERY = gql`
    query AllFeatures {
        survey(survey: js) {
            features {
                id
                name
            }
        }
    }
`

export const FeatureSelector = ({ onSelect }) => {
    const { loading, error, data } = useQuery(QUERY)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    let features = []
    if (!loading) {
        features = data.survey.features
    }

    const handleChange = event => {
        const feature = event.target.value
        if (feature !== '') {
            onSelect(feature)
        }
    }

    return (
        <select onChange={handleChange}>
            <option value="">
                {loading && '...loading...'}
                {!loading && '-- select --'}
            </option>
            {features.map(feature => (
                <option key={feature.id} value={feature.id}>
                    {feature.name}
                </option>
            ))}
        </select>
    )
}
