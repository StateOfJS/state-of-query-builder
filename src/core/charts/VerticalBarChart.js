import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
// import { useI18n } from 'core/i18n/i18nContext'
import theme from '../../nivoTheme'
import { getColor } from '../../constants.js'
import { useBarChart } from './hooks'
// import BarTooltip from './BarTooltip'

const breakpoint = 600

const getMargins = viewportWidth => ({
    top: 10,
    right: 70,
    bottom: viewportWidth < breakpoint ? 110 : 60,
    left: 60
})

export const VerticalBarChart = ({
    viewportWidth,
    className,
    buckets,
    total,
    legendNamespace,
    i18nNamespace,
    translateData,
    mode,
    units,
    chartProps
}) => {
    // const { translate } = useI18n()

    const { formatTick, formatValue, maxValue, ticks } = useBarChart({
        buckets,
        total,
        i18nNamespace,
        shouldTranslate: translateData,
        mode,
        units
    })

    return (
        <div style={{ height: 260 }} className={`VerticalBarChart ${className}`}>
            <ResponsiveBar
                data={buckets}
                indexBy="id"
                keys={[units]}
                maxValue={maxValue}
                margin={getMargins(viewportWidth)}
                padding={0.4}
                theme={theme}
                colors={[getColor('bar')]}
                labelFormat={formatValue}
                labelSkipHeight={16}
                borderRadius={1}
                enableGridX={false}
                gridYValues={ticks}
                enableGridY={true}
                axisLeft={{
                    format: formatValue,
                    tickValues: ticks
                }}
                axisRight={{
                    format: formatValue,
                    tickValues: ticks,
                    legend: `users_${units}`, // translate(`users_${units}`),
                    legendPosition: 'middle',
                    legendOffset: 52
                }}
                axisBottom={{
                    format: formatTick,
                    legend: `${i18nNamespace}.axis_legend`, // translate(`${i18nNamespace}.axis_legend`),
                    legendPosition: 'middle',
                    legendOffset: viewportWidth < breakpoint ? 90 : 50,
                    tickRotation: viewportWidth < breakpoint ? -45 : 0
                }}
                /*
                tooltip={barProps => (
                    <BarTooltip
                        i18nNamespace={i18nNamespace}
                        shouldTranslate={translateData}
                        {...barProps}
                    />
                )}
                */
                labelTextColor={{ theme: 'labels.text.fill' }}
                {...chartProps}
            />
        </div>
    )
}

VerticalBarChart.propTypes = {
    total: PropTypes.number.isRequired,
    buckets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            count: PropTypes.number.isRequired,
            percentage: PropTypes.number
        })
    ).isRequired,
    i18nNamespace: PropTypes.string.isRequired,
    translateData: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(['absolute', 'relative']).isRequired,
    units: PropTypes.oneOf(['percentage', 'count']).isRequired
}

VerticalBarChart.defaultProps = {
    translateData: true
}
