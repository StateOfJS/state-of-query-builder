import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { AddChart, EnumSelector, Filters, StreamChart, Query } from '../../../core'
import { opinions } from '../../../constants'

const QUERY = gql`
    query OpinionOverTime($id: OpinionID!, $filters: Filters) {
        survey(survey: js) {
            opinion(id: $id, filters: $filters) {
                allYears {
                    year
                    buckets {
                        id
                        count
                        percentage
                    }
                }
            }
        }
    }
`

const OpinionOverTime = ({ opinion, filters, setIsLoading, showQuery }) => {
    const [current, setCurrent] = useState(null)
    const variables = {
        id: opinion,
        filters
    }
    const { loading, error, data } = useQuery(QUERY, {
        variables,
        fetchPolicy: 'no-cache'
    })

    useEffect(() => setIsLoading(loading), [setIsLoading, loading])

    if (error) return `Error! ${error.message}`

    const years = data !== undefined ? data.survey.opinion.allYears : []

    return (
        <>
            {showQuery && <Query query={QUERY} variables={variables} />}
            {years.length > 0 && (
                <div style={{ height: 300 }}>
                    <StreamChart
                        colorScale={opinions.map(o => o.color)}
                        current={current}
                        data={years}
                        keys={opinions.map(o => o.id)}
                        units="count"
                        applyEmptyPatternTo={2}
                        // namespace={bucketKeysName}
                    />
                </div>
            )}
        </>
    )
}

export const OpinionOverTimeBlock = () => {
    const [opinion, setOpinion] = useState(null)
    const [instances, setInstances] = useState([])
    const addInstance = () => {
        setInstances([...instances, Date.now()])
    }
    const handleSelect = opinion => {
        setOpinion(opinion)
        if (instances.length === 0) {
            addInstance()
        }
    }

    return (
        <div>
            <div>
                how much users agreed on the statement&nbsp;
                <EnumSelector name="OpinionID" onSelect={handleSelect} />
                &nbsp; over time
            </div>
            {opinion !== null &&
                instances.map(token => (
                    <Filters key={token}>
                        <OpinionOverTime key={token} opinion={opinion} />
                    </Filters>
                ))}
            {instances.length > 0 && <AddChart onAdd={addInstance} />}
        </div>
    )
}
