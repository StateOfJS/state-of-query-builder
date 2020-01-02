import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const QUERY = gql`
    query EnumValues($name: String!) {
        __type(name: $name) {
            enumValues {
                name
            }
        }
    }
`

export const EnumSelector = ({ name, onSelect }) => {
    const { loading, error, data } = useQuery(QUERY, {
        variables: { name }
    })

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    let values = []
    if (!loading) {
        values = data.__type.enumValues.map(e => e.name)
    }

    const handleChange = event => {
        const opinion = event.target.value
        if (opinion !== '') {
            onSelect(opinion)
        }
    }

    return (
        <select onChange={handleChange}>
            <option value="">
                {loading && '...loading...'}
                {!loading && '-- select --'}
            </option>
            {values.map(value => (
                <option key={value} value={value}>
                    {value}
                </option>
            ))}
        </select>
    )
}
