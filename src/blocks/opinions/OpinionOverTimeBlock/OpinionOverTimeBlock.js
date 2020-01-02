import React, { useState, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { AddChart, EnumSelector, Filters } from '../../../core'

const QUERY = gql`
    query OpinionOverTime($id: OpinionID!, $filters: Filters) {
        survey(survey: js) {
            opinion(id: $id, filters: $filters) {
                allYears {
                    year
                    total
                    completion {
                        total
                        count
                        percentage
                    }
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

const OpinionOverTime = ({ opinion, filters }) => {
    const { loading, error, data } = useQuery(QUERY, {
        variables: {
            id: opinion,
            filters
        },
        fetchPolicy: 'no-cache'
    })

    if (error) return `Error! ${error.message}`

    const years = data !== undefined ? data.survey.opinion.allYears : []

    return (
        <div>
            {loading && '...loading...'}
            {years.length > 0 && (
                <table>
                    <tbody>
                        {years.map(year => {
                            return (
                                <Fragment key={year.year}>
                                    <tr>
                                        <th>{year.year}</th>
                                        <td>
                                            completion:&nbsp;
                                            {year.completion.percentage}% ({year.completion.count}/
                                            {year.completion.total})
                                        </td>
                                    </tr>
                                    {year.buckets.map(bucket => {
                                        return (
                                            <tr key={bucket.id}>
                                                <th>{bucket.id}</th>
                                                <td>{bucket.percentage}%</td>
                                                <td>{bucket.count}</td>
                                            </tr>
                                        )
                                    })}
                                </Fragment>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
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
