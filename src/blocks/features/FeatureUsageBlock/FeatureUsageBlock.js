import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { AddChart, Filters } from '../../../core'
import { FeatureSelector } from '../FeatureSelector'

const QUERY = gql`
    query FeatureUsage($id: FeatureID!, $year: Int!, $filters: Filters) {
        survey(survey: js) {
            feature(id: $id) {
                id
                name
                mdn {
                    locale
                    url
                    title
                    summary
                }
                experience(filters: $filters) {
                    year(year: $year) {
                        year
                        completion {
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

const FeatureUsage = ({ feature, year, filters }) => {
    const { loading, error, data } = useQuery(QUERY, {
        variables: {
            id: feature,
            year,
            filters
        },
        fetchPolicy: 'no-cache'
    })

    if (error) return `Error! ${error.message}`

    const noData = data !== undefined && data.survey.feature.experience.year === null
    const buckets = data !== undefined && !noData ? data.survey.feature.experience.year.buckets : []

    return (
        <div>
            {loading && '...loading...'}
            {noData && 'No data for the selected parameters.'}
            {buckets.length > 0 && (
                <table>
                    <tbody>
                        {buckets.map(bucket => {
                            return (
                                <tr key={bucket.id}>
                                    <th>{bucket.id}</th>
                                    <td>{bucket.percentage}%</td>
                                    <td>[{bucket.count}]</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export const FeatureUsageBlock = () => {
    const [feature, setFeature] = useState(null)
    const [year, setYear] = useState(2019)
    const [instances, setInstances] = useState([])
    const addInstance = () => {
        setInstances([...instances, Date.now()])
    }
    const handleSelect = feature => {
        setFeature(feature)
        if (instances.length === 0) {
            addInstance()
        }
    }
    const handleYearChange = event => {
        setYear(Number(event.target.value))
    }

    return (
        <div>
            <div>
                feature &nbsp;
                <FeatureSelector onSelect={handleSelect} />
                &nbsp;
                <span>usage in</span>
                &nbsp;
                <select onChange={handleYearChange} value={year}>
                    <option value={2016}>2016</option>
                    <option value={2017}>2017</option>
                    <option value={2018}>2018</option>
                    <option value={2019}>2019</option>
                </select>
            </div>
            {feature !== null &&
                instances.map(token => (
                    <Filters key={token}>
                        <FeatureUsage feature={feature} year={year} />
                    </Filters>
                ))}
            {instances.length > 0 && <AddChart onAdd={addInstance} />}
        </div>
    )
}
