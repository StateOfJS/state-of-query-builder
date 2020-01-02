import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    display: flex;
    align-items: center;
    border-radius: 2px;
    margin-top: 12px;
    margin-right: 16px;
`

const Button = styled.div`
    padding: 4px 9px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 11px;
    cursor: pointer;
    margin-left: 9px;
    background-color: #e1e1e1;
    color: #222429;
    border-radius: 2px;

    &:first-child {
        margin-left: 0;
    }
`

const AddFilter = ({ availableFilters, onAdd }) => {
    const [isAdding, setIsAdding] = useState(false)
    const [type, setType] = useState(availableFilters[0])
    const handleTypeChange = event => {
        setType(event.target.value)
    }
    const handleAdd = () => {
        if (!isAdding) {
            setIsAdding(true)
        } else {
            onAdd(type)
            setIsAdding(false)
        }
    }
    const handleCancel = () => {
        setIsAdding(false)
    }
    useEffect(() => {
        setType(availableFilters[0])
    }, [availableFilters])

    return (
        <Container isAdding={isAdding}>
            {isAdding && (
                <select value={type} onChange={handleTypeChange}>
                    {availableFilters.map(filter => (
                        <option key={filter} value={filter}>
                            {filter}
                        </option>
                    ))}
                </select>
            )}
            <Button onClick={handleAdd}>
                {isAdding && <FontAwesomeIcon icon={faCheck} />}
                {!isAdding && 'add filter'}
            </Button>
            {isAdding && (
                <Button onClick={handleCancel}>
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            )}
        </Container>
    )
}

export default AddFilter
