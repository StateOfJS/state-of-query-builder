import React, { useEffect, useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { AddChart, EnumSelector, Filters, Query } from '../../../core'
import { HappinessOverTimeChart } from './HappinessOverTimeChart'

const QUERY = gql`
    query HappinessOverTime($id: CategoryID!, $filters: Filters) {
        survey(survey: js) {
            category(id: $id) {
                happiness(filters: $filters) {
                    allYears {
                        year
                        mean
                    }
                }
            }
        }
    }
`

const HappinessOverTime = ({ category, filters, setIsLoading, showQuery }) => {
    const variables = {
        id: category,
        filters
    }
    const { loading, error, data } = useQuery(QUERY, {
        variables,
        fetchPolicy: 'no-cache'
    })

    useEffect(() => setIsLoading(loading), [setIsLoading, loading])

    if (error) return `Error! ${error.message}`

    const years = data !== undefined ? data.survey.category.happiness.allYears : []

    return (
        <div>
            {showQuery && <Query query={QUERY} variables={variables} />}
            {years.length > 0 && <HappinessOverTimeChart data={years} />}
        </div>
    )
}

export const HappinessOverTimeBlock = () => {
    const [category, setCategory] = useState(null)
    const [instances, setInstances] = useState([])
    const addInstance = () => {
        setInstances([...instances, Date.now()])
    }
    const handleSelect = category => {
        setCategory(category)
        if (instances.length === 0) {
            addInstance()
        }
    }

    return (
        <div>
            <div>
                how happy users were with&nbsp;
                <EnumSelector name="CategoryID" onSelect={handleSelect} />
                &nbsp; over time
            </div>
            {category !== null &&
                instances.map(token => (
                    <Filters key={token}>
                        <HappinessOverTime key={token} category={category} />
                    </Filters>
                ))}
            {instances.length > 0 && <AddChart onAdd={addInstance} />}
        </div>
    )
}
