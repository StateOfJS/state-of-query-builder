import { getColor, colors, fontFamily } from './constants.js'

export default {
    name: 'state_of',
    fontFamily,
    emptyPattern: {
        id: 'empty',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(0, 0, 0, .07)',
        rotation: -45,
        lineWidth: 3,
        spacing: 6
    },
    axis: {
        domain: {
            line: {
                strokeWidth: 0,
                stroke: colors.greyDark
            }
        },
        ticks: {
            line: {
                fill: getColor('legend')
            },
            text: {
                fill: getColor('legend'),
                fontSize: 12,
                fontFamily
            }
        },
        legend: {
            text: {
                fill: getColor('legend'),
                fontSize: 14,
                fontWeight: 600,
                fontFamily
            }
        }
    },
    grid: {
        line: {
            stroke: colors.greyMedium,
            strokeDasharray: '1 2',
            strokeOpacity: 0.4
        }
    },
    streamTimelineAxis: {
        ticks: {
            line: {
                strokeWidth: 2,
                stroke: colors.greyLight
            },
            text: {
                fontSize: 16,
                fill: colors.greyLight
            }
        }
    },
    legends: {
        text: {
            fontSize: 11,
            fill: colors.greyLight
        }
    },
    tooltip: {
        container: {
            fontSize: 14,
            background: colors.greyLight,
            color: colors.blueDark,
            borderRadius: 0,
            boxShadow: `9px 9px 0 rgba(0, 0, 0, 0.15)`
        }
    },
    labels: {
        text: {
            fill: colors.navyDark,
            fontSize: 12,
            fontWeight: 500,
            textShadow: `0px 2px 3px rgba(0,0,0,0.35)`
        }
    },
    dots: {
        text: {
            fill: colors.greyDark,
            fontSize: 12
        }
    }
}
