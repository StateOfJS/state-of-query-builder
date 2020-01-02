import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { filtersConfig } from './constants'

const Container = styled.div`
    display: flex;
    align-items: center;
    margin-top: 12px;
    margin-right: 16px;
    font-size: 14px;

    select {
        margin-left: 7px;
    }
`

const RemoveButton = styled.div`
    padding: 6px 9px;
    margin-left: 2px;
    cursor: pointer;
    color: #999;

    &:hover {
        color: white;
    }
`

const Filter = ({ name, register, remove, watch }) => {
    const operator = watch(`${name}.operator`) || 'eq'

    return (
        <Container>
            {filtersConfig[name].label}
            <select name={`${name}.operator`} defaultValue="eq" ref={register}>
                <option value="eq">=</option>
                <option value="in">in</option>
                <option value="nin">not in</option>
            </select>
            <select name={`${name}.value`} ref={register} multiple={operator !== 'eq'}>
                {operator === 'eq' && <option value="all">all</option>}
                {filtersConfig[name].options.map(([value, label]) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            <RemoveButton onClick={() => remove(name)}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </RemoveButton>
        </Container>
    )
}

export default Filter
