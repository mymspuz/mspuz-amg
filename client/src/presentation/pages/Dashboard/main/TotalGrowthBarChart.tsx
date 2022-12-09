import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { Grid, MenuItem, TextField, Typography } from '@mui/material'
import ApexCharts from 'apexcharts'
import Chart from 'react-apexcharts'

import SkeletonTotalGrowthBarChart from '../../../components/cards/Skeleton/TotalGrowthBarChart'
import MainCard from '../../../components/cards/MainCard'
import { gridSpacing } from '../../../theme/constants'
import chartData from './chart-data/total-growth-bar-chart'

const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
]

type TotalGrowthBarChartProps = {
    isLoading: boolean
}

const TotalGrowthBarChart: React.FC<TotalGrowthBarChartProps> = ({ isLoading }: TotalGrowthBarChartProps) => {
    const [value, setValue] = useState('today')
    const theme = useTheme()

    const { primary } = theme.palette.text
    const darkLight = '#e3f2fd'
    const grey200 = theme.palette.grey[200]
    const grey500 = theme.palette.grey[500]

    const primary200 = '#90caf9'
    const primaryDark = theme.palette.primary.dark
    const secondaryMain = theme.palette.secondary.main
    const secondaryLight = theme.palette.secondary.light

    useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [primary200, primaryDark, secondaryMain, secondaryLight],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: grey200
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            }
        }

        if (!isLoading) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData)
        }
    }, [primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500])

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard
                    content={false}
                    title={''}
                    border={true}
                    boxShadow={true}
                    contentClass=''
                    contentSX={{}}
                    darkTitle={false}
                    secondary={''}
                    shadow={''}
                    sx={{ p: '24px' }}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Total Growth</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">$2,324.00</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    )
}

export default TotalGrowthBarChart