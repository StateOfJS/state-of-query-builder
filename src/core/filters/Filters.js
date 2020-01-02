import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faSpinner, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { filtersConfig } from './constants'
import AddFilter from './AddFilter'
import Filter from './Filter'

const allFilters = Object.keys(filtersConfig)

const Container = styled.div`
    margin-top: 16px;
`

const FiltersContainer = styled.div`
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 20px 12px;
`

const RefreshButton = styled.button`
    padding: 5px 12px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    margin-top: 12px;
    margin-right: 16px;
    border-radius: 2px;
    border: 1px solid #777;
    color: #e1e1e1;
    background: #222429;

    &:hover {
        background: #e1e1e1;
        border-color: #e1e1e1;
        color: #222429;
    }
`

const ShowQueryButton = styled.div`
    padding: 5px 12px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    margin-top: 12px;
    margin-right: 16px;
    border-radius: 2px;
    border: 1px solid #777;
    color: #e1e1e1;
    background: #222429;

    &:hover {
        background: #e1e1e1;
        border-color: #e1e1e1;
        color: #222429;
    }
`

export const Filters = ({ children, ...props }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [showQuery, setShowQuery] = useState(false)
    const [activeFilters, setActiveFilters] = useState([])
    const inactiveFilters = allFilters.filter(f => !activeFilters.includes(f))
    const handleAddFilter = type => {
        setActiveFilters([...activeFilters, type])
    }
    const handleRemoveFilter = type => {
        setActiveFilters(activeFilters.filter(f => f !== type))
    }

    const { register, handleSubmit, watch } = useForm()
    const [filters, setFilters] = useState({})
    const onSubmit = rawFilters => {
        const computedFilters = {}
        activeFilters.forEach(filter => {
            if (rawFilters[filter] !== undefined) {
                if (rawFilters[filter].operator === 'eq' && rawFilters[filter].value !== 'all') {
                    computedFilters[filter] = {
                        eq: rawFilters[filter].value
                    }
                }
                if (rawFilters[filter].operator === 'in' && rawFilters[filter].value.length > 0) {
                    computedFilters[filter] = {
                        in: rawFilters[filter].value
                    }
                }
                if (rawFilters[filter].operator === 'nin' && rawFilters[filter].value.length > 0) {
                    computedFilters[filter] = {
                        nin: rawFilters[filter].value
                    }
                }
            }
        })
        console.log('filters', { rawFilters, computedFilters })

        setFilters(computedFilters)
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FiltersContainer>
                    <RefreshButton type="submit">
                        <FontAwesomeIcon icon={isLoading ? faSpinner : faSync} />
                    </RefreshButton>
                    {activeFilters.map(filter => (
                        <Filter
                            key={filter}
                            name={filter}
                            register={register}
                            watch={watch}
                            remove={handleRemoveFilter}
                        />
                    ))}
                    {inactiveFilters.length > 0 && (
                        <AddFilter availableFilters={inactiveFilters} onAdd={handleAddFilter} />
                    )}
                    <ShowQueryButton onClick={() => setShowQuery(flag => !flag)}>
                        <FontAwesomeIcon icon={showQuery ? faEyeSlash : faEye} />
                    </ShowQueryButton>
                </FiltersContainer>
            </form>
            {React.cloneElement(children, {
                ...props,
                filters,
                setIsLoading,
                showQuery
            })}
        </Container>
    )
}
