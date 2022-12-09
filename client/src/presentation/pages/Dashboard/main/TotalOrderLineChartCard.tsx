import React, { useState } from 'react'
import { useTheme, styled } from '@mui/material/styles'
import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import Chart from 'react-apexcharts'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import MainCard from '../../../components/cards/MainCard'
import SkeletonTotalOrderCard from '../../../components/cards/Skeleton/EarningCard'
import ChartDataMonth from './chart-data/total-order-month-line-chart'
import ChartDataYear from './chart-data/total-order-year-line-chart'
import themeTypography from "../../../theme/typography";


const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: 'rgb(21, 101, 192)',
        borderRadius: '50%',
        zIndex: 1,
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        width: 210,
        height: 210,
        background: 'rgb(21, 101, 192)',
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}))

type TotalOrderLineChartCardProps = {
    isLoading: boolean
}

const TotalOrderLineChartCard: React.FC<TotalOrderLineChartCardProps> = ({ isLoading }: TotalOrderLineChartCardProps) => {
    const theme = useTheme()

    const [timeValue, setTimeValue] = useState(false)
    const handleChangeTime = (event: any, newValue: any) => {
        setTimeValue(newValue)
    }

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper
                    border={false}
                    content={false}
                    boxShadow={false}
                    contentClass={''}
                    contentSX={{}}
                    darkTitle={false}
                    secondary={''}
                    shadow={''}
                    sx={{}}
                    title={''}
                >
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...themeTypography(theme).commonAvatar,
                                                ...themeTypography(theme).largeAvatar,
                                                backgroundColor: '#1565c0',
                                                color: '#fff',
                                                mt: 1
                                            }}
                                        >
                                            <LocalMallOutlinedIcon fontSize="inherit" />
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            disableElevation
                                            variant={timeValue ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTime(e, true)}
                                        >
                                            Month
                                        </Button>
                                        <Button
                                            disableElevation
                                            variant={!timeValue ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTime(e, false)}
                                        >
                                            Year
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 0.75 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={6}>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                {timeValue ? (
                                                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                        $108
                                                    </Typography>
                                                ) : (
                                                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                        $961
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item>
                                                <Avatar
                                                    sx={{
                                                        ...themeTypography(theme).smallAvatar,
                                                        cursor: 'pointer',
                                                        backgroundColor: '#90caf9',
                                                        color: theme.palette.primary.dark
                                                    }}
                                                >
                                                    <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        color: '#90caf9'
                                                    }}
                                                >
                                                    Total Order
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    )
}

export default TotalOrderLineChartCard