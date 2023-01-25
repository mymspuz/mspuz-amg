import React, {useEffect, useState} from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

import EarningIcon from '../../../../assets/images/icons/earning.svg'
import MainCard from  '../../../../presentation/components/cards/MainCard'
import SkeletonEarningCard from '../../../components/cards/Skeleton/EarningCard'
import themeTypography from "../../../theme/typography";
import dayjs from "dayjs";
import {
    useGetBalanceBankLastQuery,
    useLazyGetBalanceBankLastQuery
} from "../../../../store/queries/dashboardClient.queri";
import {TErrorRTKQuery} from "../../../../data/RTKQueryTypes";

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: 'rgb(69, 39, 160)',
        borderRadius: '50%',
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
        width: 210,
        height: 210,
        background: 'rgb(69, 39, 160)',
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

type EarningCardProps = {
    isLoading: boolean
}

type TState = {
    isLoading: boolean
    isError: boolean
    errorMsg: string
    balanceBank: { value: number, updateAt: Date | null }
}

const EarningCard: React.FC<EarningCardProps> = ({ isLoading }: EarningCardProps) => {
    const theme = useTheme()
    const [state, setState] = useState<TState>({
        isLoading: true,
        isError: false,
        errorMsg: '',
        balanceBank: { value: 0, updateAt: null }
    })

    const [anchorEl, setAnchorEl] = useState(null)

    const [getBalanceBankLast] = useLazyGetBalanceBankLastQuery()

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        setState({...state, isLoading: true, isError: false, errorMsg: ''})
        getBalanceBankLast({ 'code': 'balance_bank_51' })
            .unwrap()
            .then((payload: any) => {
                setState({
                    ...state,
                    isLoading: false,
                    isError: false,
                    balanceBank: { value: payload.value, updateAt: payload.updateAt }
                })
            })
            .catch((error: TErrorRTKQuery) => {
                if ('data' in error) {
                    setState({...state, isLoading: false, isError: true, errorMsg: error.data.message})
                } else {
                    setState({...state, isLoading: false, isError: true, errorMsg: 'Ошибка сервера'})
                }
            })
    }, [])

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper
                    border={false}
                    content={false}
                    boxShadow={false}
                    contentClass={''}
                    darkTitle={false}
                    secondary={''}
                    shadow={''}
                    title={''}
                    contentSX={{}}
                    sx={{}}
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
                                                backgroundColor: '#4527a0',
                                                mt: 1
                                            }}
                                        >
                                            <img src={EarningIcon} alt="Notification" />
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...themeTypography(theme).commonAvatar,
                                                ...themeTypography(theme).mediumAvatar,
                                                backgroundColor: theme.palette.secondary.dark,
                                                color: '#b39ddb',
                                                zIndex: 1
                                            }}
                                            aria-controls="menu-earning-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <MoreHorizIcon fontSize="inherit" />
                                        </Avatar>
                                        <Menu
                                            id="menu-earning-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                                            </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            {state.balanceBank.value}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                                cursor: 'pointer',
                                                ...themeTypography(theme).smallAvatar,
                                                backgroundColor: '#b39ddb',
                                                color: theme.palette.secondary.dark
                                            }}
                                        >
                                            <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: '#b39ddb'
                                    }}
                                >
                                    {state.balanceBank.updateAt
                                        ? dayjs(state.balanceBank.updateAt).format('DD.MM.YYYY HH:mm:ss')
                                        : <>No data</>
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    )
}

export default EarningCard