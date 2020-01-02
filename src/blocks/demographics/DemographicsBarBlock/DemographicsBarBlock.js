import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { AddChart, Filters, VerticalBarChart } from '../../../core'
import { keys } from '../../../constants'

const generateQuery = metric => gql`
    query DemographicsSalary($year: Int!, $filters: Filters) {
        survey(survey: js) {
            demographics {
                metric: ${metric}(filters: $filters) {
                    year(year: $year) {
                        total
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

const DemographicBar = ({ metric, year, filters, setIsLoading }) => {
    const { loading, error, data } = useQuery(generateQuery(metric), {
        variables: {
            year,
            filters
        },
        fetchPolicy: 'no-cache'
    })

    useEffect(() => setIsLoading(loading), [setIsLoading, loading])

    if (error) return `Error! ${error.message}`

    const buckets = data !== undefined ? data.survey.demographics.metric.year.buckets : []

    const sortedBuckets = keys[metric].map(({ id: key }) => {
        const bucket = buckets.find(b => b.id === key)
        if (bucket === undefined) {
            return {
                id: key,
                count: 0,
                percentage: 0
            }
        }

        return bucket
    })

    return (
        <div>
            {buckets.length > 0 && (
                <div>
                    <VerticalBarChart
                        keys={keys[metric]}
                        total={data.survey.demographics.metric.year.total}
                        buckets={sortedBuckets}
                        i18nNamespace={metric}
                        // translateData={translateData}
                        mode="relative"
                        units="count"
                        // viewportWidth={width}
                    />
                </div>
            )}
        </div>
    )
}

export const DemographicBarBlock = () => {
    const [metric, setMetric] = useState(null)
    const [year, setYear] = useState(2019)
    const [instances, setInstances] = useState([])
    const addInstance = () => {
        setInstances([...instances, Date.now()])
    }
    const handleSelect = event => {
        setMetric(event.target.value)
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
                metric &nbsp;
                <select onChange={handleSelect}>
                    <option value="">-- select --</option>
                    <option value="salary">salary</option>
                    <option value="companySize">company size</option>
                    <option value="workExperience">work experience</option>
                    <option value="backendProficiency">backend proficiency</option>
                    <option value="cssProficiency">CSS proficiency</option>
                </select>
                &nbsp;
                <span>in</span>
                &nbsp;
                <select onChange={handleYearChange} value={year}>
                    <option value={2016}>2016</option>
                    <option value={2017}>2017</option>
                    <option value={2018}>2018</option>
                    <option value={2019}>2019</option>
                </select>
            </div>
            {metric !== null &&
                instances.map(token => (
                    <Filters key={token}>
                        <DemographicBar metric={metric} year={year} />
                    </Filters>
                ))}
            {instances.length > 0 && <AddChart onAdd={addInstance} />}
        </div>
    )
}
