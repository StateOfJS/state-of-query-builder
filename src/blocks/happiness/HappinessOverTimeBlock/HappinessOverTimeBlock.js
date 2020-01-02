import React, { useState, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { AddChart, EnumSelector, Filters } from '../../../core'

const QUERY = gql`
    query HappinessOverTime($id: CategoryID!, $filters: Filters) {
        survey(survey: js) {
            category(id: $id) {
                happiness(filters: $filters) {
                    allYears {
                        year
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
    }
`

const HappinessOverTime = ({ category, filters }) => {
    const { loading, error, data } = useQuery(QUERY, {
        variables: {
            id: category,
            filters
        },
        fetchPolicy: 'no-cache'
    })

    if (error) return `Error! ${error.message}`

    const years = data !== undefined ? data.survey.category.happiness.allYears : []

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
