import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { AddChart, Filters, GaugeBarChart } from '../../../core'
import { FeatureSelector } from '../FeatureSelector'
import { featureExperience } from '../../../constants'

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

const FeatureUsage = ({ feature, year, filters, setIsLoading }) => {
    const { loading, error, data } = useQuery(QUERY, {
        variables: {
            id: feature,
            year,
            filters
        },
        fetchPolicy: 'no-cache'
    })

    useEffect(() => setIsLoading(loading), [setIsLoading, loading])

    if (error) return `Error! ${error.message}`

    const noData = data !== undefined && data.survey.feature.experience.year === null
    let buckets = data !== undefined && !noData ? data.survey.feature.experience.year.buckets : []

    // @todo: handle normalization directly in the survey
    buckets = buckets.map(bucket => {
        let id
        if (bucket.id === 'heard') {
            id = 'know_not_used'
        }
        if (bucket.id === 'neverheard') {
            id = 'never_heard_not_sure'
        }
        if (bucket.id === 'used') {
            id = 'used_it'
        }

        return {
            ...bucket,
            id
        }
    })

    return (
        <div>
            {noData && 'No data for the selected parameters.'}
            {buckets.length > 0 && (
                <div style={{ height: 40 }}>
                    <GaugeBarChart
                        buckets={buckets}
                        colorMapping={featureExperience}
                        units="count"
                        applyEmptyPatternTo="never_heard_not_sure"
                    />
                </div>
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
