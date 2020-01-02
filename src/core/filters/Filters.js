import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
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
    margin-bottom: 9px;
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

export const Filters = ({ children, ...props }) => {
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
    const onSubmit = data => {
        console.log(data)
        const currentFilters = {}
        activeFilters.forEach(filter => {
            if (data[filter] !== undefined) {
                if (data[filter].operator === 'eq' && data[filter].value !== 'all') {
                    currentFilters[filter] = {
                        eq: data[filter].value
                    }
                }
                if (data[filter].operator === 'in' && data[filter].value.length > 0) {
                    currentFilters[filter] = {
                        in: data[filter].value
                    }
                }
                if (data[filter].operator === 'nin' && data[filter].value.length > 0) {
                    currentFilters[filter] = {
                        nin: data[filter].value
                    }
                }
            }
        })
        console.log(currentFilters)

        setFilters(currentFilters)
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FiltersContainer>
                    <RefreshButton type="submit">
                        <FontAwesomeIcon icon={faSync} />
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
                </FiltersContainer>
            </form>
            {React.cloneElement(children, {
                ...props,
                filters
            })}
        </Container>
    )
}
