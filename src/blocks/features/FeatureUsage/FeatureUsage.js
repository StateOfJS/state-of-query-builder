import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useForm } from 'react-hook-form'
import { AddChart, Filters } from '../../../core'

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

export const FeatureUsage = () => {
    const { register, handleSubmit } = useForm()
    const [params, setParams] = useState(null)
    const [instances, setInstances] = useState([])
    const addInstance = () => {
        setInstances([...instances, Date.now()])
    }
    const onSubmit = data => {
        setParams({
            feature: data.feature,
            year: Number(data.year)
        })
        if (instances.length === 0) {
            addInstance()
        }
    }

    return (
        <div>
            <h2>FeatureUsage</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="feature" ref={register}>
                    <option value="proxies">Proxies</option>
                    <option value="destructuring">Destructuring</option>
                </select>
                &nbsp;
                <span>feature usage in</span>
                &nbsp;
                <select name="year" defaultValue={2019} ref={register}>
                    <option value={2016}>2016</option>
                    <option value={2017}>2017</option>
                    <option value={2018}>2018</option>
                    <option value={2019}>2019</option>
                </select>
                &nbsp;
                <button type="submit">select</button>
            </form>
            {instances.map(token => (
                <Filters key={token} feature={params.feature} year={params.year}>
                    <FeatureUsageInner feature={params.feature} year={params.year} />
                </Filters>
            ))}
            {instances.length > 0 && <AddChart onAdd={addInstance} />}
        </div>
    )
}

const FeatureUsageInner = ({ feature, year, filters }) => {
    const { loading, error, data } = useQuery(QUERY, {
        variables: {
            id: feature,
            year,
            filters
        },
        fetchPolicy: 'no-cache'
    })

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    const buckets = data.survey.feature.experience.year.buckets

    return (
        <div>
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
        </div>
    )
}
