import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    height: 1px;
    background: #777;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 20px 0;
`

const Icon = styled.div`
    width: 36px;
    height: 36px;
    display: flex;
    font-size: 18px;
    background-color: #222429;
    border: 2px solid #e1e1e1;
    border-radius: 50%;
    box-shadow: 0 0 0 5px #222429;
    justify-content: center;
    align-items: center;
`

export const AddChart = ({ onAdd }) => {
    return (
        <Container onClick={onAdd}>
            <Icon>
                <FontAwesomeIcon icon={faPlus} />
            </Icon>
        </Container>
    )
}
