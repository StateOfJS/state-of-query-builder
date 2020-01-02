import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { colors } from '../constants'

const style = {
    hljs: {
        margin: 0,
        fontSize: '14px',
        display: 'block',
        overflowX: 'auto',
        padding: '16px 24px',
        color: '#abb2bf',
        background: 'rgba(0, 0, 0, 0.12)'
    },
    'hljs-comment': {
        color: '#5c6370',
        fontStyle: 'italic'
    },
    'hljs-quote': {
        color: '#5c6370',
        fontStyle: 'italic'
    },
    'hljs-doctag': {
        color: colors.redLight
    },
    'hljs-keyword': {
        color: colors.redLight
    },
    'hljs-formula': {
        color: colors.redLight
    },
    'hljs-section': {
        color: '#e06c75'
    },
    'hljs-name': {
        color: '#e06c75'
    },
    'hljs-selector-tag': {
        color: '#e06c75'
    },
    'hljs-deletion': {
        color: '#e06c75'
    },
    'hljs-subst': {
        color: '#e06c75'
    },
    'hljs-literal': {
        color: '#56b6c2'
    },
    'hljs-string': {
        color: colors.tealDark
    },
    'hljs-regexp': {
        color: colors.tealDark
    },
    'hljs-addition': {
        color: colors.tealDark
    },
    'hljs-attribute': {
        color: colors.tealDark
    },
    'hljs-meta-string': {
        color: colors.tealDark
    },
    'hljs-built_in': {
        color: colors.tealLight
    },
    'hljs-class .hljs-title': {
        color: colors.tealLight
    },
    'hljs-attr': {
        color: colors.teal
    },
    'hljs-variable': {
        color: colors.teal
    },
    'hljs-template-variable': {
        color: colors.teal
    },
    'hljs-type': {
        color: colors.teal
    },
    'hljs-selector-class': {
        color: colors.teal
    },
    'hljs-selector-attr': {
        color: colors.teal
    },
    'hljs-selector-pseudo': {
        color: colors.teal
    },
    'hljs-number': {
        color: colors.teal
    },
    'hljs-symbol': {
        color: '#61aeee'
    },
    'hljs-bullet': {
        color: '#61aeee'
    },
    'hljs-link': {
        color: '#61aeee',
        textDecoration: 'underline'
    },
    'hljs-meta': {
        color: '#61aeee'
    },
    'hljs-selector-id': {
        color: '#61aeee'
    },
    'hljs-title': {
        color: '#61aeee'
    },
    'hljs-emphasis': {
        fontStyle: 'italic'
    },
    'hljs-strong': {
        fontWeight: 'bold'
    }
}

const copyToClipboard = content => {
    const element = document.createElement('textarea')
    element.value = content
    document.body.appendChild(element)
    element.select()
    document.execCommand('copy')
    document.body.removeChild(element)
}

const Container = styled.div`
    position: relative;
`

const CopyButton = styled.div`
    font-size: ${({ copied }) => (copied ? 12 : 16)}px;
    position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 32px;
    cursor: pointer;
    background: #16181b;
    color: ${({ copied }) => (copied ? colors.redLight : '#999')};

    &:hover {
        color: ${({ copied }) => (copied ? colors.redLight : 'white')};
    }
`

export const Query = ({ query, variables }) => {
    const content = [
        query.loc.source.body.replace(/^ {4}/gim, ''),
        `\n# variables\n`,
        JSON.stringify(variables, null, '    ')
    ]
        .join('')
        .trim()

    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        setCopied(true)
        copyToClipboard(content)
    }
    useEffect(() => {
        let timer
        if (copied === true) {
            timer = setTimeout(() => setCopied(false), 1000)
        }

        return () => clearTimeout(timer)
    }, [copied, setCopied])

    return (
        <Container>
            <SyntaxHighlighter langage="graphql" style={style}>
                {content}
            </SyntaxHighlighter>
            <CopyButton onClick={handleCopy} copied={copied}>
                {!copied && <FontAwesomeIcon icon={faCopy} />}
                {copied && 'query copied to clipboard'}
            </CopyButton>
        </Container>
    )
}
